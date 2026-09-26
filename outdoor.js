const places=[
 {name:'Boston',lat:42.3601,lon:-71.0589},
 {name:'Marlborough',lat:42.3459,lon:-71.5523},
 {name:'Salem',lat:42.5195,lon:-70.8967},
 {name:'Gloucester',lat:42.6159,lon:-70.6620},
 {name:'Newburyport',lat:42.8126,lon:-70.8773},
 {name:'Scituate',lat:42.1959,lon:-70.7259},
 {name:'Plymouth',lat:41.9584,lon:-70.6673},
 {name:'Hyannis',lat:41.6525,lon:-70.2881},
 {name:'Worcester',lat:42.2626,lon:-71.8023},
 {name:'Springfield',lat:42.1015,lon:-72.5898},
 {name:'Pittsfield',lat:42.4501,lon:-73.2454}
];

const FORECAST_RADIUS_MILES=12;
let selectedPlaceIndex=0;

// A compact, self-contained Massachusetts planning map.  It deliberately
// avoids third-party tile servers, API keys and remote mapping libraries.
const mapBounds={minLat:41.15,maxLat:42.95,minLon:-73.65,maxLon:-69.75};
const mapSize={w:920,h:470,padX:52,padY:38};

// Simplified mainland + Cape outline for visual orientation only.
const massMainland=[
 [-73.50,42.74],[-73.48,42.10],[-73.22,42.04],[-72.70,42.03],
 [-72.05,42.03],[-71.78,42.02],[-71.45,41.90],[-71.18,41.83],
 [-70.98,41.70],[-70.80,41.67],[-70.67,41.76],[-70.61,41.92],
 [-70.73,42.06],[-70.91,42.13],[-70.98,42.28],[-70.88,42.48],
 [-70.67,42.66],[-70.57,42.79],[-70.88,42.89],[-71.18,42.82],
 [-71.55,42.80],[-72.12,42.73],[-72.82,42.73],[-73.50,42.74]
];
const capeCod=[
 [-70.69,41.78],[-70.53,41.70],[-70.33,41.64],[-70.12,41.65],
 [-69.98,41.72],[-69.96,41.82],[-70.05,41.88],[-70.20,41.94],
 [-70.09,42.02],[-70.18,42.07],[-70.34,41.99],[-70.49,41.93],
 [-70.62,41.91],[-70.69,41.78]
];

