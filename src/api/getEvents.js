import { scrapeHeadliners } from "./scrapers/Headliners.js";
import { scrapeLouisvilleJazzSociety } from "./scrapers/LouisvilleJazzSociety.js";
import { scrapeBlackJockeysLounge } from "./scrapers/BlackJockeysLounge.js";
import { scrapeStevieRays } from "./scrapers/StevieRays.js";

export async function getEvents() {
	const [headliners,
		jazzSociety,
		blackJockeysLounge,
		stevieRays
	] = await Promise.all([
		scrapeHeadliners(),
		scrapeLouisvilleJazzSociety(),
		scrapeBlackJockeysLounge(),
		scrapeStevieRays()
	])

	return [
		...headliners,
		...jazzSociety,
		...blackJockeysLounge,
		...stevieRays
	];
}