import { scrapeHeadliners } from "./scrapers/Headliners.js";
import { scrapeLouisvilleJazzSociety } from "./scrapers/LouisvilleJazzSociety.js";
import { scrapeBlackJockeysLounge } from "./scrapers/BlackJockeysLounge.js";
import { scrapeStevieRays } from "./scrapers/StevieRays.js";
import { scrapeZanzabar } from "./scrapers/Zanzabar.js";

export async function getEvents() {
	const [headliners,
		jazzSociety,
		blackJockeysLounge,
		stevieRays,
		zanzabar
	] = await Promise.all([
		scrapeHeadliners(),
		scrapeLouisvilleJazzSociety(),
		scrapeBlackJockeysLounge(),
		scrapeStevieRays(),
		scrapeZanzabar()
	])

	return [
		...headliners,
		...jazzSociety,
		...blackJockeysLounge,
		...stevieRays,
		...zanzabar
	];
}