const unEscapeWordPressHTML = (text) => {
	return text
		.replace(/(<([^>]+)>)/gi, ' ')
		.replaceAll(`\n`, ' ')
		.replaceAll("&amp;", '&')
		.replaceAll("&lt;", '<')
		.replaceAll("&gt;", '>')
		.replaceAll("&quot;", '"')
		.replaceAll("&#039;", "'")
		.replaceAll("&#8217;", "'")
		.replaceAll("&#8220;", '"')
		.replaceAll("&#8221;", '"')
		.replaceAll("&#8211;", '-')
		.replaceAll("&nbsp;", ' ')
		.replaceAll("&rsquo;", `'`)
		.trim()
}

export { unEscapeWordPressHTML }