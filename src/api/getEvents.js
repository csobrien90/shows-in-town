import { scrapeHeadliners } from "./scrapers/Headliners.js";
import { scrapeLouisvilleJazzSociety } from "./scrapers/LouisvilleJazzSociety.js";
import { scrapeBlackJockeysLounge } from "./scrapers/BlackJockeysLounge.js";

export async function getEvents() {
	const [headliners,
		jazzSociety,
		blackJockeysLounge
	] = await Promise.all([
		scrapeHeadliners(),
		scrapeLouisvilleJazzSociety(),
		scrapeBlackJockeysLounge()
	])

	return [
		...headliners,
		...jazzSociety,
		...blackJockeysLounge
	];
}