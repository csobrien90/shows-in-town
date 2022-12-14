# Shows In Town
*A web app to compile and display information for live music shows in Louisville, Kentucky*

There is not one central repository for concerts in Louisville - music lovers in town need a single source of truth for all the possible shows on a given day/night. Most musicians and venues post only their own gigs. There are some organizations that try to compile events but all (at least, to my knowledge) require people to submit their own content and, so, are nowhere near compiling all gigs in town. **Shows In Town** attempts to solve this problem by creating an open source platform for compiling and displaying basic event information that our community of local musician/developers can contribute their own scrapers to over time.


## How to install and run locally

- After cloning this repository locally, navigate inside the folder run `npm install`
- In one terminal window, start the backend with `node src/api/api.js` (access directly at localhost:500)
- In a different window, start the frontend with `npm start` (access at localhost:3000)


## How to contribute

Please feel free to create a new issue or pick up an open one. The most welcome contribution will always be new scrapers. If you've found an online resource listing live music in Louisville, follow the steps below to add those events to this list:

1. add a new file `{Resource}.js` in */src/api/scrapers* 
	- export an async function called `scrape{Resource}`
	- it should return an array of event objects with these keys: `{ title, venue, address, time, epoch, desc, link }`
2. pull the resource into *src/api/getEvents.js* by adding:
	- an import statement
	- a variable definition in the destructing array
	- a call to your scraper function in the `Promise.all` array
	- your resultant array, spread into the return array
3. update this README to include
	- the new resource in the *Scrapers > Done* section
	- your name in *Current developers > Contributors* below
4. (Extra bonus option) Create some unit tests for your scraper
	- file should be named `{YourComponentName}.test.js`

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
- Louisville Orchestra
- Iroquis Amphitheater
- Old Forester's Paristown Hall
- Louisville Palace
- KFC YUM! Center
- fifteenTWELVE

### In Progress

*none currently pending*

### To do
*List potential resources here*

- [Gerstle's](https://www.gerstles.com/louisville/wp-json)
- Venues listed on do502.com
	- Kaiju
	- Gravely
	- Kentucky Center
	- Living Room Series
- Venues listed on Ticketmaster (venueId)
	- Freedom Hall (KovZpZA6tdEA)
	- Churchill Downs (KovZpZAEeIFA)
	- Broadbent Arena (KovZpa3O3e)
	- Southeast Christian Church (KovZ917AtA8)
	- Expo Center (KovZpa3OYe)

## Current developers

### Administrators/Maintainers

- Chad O'Brien

### Contributors
*This could be you!*

- Meghan Pund
- Jeff Beers
