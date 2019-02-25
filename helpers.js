module.exports = {
	screamIt: text => text.toUpperCase(),
	noSpace: text => text.split(' ').join(''),
	getCurrentYear: () => new Date().getFullYear()
}