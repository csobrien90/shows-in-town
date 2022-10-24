import { scrapeHeadliners } from "./scrapers/Headliners.js";
import { scrapeLouisvilleJazzSociety } from "./scrapers/LouisvilleJazzSociety.js";

export async function getEvents() {
	const [headliners,
		jazzSociety
	] = await Promise.all([
		scrapeHeadliners(),
		scrapeLouisvilleJazzSociety()
	])

	return [
		...headliners,
		...jazzSociety
	];
}