function project(lat,lon){
  const {w,h,padX,padY}=mapSize;
  const x=padX+((lon-mapBounds.minLon)/(mapBounds.maxLon-mapBounds.minLon))*(w-padX*2);
  const y=padY+((mapBounds.maxLat-lat)/(mapBounds.maxLat-mapBounds.minLat))*(h-padY*2);
  return {x,y};
}
function pointsFor(poly){
  return poly.map(([lon,lat])=>{const p=project(lat,lon);return `${p.x.toFixed(1)},${p.y.toFixed(1)}`}).join(' ');
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function renderForecastMap(placeIndex=selectedPlaceIndex){
  selectedPlaceIndex=placeIndex;
  const p=places[placeIndex];
  const host=document.getElementById('forecastMap');
  const title=document.getElementById('mapTitle');
  if(title) title.textContent=`${p.name} area`;
  if(!host) return;

  const center=project(p.lat,p.lon);
  // 12 miles is roughly 0.174 degrees latitude in Massachusetts and about
  // 0.233 degrees longitude around 42N. Project both axes independently.
  const north=project(p.lat+0.174,p.lon);
  const east=project(p.lat,p.lon+0.233);
  const ry=Math.abs(north.y-center.y);
  const rx=Math.abs(east.x-center.x);

  const markers=places.map((q,i)=>{
    const pt=project(q.lat,q.lon);
    const active=i===placeIndex;
    return `<g class="ma-city-marker${active?' is-active':''}" data-place-index="${i}" tabindex="0" role="button" aria-label="Show ${esc(q.name)} forecast">
      <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="${active?8:5}"></circle>
      ${active?`<text x="${(pt.x+12).toFixed(1)}" y="${(pt.y-12).toFixed(1)}">${esc(q.name)}</text>`:''}
      <title>${esc(q.name)}, Massachusetts</title>
    </g>`;
  }).join('');

  host.innerHTML=`<svg class="ma-map-svg" viewBox="0 0 ${mapSize.w} ${mapSize.h}" aria-hidden="true">
    <defs>
      <linearGradient id="maWater" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e9f3f5"/><stop offset="1" stop-color="#d7e8ec"/></linearGradient>
      <linearGradient id="maLand" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f7f2e7"/><stop offset="1" stop-color="#e9e0cf"/></linearGradient>
      <filter id="maShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity=".14"/></filter>
    </defs>
    <rect width="100%" height="100%" rx="18" fill="url(#maWater)"/>
    <g filter="url(#maShadow)">
      <polygon class="ma-state-shape" points="${pointsFor(massMainland)}" fill="url(#maLand)"/>
      <polygon class="ma-state-shape" points="${pointsFor(capeCod)}" fill="url(#maLand)"/>
      <ellipse class="ma-island" cx="${project(41.39,-70.62).x.toFixed(1)}" cy="${project(41.39,-70.62).y.toFixed(1)}" rx="29" ry="11"/>
      <ellipse class="ma-island" cx="${project(41.28,-70.10).x.toFixed(1)}" cy="${project(41.28,-70.10).y.toFixed(1)}" rx="21" ry="8" transform="rotate(-7 ${project(41.28,-70.10).x.toFixed(1)} ${project(41.28,-70.10).y.toFixed(1)})"/>
    </g>
    <text class="ma-map-label" x="68" y="73">MASSACHUSETTS</text>
    <text class="ma-water-label" x="760" y="85">ATLANTIC</text>
    <text class="ma-water-label" x="775" y="108">OCEAN</text>
    <g class="ma-region-labels">
      <text x="105" y="205">BERKSHIRES</text>
      <text x="265" y="215">PIONEER VALLEY</text>
      <text x="430" y="210">CENTRAL</text>
      <text x="575" y="205">METROWEST</text>
      <text x="670" y="180">BOSTON</text>
      <text x="710" y="110">NORTH SHORE</text>
      <text x="690" y="285">SOUTH SHORE</text>
      <text x="790" y="350">CAPE COD</text>
    </g>
    <ellipse class="ma-selected-area" cx="${center.x.toFixed(1)}" cy="${center.y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}"/>
    ${markers}
    <g class="ma-map-key" transform="translate(66 410)">
      <rect x="0" y="0" width="268" height="36" rx="18"></rect>
      <circle cx="21" cy="18" r="7"></circle>
      <text x="37" y="22">Approx. ${FORECAST_RADIUS_MILES}-mile selected area</text>
    </g>
  </svg>`;

  host.querySelectorAll('[data-place-index]').forEach(el=>{
    const activate=()=>selectPlace(Number(el.dataset.placeIndex));
    el.addEventListener('click',activate);
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
  });
}

function selectPlace(index){
  selectedPlaceIndex=index;
  const p=places[index];
  document.querySelectorAll('.location-tab').forEach((x,i)=>x.classList.toggle('active',i===index));
  renderForecastMap(index);
  loadWeather(p);
}

const tabs=document.getElementById('locationTabs');
places.forEach((p,i)=>{
  const b=document.createElement('button');
  b.className='location-tab'+(i===0?' active':'');
  b.textContent=p.name;
  b.onclick=()=>selectPlace(i);
  tabs.appendChild(b);
});

async function loadWeather(p){
  const box=document.getElementById('weatherContent');
  box.innerHTML='<span class="loading">Loading National Weather Service data…</span>';
  try{
    const meta=await fetch(`https://api.weather.gov/points/${p.lat},${p.lon}`,{headers:{Accept:'application/geo+json'}}).then(r=>r.json());
    const forecastUrl=meta.properties.forecast;
    const hourlyUrl=meta.properties.forecastHourly;
    const stationsUrl=meta.properties.observationStations;
    const [forecast,hourly,stations]=await Promise.all([
      fetch(forecastUrl).then(r=>r.json()),
      fetch(hourlyUrl).then(r=>r.json()),
      fetch(stationsUrl).then(r=>r.json())
    ]);
    let current=null;
    if(stations.features?.length){
      current=await fetch(`${stations.features[0].id}/observations/latest`).then(r=>r.json()).catch(()=>null);
    }
    const tempC=current?.properties?.temperature?.value;
    const tempF=tempC==null?hourly.properties.periods[0].temperature:Math.round(tempC*9/5+32);
    const now=hourly.properties.periods[0];
    const periods=forecast.properties.periods.slice(0,4);
    box.innerHTML=`<div class="weather-main"><div class="temp">${tempF}°</div><div class="conditions"><h2>${p.name}, MA</h2><strong>${now.shortForecast}</strong><div class="muted">Wind ${now.windSpeed} ${now.windDirection}</div></div></div><div class="forecast-strip">${periods.map(x=>`<div class="forecast-day"><strong>${x.name}</strong><span>${x.temperature}°${x.temperatureUnit}</span><br><span class="muted">${x.shortForecast}</span></div>`).join('')}</div><p class="source-note"><span class="status-dot"></span>Official National Weather Service forecast. Updated by NWS.</p>`;
  }catch(e){
    box.innerHTML='<div class="notice">Live NWS data could not load in this preview. When hosted on the web, the page will retry automatically. Use the official NWS links below if the API is unavailable.</div>';
  }
}

async function loadTides(){
  const el=document.getElementById('tides');
  try{
    const u='https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8443970&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&format=json';
    const d=await fetch(u).then(r=>r.json());
    el.innerHTML=(d.predictions||[]).slice(0,6).map(x=>`<div class="tide-item"><span>${x.type==='H'?'High':'Low'} • ${x.t.split(' ')[1]}</span><strong>${Number(x.v).toFixed(1)} ft</strong></div>`).join('')||'<span class="muted">No tide predictions returned.</span>';
  }catch(e){
    el.innerHTML='<span class="muted">Tide feed unavailable. Open the NOAA station page below.</span>';
  }
}

renderForecastMap(0);
loadWeather(places[0]);
loadTides();
