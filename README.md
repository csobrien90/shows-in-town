# Shows In Town
*A web app to compile and display information for live music shows in Louisville, Kentucky*

There is not one central repository for concerts in Louisville - music lovers in town need a single source of truth for all the possible shows on a given day/night. Most musicians and venues post only their own gigs. There are some organizations that try to compile events but all (at least, to my knowledge) require people to submit their own content and, so, are nowhere near compiling all gigs in town. **Shows In Town** attempts to solve this problem by creating an open source platform for compiling and displaying basic event information that our community of local musician/developers can contribute their own scrapers to over time.


## How to contribute

Please feel free to create a new issue or pick up an open one. The most welcome contribution will always be new scrapers. If you've found an online resource listing live music in Louisville, follow the steps below to add those events to this list:

1. add a new file `{Resource}.js` in */src/api/scrapers* 
	- export an async function called `scrape{Resource}`
	- it should return an array of event objects with these keys: `{ title, address, time,	epoch, desc, link }`
2. pull the resource into *src/api/getEvents.js* by adding:
	- an import statement
	- a variable definition in the destructing array
	- a call to your scraper function in the `Promise.all` array
	- your resultant array, spread into the return array
3. update this README to include
	- the new resource in the *Scrapers > Done* section
	- your name in *Current developers > Contributors* below

### Guidelines

- One of the top priorities for this project must be to compile events equitably. As the number of scraped sites grows, maintainers and contributors will ensure that music from venues all around the city by all sorts of performers are presented without bias, conscious or unconscious.

## Scrapers
*The approach to scaling this app will be to gradually pull event data from (scrape) new Resources: venues, musicians' sites, organization calendars, etc.*

### Done

- Louisville Jazz Society
- Headliners
- Black Jockey's Lounge
- Stevie Rays Blues Bar
- Zanzabar
- Mag Bar
- Mercury Ballroom

### In Progress

*none currently pending*

### To do
*List potential resources here*

- Venues listed on do502.com
	- Louisville Palace
	- Kaiju
	- Gravely
	- Kentucky Center
	- KFC YUM! Center
	- Iroquis Amphitheater
	- Living Room Series

## Current developers

### Administrators/Maintainers

- Chad O'Brien

### Contributors
*This could be you!*

- Meghan Pund