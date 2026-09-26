(() => {
  const STORAGE_KEY = 'mass4lifeGasMileageV1';
  const defaultState = () => ({
    activeVehicleId: 'vehicle-1',
    vehicles: [
      { id: 'vehicle-1', name: 'Vehicle 1', entries: [] },
      { id: 'vehicle-2', name: 'Vehicle 2', entries: [] },
      { id: 'vehicle-3', name: 'Vehicle 3', entries: [] }
    ]
  });

  let state = loadState();
  let editingEntryId = null;
  let totalWasManuallyEdited = false;

  const $ = (id) => document.getElementById(id);
  const tabs = $('vehicleTabs');
  const form = $('fuelForm');
  const odometer = $('odometer');
  const gallons = $('gallons');
  const pricePerGallon = $('pricePerGallon');
  const totalCost = $('totalCost');
  const formMessage = $('formMessage');
  const saveEntryBtn = $('saveEntryBtn');
  const cancelEditBtn = $('cancelEditBtn');

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!parsed || !Array.isArray(parsed.vehicles)) return defaultState();
      const base = defaultState();
      base.vehicles = base.vehicles.map((v, i) => {
        const saved = parsed.vehicles.find(x => x.id === v.id) || parsed.vehicles[i];
        return saved ? { id: v.id, name: saved.name || v.name, entries: Array.isArray(saved.entries) ? saved.entries : [] } : v;
      });
      base.activeVehicleId = base.vehicles.some(v => v.id === parsed.activeVehicleId) ? parsed.activeVehicleId : 'vehicle-1';
      return base;
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function activeVehicle() {
    return state.vehicles.find(v => v.id === state.activeVehicleId) || state.vehicles[0];
  }

  function chronologicalEntries(vehicle = activeVehicle()) {
    return [...vehicle.entries].sort((a, b) => Number(a.odometer) - Number(b.odometer) || new Date(a.createdAt) - new Date(b.createdAt));
  }

  function computedEntries(vehicle = activeVehicle()) {
    const sorted = chronologicalEntries(vehicle);
    return sorted.map((entry, i) => {
      const prev = sorted[i - 1];
      const miles = prev ? Number(entry.odometer) - Number(prev.odometer) : null;
      const mpg = miles !== null && miles > 0 && Number(entry.gallons) > 0 ? miles / Number(entry.gallons) : null;
      return { ...entry, miles, mpg };
    });
  }

  function money(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);
  }

  function number(value, digits = 1) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(Number(value) || 0);
  }

  function dateLabel(iso) {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
  }

  function renderTabs() {
    tabs.innerHTML = state.vehicles.map(vehicle => `
      <button class="vehicle-tab ${vehicle.id === state.activeVehicleId ? 'active' : ''}" type="button" data-vehicle-id="${vehicle.id}" aria-pressed="${vehicle.id === state.activeVehicleId}">
        <span class="vehicle-tab-icon">🚗</span><span>${escapeHtml(vehicle.name)}</span>
      </button>`).join('');
    tabs.querySelectorAll('[data-vehicle-id]').forEach(btn => btn.addEventListener('click', () => {
      state.activeVehicleId = btn.dataset.vehicleId;
      editingEntryId = null;
      resetForm();
      saveState();
      renderAll();
    }));
  }

  function renderSummary() {
    const vehicle = activeVehicle();
    const rows = computedEntries(vehicle);
    const valid = rows.filter(r => r.mpg !== null && r.miles > 0);
    const totalMiles = valid.reduce((sum, r) => sum + r.miles, 0);
    const totalGallons = valid.reduce((sum, r) => sum + Number(r.gallons), 0);
    const average = totalGallons > 0 ? totalMiles / totalGallons : null;
    const latest = valid.length ? valid[valid.length - 1] : null;
    const spent = rows.reduce((sum, r) => sum + Number(r.totalCost || 0), 0);

    $('summaryVehicleName').textContent = vehicle.name;
    $('historyTitle').textContent = vehicle.name;
    $('summaryEntryCount').textContent = `${rows.length} fill-up${rows.length === 1 ? '' : 's'}`;
    $('lastMpg').textContent = latest ? latest.mpg.toFixed(1) : '—';
    $('avgMpg').textContent = average ? average.toFixed(1) : '—';
    $('milesTracked').textContent = number(totalMiles, 1);
    $('totalSpent').textContent = money(spent);
  }

  function renderHistory() {
    const vehicle = activeVehicle();
    const rows = computedEntries(vehicle).sort((a, b) => Number(b.odometer) - Number(a.odometer));
    const body = $('fuelHistory');
    $('fuelEmpty').hidden = rows.length > 0;
    body.innerHTML = rows.map(row => `
      <tr>
        <td data-label="Date">${dateLabel(row.createdAt)}</td>
        <td data-label="Odometer">${number(row.odometer, 1)} mi</td>
        <td data-label="Gallons">${Number(row.gallons).toFixed(3)}</td>
        <td data-label="$/gal">$${Number(row.pricePerGallon).toFixed(3)}</td>
        <td data-label="Total">${money(row.totalCost)}</td>
        <td data-label="Miles">${row.miles !== null ? number(row.miles, 1) : '—'}</td>
        <td data-label="MPG"><strong>${row.mpg !== null ? row.mpg.toFixed(1) : 'Start'}</strong></td>
        <td class="fuel-row-actions"><button type="button" class="table-action" data-edit="${row.id}">Edit</button><button type="button" class="table-action danger" data-delete="${row.id}">Delete</button></td>
      </tr>`).join('');

    body.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => beginEdit(btn.dataset.edit)));
    body.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => deleteEntry(btn.dataset.delete)));
  }

  function renderAll() {
    renderTabs();
    renderSummary();
    renderHistory();
  }

  function autoCalculateTotal() {
    if (totalWasManuallyEdited) return;
    const g = Number(gallons.value);
    const p = Number(pricePerGallon.value);
    if (g > 0 && p >= 0) totalCost.value = (g * p).toFixed(2);
  }

  function validateEntry(values, vehicle, ignoreId = null) {
    if (!(values.odometer >= 0)) return 'Enter a valid odometer reading.';
    if (!(values.gallons > 0)) return 'Gallons added must be greater than zero.';
    if (!(values.pricePerGallon >= 0)) return 'Enter a valid price per gallon.';
    if (!(values.totalCost >= 0)) return 'Enter a valid total cost.';
    const duplicate = vehicle.entries.some(e => e.id !== ignoreId && Math.abs(Number(e.odometer) - values.odometer) < 0.0001);
    if (duplicate) return 'This vehicle already has a fill-up at that odometer reading.';
    return '';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const vehicle = activeVehicle();
    const values = {
      odometer: Number(odometer.value),
      gallons: Number(gallons.value),
      pricePerGallon: Number(pricePerGallon.value),
      totalCost: Number(totalCost.value)
    };
    const error = validateEntry(values, vehicle, editingEntryId);
    if (error) {
      formMessage.textContent = error;
      formMessage.className = 'form-message error';
      return;
    }

    if (editingEntryId) {
      const idx = vehicle.entries.findIndex(e => e.id === editingEntryId);
      if (idx >= 0) vehicle.entries[idx] = { ...vehicle.entries[idx], ...values, updatedAt: new Date().toISOString() };
      formMessage.textContent = 'Fill-up updated.';
    } else {
      vehicle.entries.push({
        id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`),
        ...values,
        createdAt: new Date().toISOString()
      });
      formMessage.textContent = vehicle.entries.length === 1 ? 'Starting odometer saved. MPG will appear after the next fill-up.' : 'Fill-up saved.';
    }
    formMessage.className = 'form-message success';
    saveState();
    editingEntryId = null;
    resetForm(false);
    renderAll();
  });

  function beginEdit(id) {
    const entry = activeVehicle().entries.find(e => e.id === id);
    if (!entry) return;
    editingEntryId = id;
    odometer.value = entry.odometer;
    gallons.value = entry.gallons;
    pricePerGallon.value = entry.pricePerGallon;
    totalCost.value = entry.totalCost;
    totalWasManuallyEdited = true;
    $('entryTitle').textContent = 'Edit fill-up';
    saveEntryBtn.textContent = 'Save changes';
    cancelEditBtn.hidden = false;
    formMessage.textContent = '';
    document.querySelector('.fuel-entry-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function deleteEntry(id) {
    const vehicle = activeVehicle();
    const entry = vehicle.entries.find(e => e.id === id);
    if (!entry) return;
    if (!confirm(`Delete the fill-up at ${number(entry.odometer, 1)} miles? MPG values after it will be recalculated.`)) return;
    vehicle.entries = vehicle.entries.filter(e => e.id !== id);
    if (editingEntryId === id) {
      editingEntryId = null;
      resetForm();
    }
    saveState();
    renderAll();
  }

  function resetForm(clearMessage = true) {
    form.reset();
    totalWasManuallyEdited = false;
    $('entryTitle').textContent = 'Add fuel record';
    saveEntryBtn.textContent = 'Save fill-up';
    cancelEditBtn.hidden = true;
    if (clearMessage) {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }
  }

  gallons.addEventListener('input', autoCalculateTotal);
  pricePerGallon.addEventListener('input', autoCalculateTotal);
  totalCost.addEventListener('input', () => { totalWasManuallyEdited = totalCost.value !== ''; });
  cancelEditBtn.addEventListener('click', () => { editingEntryId = null; resetForm(); });

  // Vehicle naming dialog
  const dialog = $('vehicleDialog');
  function openVehicleDialog() {
    $('vehicleNameFields').innerHTML = state.vehicles.map((v, i) => `
      <label class="field-label">Vehicle ${i + 1} name<input class="input vehicle-name-input" data-name-id="${v.id}" maxlength="32" value="${escapeHtml(v.name)}"></label>`).join('');
    dialog.hidden = false;
    document.body.classList.add('dialog-open');
    dialog.querySelector('input')?.focus();
  }
  function closeVehicleDialog() {
    dialog.hidden = true;
    document.body.classList.remove('dialog-open');
  }
  $('manageVehiclesBtn').addEventListener('click', openVehicleDialog);
  $('closeVehicleDialog').addEventListener('click', closeVehicleDialog);
  $('cancelVehicleNames').addEventListener('click', closeVehicleDialog);
  dialog.addEventListener('click', e => { if (e.target === dialog) closeVehicleDialog(); });
  $('saveVehicleNames').addEventListener('click', () => {
    dialog.querySelectorAll('[data-name-id]').forEach(input => {
      const vehicle = state.vehicles.find(v => v.id === input.dataset.nameId);
      if (vehicle && input.value.trim()) vehicle.name = input.value.trim();
    });
    saveState();
    closeVehicleDialog();
    renderAll();
  });

  $('exportCsvBtn').addEventListener('click', () => {
    const vehicle = activeVehicle();
    const rows = computedEntries(vehicle);
    if (!rows.length) {
      formMessage.textContent = 'Add at least one fill-up before exporting.';
      formMessage.className = 'form-message error';
      return;
    }
    const header = ['Date','Vehicle','Odometer','Gallons Added','Price Per Gallon','Total Cost','Miles Since Previous','MPG'];
    const csvRows = rows.map(r => [
      new Date(r.createdAt).toLocaleDateString('en-US'), vehicle.name, r.odometer, r.gallons, r.pricePerGallon, r.totalCost,
      r.miles === null ? '' : r.miles.toFixed(1), r.mpg === null ? '' : r.mpg.toFixed(2)
    ]);
    const csv = [header, ...csvRows].map(row => row.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${vehicle.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'vehicle'}-fuel-log.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  function csvEscape(value) {
    const str = String(value ?? '');
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]));
  }

  renderAll();
})();
