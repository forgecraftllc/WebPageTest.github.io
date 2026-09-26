const events = [
 {title:'Boston Lights: A Lantern Experience',date:'2026-09-21',end:'2026-11-08',region:'Greater Boston',city:'Boston',venue:'Franklin Park Zoo',category:'Family',free:false,featured:true,east:true,local:false,source:'https://www.meetboston.com/',sourceName:'Meet Boston'},
 {title:'Let’s Dance Boston',date:'2026-09-23',end:'2026-09-27',region:'Greater Boston',city:'Boston',venue:'Downtown Boston',category:'Arts & Culture',free:true,featured:true,east:true,local:false,source:'https://www.meetboston.com/',sourceName:'Meet Boston'},
 {title:'Framingham Farmers Market',date:'2026-09-24',region:'MetroWest',city:'Framingham',venue:'Framingham community market',category:'Market',free:true,featured:false,east:true,local:true,source:'https://www.framinghamma.gov/',sourceName:'City of Framingham'},
 {title:'Downtown Pop-Up Shops',date:'2026-09-26',region:'MetroWest',city:'Marlborough',venue:'Downtown Marlborough',category:'Market',free:true,featured:true,east:true,local:true,source:'https://visit-marlborough.com/',sourceName:'Visit Marlborough'},
 {title:'Merry Melodies with Ms. Mae',date:'2026-09-26',region:'MetroWest',city:'Marlborough',venue:'Marlborough Public Library',category:'Family',free:true,featured:false,east:true,local:true,source:'https://marlborough.librarycalendar.com/events/week/2026/09/19',sourceName:'Marlborough Public Library'},
 {title:'Relaxing Morning Yoga Flow',date:'2026-09-26',region:'MetroWest',city:'Marlborough',venue:'Marlborough Public Library',category:'Community',free:true,featured:false,east:true,local:true,source:'https://marlborough.librarycalendar.com/events/week/2026/09/20',sourceName:'Marlborough Public Library'},
 {title:'All Aboard Adaptive Cycling Program',date:'2026-09-26',region:'MetroWest',city:'Natick',venue:'Cochituate Rail Trail',category:'Outdoor',free:false,featured:true,east:true,local:true,source:'https://www.natickma.gov/calendar.aspx?CID=0&month=9&view=list&year=2026',sourceName:'Town of Natick'},
 {title:'Natick Powwow',date:'2026-09-26',region:'MetroWest',city:'Natick',venue:'Natick',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://www.natickma.gov/calendar.aspx?CID=0&month=9&view=list&year=2026',sourceName:'Town of Natick'},
 {title:'Duxbury Historic Preservation Day',date:'2026-09-26',region:'South Shore',city:'Duxbury',venue:'Nathaniel Winsor Jr. House',category:'Arts & Culture',free:false,featured:true,east:true,local:true,source:'https://duxburyhistory.org/events/',sourceName:'Duxbury Rural & Historical Society'},
 {title:'Addison Gallery Fall Opening Reception',date:'2026-09-26',region:'Merrimack Valley',city:'Andover',venue:'Addison Gallery of American Art',category:'Arts & Culture',free:true,featured:false,east:true,local:true,source:'https://addison.andover.edu/mec_calendars/upcoming-events-list/',sourceName:'Addison Gallery'},
 {title:'Find Your People Fair',date:'2026-09-27',region:'MetroWest',city:'Marlborough',venue:'Marlborough Public Library',category:'Community',free:true,featured:true,east:true,local:true,source:'https://marlborough.librarycalendar.com/events/week/2026/09/19',sourceName:'Marlborough Public Library'},
 {title:'Jigsaw Puzzle Swap',date:'2026-09-27',region:'MetroWest',city:'Marlborough',venue:'Marlborough Public Library',category:'Family',free:true,featured:false,east:true,local:true,source:'https://marlborough.librarycalendar.com/events/upcoming',sourceName:'Marlborough Public Library'},
 {title:'“A”KTOBERFEST – Rhythm & Brews Festival',date:'2026-09-27',region:'MetroWest',city:'Acton',venue:'NARA Park Amphitheater',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://www.actonma.gov/306/Concerts-and-Special-Events',sourceName:'Town of Acton'},
 {title:'Flower Drying Workshop',date:'2026-09-30',region:'MetroWest',city:'Natick',venue:'Natick Community Organic Farm',category:'Community',free:false,featured:false,east:true,local:true,source:'https://www.natickma.gov/calendar.aspx?CID=0&month=9&view=list&year=2026',sourceName:'Town of Natick'},
 {title:'Night Hike at the Farm',date:'2026-09-30',region:'MetroWest',city:'Natick',venue:'Natick Community Organic Farm',category:'Outdoor',free:false,featured:true,east:true,local:true,source:'https://www.natickma.gov/calendar.aspx?CID=0&month=9&view=list&year=2026',sourceName:'Town of Natick'},
 {title:'Newburyport Chocolate Tour',date:'2026-10-03',region:'Merrimack Valley',city:'Newburyport',venue:'Downtown Newburyport',category:'Food & Drink',free:false,featured:true,east:true,local:true,source:'https://business.newburyportchamber.org/events/calendar/2026-10-31',sourceName:'Greater Newburyport Chamber'},
 {title:'Rockport Exchange Farmers Market',date:'2026-10-03',region:'North Shore + Cape Ann',city:'Rockport',venue:'Rockport',category:'Market',free:true,featured:false,east:true,local:true,source:'https://visit.rockportusa.com/events/calendar/2026-10-01?c=20&o=alpha',sourceName:'Rockport USA'},
 {title:'Cape Ann Plein Air',date:'2026-10-03',end:'2026-10-11',region:'North Shore + Cape Ann',city:'Gloucester',venue:'Gloucester + Cape Ann',category:'Arts & Culture',free:false,featured:true,east:true,local:true,source:'https://discovergloucester.com/events/month/2026-10/',sourceName:'Discover Gloucester'},
 {title:'34th Annual Maynard Fest',date:'2026-10-03',region:'MetroWest',city:'Maynard',venue:'Memorial Park + Downtown Maynard',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://www.townofmaynard-ma.gov/m/newsflash/home/detail/575',sourceName:'Town of Maynard'},
 {title:'Harvest Festival',date:'2026-10-03',region:'Greater Boston',city:'Lexington',venue:'Lexington Community Center',category:'Family',free:true,featured:true,east:true,local:true,source:'https://www.lexingtonma.gov/Calendar.aspx?EID=7698',sourceName:'Town of Lexington'},
 {title:'Keeper Chat – Bats!',date:'2026-10-03',region:'MetroWest',city:'Marlborough',venue:'Marlborough Public Library',category:'Family',free:true,featured:false,east:true,local:true,source:'https://marlborough.librarycalendar.com/events/upcoming',sourceName:'Marlborough Public Library'},
 {title:'Open Mic Night',date:'2026-10-03',region:'MetroWest',city:'Marlborough',venue:'The Coffee Loft',category:'Arts & Culture',free:false,featured:false,east:true,local:true,source:'https://www.coffee-loft.com/events/open-mic-night-april-k8ckm-l3lg7-6ntr3',sourceName:'The Coffee Loft'},
 {title:'Four Duxborough Tales of the American Revolution',date:'2026-10-06',region:'South Shore',city:'Duxbury',venue:'Drew Archival Library',category:'Arts & Culture',free:false,featured:false,east:true,local:true,source:'https://duxburyhistory.org/events/',sourceName:'Duxbury Rural & Historical Society'},
 {title:'Concord Festival of Authors',date:'2026-10-08',end:'2026-10-30',region:'MetroWest',city:'Concord',venue:'Libraries, museums + venues around Concord',category:'Arts & Culture',free:false,featured:true,east:true,local:true,source:'https://www.concordfestivalofauthors.org/events',sourceName:'Concord Festival of Authors'},
 {title:'Autumn Fest 2026',date:'2026-10-10',end:'2026-10-11',region:'Merrimack Valley',city:'Newburyport',venue:'Market Square + Downtown',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://business.newburyportchamber.org/events/calendar/2026-10-31',sourceName:'Greater Newburyport Chamber'},
 {title:'Yarmouth Seaside Festival',date:'2026-10-10',end:'2026-10-12',region:'Cape Cod + Islands',city:'South Yarmouth',venue:'South Yarmouth',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://www.visitma.com/events/',sourceName:'Visit Massachusetts'},
 {title:'Weekend of Wonder',date:'2026-10-10',end:'2026-10-12',region:'Central Massachusetts',city:'Boylston',venue:'New England Botanic Garden',category:'Family',free:false,featured:true,east:false,local:true,source:'https://www.visitma.com/events/',sourceName:'Visit Massachusetts'},
 {title:'Rockport Harvest Fest 2026',date:'2026-10-17',region:'North Shore + Cape Ann',city:'Rockport',venue:'Downtown Rockport',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://visit.rockportusa.com/events/calendar/2026-10-01?c=20&o=alpha',sourceName:'Rockport USA'},
 {title:'Monsterbash 2026',date:'2026-10-16',region:'MetroWest',city:'Acton',venue:'NARA Park Amphitheater',category:'Family',free:false,featured:true,east:true,local:true,source:'https://www.actonma.gov/306/Concerts-and-Special-Events',sourceName:'Town of Acton'},
 {title:'Halloween Spooktacular',date:'2026-10-17',region:'South Shore',city:'Duxbury',venue:'Brothers Marketplace – Duxbury',category:'Family',free:false,featured:false,east:true,local:true,source:'https://www.duxburynewcomers.org/',sourceName:'Duxbury Newcomers & Neighbors Club'},
 {title:'41st Annual Essex ClamFest and Arts & Crafts Festival',date:'2026-10-24',region:'North Shore + Cape Ann',city:'Essex',venue:'Essex',category:'Fair & Festival',free:false,featured:true,east:true,local:true,source:'https://discovergloucester.com/events/month/2026-10/',sourceName:'Discover Gloucester'},
 {title:'The 167th Belchertown Fair',date:'2026-09-25',end:'2026-09-27',region:'Pioneer Valley',city:'Belchertown',venue:'Belchertown',category:'Fair & Festival',free:false,featured:true,east:false,local:true,source:'https://www.visitma.com/events/',sourceName:'Visit Massachusetts'},
 {title:'Housatonic Heritage Walk',date:'2026-09-26',region:'Berkshires',city:'Stockbridge',venue:'Stockbridge',category:'Outdoor',free:true,featured:true,east:false,local:true,source:'https://www.visitma.com/events/',sourceName:'Visit Massachusetts'}
];

const search=document.getElementById('search');
const regionFilter=document.getElementById('regionFilter');
const townFilter=document.getElementById('townFilter');
const categoryFilter=document.getElementById('categoryFilter');
const list=document.getElementById('eventList');
const count=document.getElementById('eventCount');
let quick='all';
let viewDate=new Date(2026,8,1);

function fmtDate(d){return new Date(d+'T12:00:00')}
function populateTowns(){
  const towns=[...new Set(events.map(e=>e.city))].sort((a,b)=>a.localeCompare(b));
  towns.forEach(t=>townFilter.insertAdjacentHTML('beforeend',`<option>${t}</option>`));
}
function renderCalendar(){
  const y=viewDate.getFullYear(),m=viewDate.getMonth();
  document.getElementById('monthLabel').textContent=viewDate.toLocaleDateString('en-US',{month:'long',year:'numeric'});
  const grid=document.getElementById('monthGrid');grid.innerHTML='';
  ['SUN','MON','TUE','WED','THU','FRI','SAT'].forEach(x=>grid.insertAdjacentHTML('beforeend',`<div class="dow">${x}</div>`));
  const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
  for(let i=0;i<first;i++)grid.insertAdjacentHTML('beforeend','<div class="day blank"></div>');
  for(let d=1;d<=days;d++){
    const cur=new Date(y,m,d), has=events.some(e=>{const s=fmtDate(e.date), en=fmtDate(e.end||e.date);return cur>=s&&cur<=en});
    const today=y===2026&&m===8&&d===21;
    grid.insertAdjacentHTML('beforeend',`<div class="day ${has?'has-event':''} ${today?'today':''}">${d}</div>`)
  }
}
function matchesQuick(e){
  const today=new Date('2026-09-21T12:00:00');const d=fmtDate(e.date);
  if(quick==='east')return e.east;
  if(quick==='local')return e.local;
  if(quick==='free')return e.free;
  if(quick==='featured')return e.featured;
  if(quick==='week')return d>=today&&d<=new Date('2026-09-27T23:59:59');
  if(quick==='weekend')return d>=new Date('2026-09-25T00:00:00')&&d<=new Date('2026-09-27T23:59:59');
  return true
}
function renderEvents(){
  const q=search.value.toLowerCase().trim(),reg=regionFilter.value,town=townFilter.value,cat=categoryFilter.value;
  const filtered=events.filter(e=>(reg==='all'||e.region===reg)&&(town==='all'||e.city===town)&&(cat==='all'||e.category===cat)&&matchesQuick(e)&&(!q||`${e.title} ${e.city} ${e.venue} ${e.region} ${e.category}`.toLowerCase().includes(q))).sort((a,b)=>a.date.localeCompare(b.date)||a.city.localeCompare(b.city));
  count.textContent=`${filtered.length} shown`;
  list.innerHTML=filtered.map(e=>{const d=fmtDate(e.date);return `<article class="event-card"><div class="date-tile"><span>${d.toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</span><strong>${d.getDate()}</strong></div><div><h3>${e.title}</h3><div class="event-meta">${e.city}, MA • ${e.region} • ${e.venue}${e.end?` • through ${fmtDate(e.end).toLocaleDateString('en-US',{month:'short',day:'numeric'})}`:''}</div><div style="margin-top:7px"><a href="${e.source}" target="_blank" rel="noreferrer">${e.sourceName} ↗</a></div></div><span class="event-badge">${e.free?'FREE • ':''}${e.category}</span></article>`}).join('')||'<p class="muted">No events match those filters.</p>'
}
function applyUrlFilter(){
  const params=new URLSearchParams(location.search);
  const region=params.get('region');
  const town=params.get('town');
  if(region&&[...regionFilter.options].some(o=>o.value===region))regionFilter.value=region;
  if(town&&[...townFilter.options].some(o=>o.value===town))townFilter.value=town;
}
[search,regionFilter,townFilter,categoryFilter].forEach(el=>el.addEventListener('input',renderEvents));
document.querySelectorAll('.chip[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.chip[data-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');quick=btn.dataset.filter;renderEvents()}));
document.getElementById('resetBtn').onclick=()=>{search.value='';regionFilter.value='all';townFilter.value='all';categoryFilter.value='all';quick='all';document.querySelectorAll('.chip[data-filter]').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));renderEvents()};
document.getElementById('prevMonth').onclick=()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()-1,1);renderCalendar()};
document.getElementById('nextMonth').onclick=()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,1);renderCalendar()};
populateTowns();applyUrlFilter();renderCalendar();renderEvents();
