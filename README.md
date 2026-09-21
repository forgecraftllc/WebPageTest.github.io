# Mass 4 Life — static prototype

A Massachusetts-focused static website for discovering events, outdoor conditions and local culture across the Commonwealth. The design, copy, color system and layout are original.

## Pages
- `index.html` — statewide Massachusetts homepage
- `calendar.html` — searchable/filterable Massachusetts event calendar prototype
- `outdoor-report.html` — NWS weather (including Marlborough), an interactive selected-area map, NWS radar, NOAA Boston Harbor tides and Massachusetts seasonal/outdoor resource links

## Statewide structure
The site uses six practical travel/event regions:
1. Greater Boston
2. North Shore
3. South Shore + South Coast
4. Cape + Islands
5. Central Mass
6. Western Mass + Berkshires

## Data
The weather page uses the public National Weather Service API and the NOAA Tides & Currents API. The radar image is served from `radar.weather.gov`. The selected-area map is a self-contained SVG Massachusetts planning map with no external tile service or mapping library. It shows an approximate 12-mile planning radius around the selected forecast location.

The calendar contains a small set of Massachusetts-only 2026 events to demonstrate the interface. For a real launch, replace `calendar.js` with your own event database/API or approved event feeds.

## Free hosting
### GitHub Pages
1. Create a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In **Settings → Pages**, deploy from the main branch/root.
4. Your site will be available on a `github.io` URL; add a custom domain later if desired.

### Cloudflare Pages
1. Push this folder to GitHub.
2. Create a Cloudflare Pages project connected to that repository.
3. No build command is needed; use `/` as the output/root directory.

## Rename it
`Mass 4 Life` is a placeholder working title. Search/replace the name in the HTML files once you choose the final brand.
