# Mass 4 Life — Massachusetts regional prototype

A static Massachusetts website for discovering events, outdoor conditions and local culture by region and town. The current build focuses most heavily on Eastern Massachusetts and MetroWest.

## Current regional structure

- Greater Boston
- MetroWest
- North Shore + Cape Ann
- Merrimack Valley
- South Shore
- South Coast
- Cape Cod + Islands
- Central Massachusetts
- Pioneer Valley
- Berkshires

## Eastern Massachusetts build-out

The calendar is seeded with 2026 listings from local town, library, tourism, chamber, arts and community sources, including Marlborough, Natick, Acton, Maynard, Concord, Lexington, Duxbury, Rockport, Gloucester, Essex, Newburyport and Andover.

## Files

- `index.html` — regional homepage
- `calendar.html` + `calendar.js` — searchable region/town calendar
- `outdoor-report.html` + `outdoor.js` — live NWS forecast, NOAA tides, radar and self-contained Massachusetts planning map
- `styles.css` — shared styling
- `site.js` — shared site behavior

The map does not use third-party map tiles. It is an approximate planning graphic, not an official municipal, warning or forecast-zone map.


## Gas mileage tracker
`gas-mileage.html` tracks three vehicles using browser localStorage. Fill-up inputs are odometer, gallons added, price per gallon, and total cost. MPG is calculated from sequential odometer readings and current-fill gallons. Use Export CSV on the page for backups.
