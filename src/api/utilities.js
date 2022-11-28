const unEscapeWordPressHTML = (text) => {
	return text
		.replace(/(<([^>]+)>)/gi, ' ')
		.replaceAll(`\n`, ' ')
		.replaceAll("&amp;", '&')
		.replaceAll("&#038;", `&`)
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

const limitStringLength = (text, limit) => {
	if (text.length > limit) {
		let abbreviatedText = text.substr(0, limit)
		return abbreviatedText.substring(0, abbreviatedText.lastIndexOf(' ')) + ' [...] '
	} else {
		return text
	}
}

export { unEscapeWordPressHTML, limitStringLength }