import { scrapeHeadliners } from "./scrapers/Headliners.js"
import { scrapeLouisvilleJazzSociety } from "./scrapers/LouisvilleJazzSociety.js"
import { scrapeBlackJockeysLounge } from "./scrapers/BlackJockeysLounge.js"
import { scrapeStevieRays } from "./scrapers/StevieRays.js"
import { scrapeZanzabar } from "./scrapers/Zanzabar.js"
import { scrapeMagBar } from "./scrapers/MagBar.js"
import { scrapeMercuryBallroom } from "./scrapers/MercuryBallroom.js"
import { scrapeLouisvilleOrchestra } from "./scrapers/LouisvilleOrchestra.js"
import { scrapeIroqouisAmphitheater } from "./scrapers/IroqouisAmphitheater.js"
import { scrapeParistownHall } from "./scrapers/ParistownHall.js"
import { scrapeLouisvillePalace } from "./scrapers/LouisvillePalace.js"
import { scrapeKFCYumCenter } from "./scrapers/KFCYumCenter.js"
import { scrapeFifteenTwelve } from "./scrapers/FifteenTwelve.js"

export async function getEvents() {
	const [headliners,
		jazzSociety,
		blackJockeysLounge,
		stevieRays,
		zanzabar,
		magBar,
		mercuryBallroom,
		louisvilleOrchestra,
		iroqouisAmphitheater,
		paristownHall,
		louisvillePalace,
		kfcYumCenter,
		fifteenTwelve
	] = await Promise.all([
		scrapeHeadliners(),
		scrapeLouisvilleJazzSociety(),
		scrapeBlackJockeysLounge(),
		scrapeStevieRays(),
		scrapeZanzabar(),
		scrapeMagBar(),
		scrapeMercuryBallroom(),
		scrapeLouisvilleOrchestra(),
		scrapeIroqouisAmphitheater(),
		scrapeParistownHall(),
		scrapeLouisvillePalace(),
		scrapeKFCYumCenter(),
		scrapeFifteenTwelve()
	])

	return [
		...headliners,
		...jazzSociety,
		...blackJockeysLounge,
		...stevieRays,
		...zanzabar,
		...magBar,
		...mercuryBallroom,
		...louisvilleOrchestra,
		...iroqouisAmphitheater,
		...paristownHall,
		...louisvillePalace,
		...kfcYumCenter,
		...fifteenTwelve
	]
}