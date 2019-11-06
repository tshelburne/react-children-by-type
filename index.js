const React = require(`react`)

function elementHasType(Component) {
	return (element) => element.type === React.createElement(Component).type
}

exports.oneByType = function(children, Component) {
	return React.Children.toArray(children).find(elementHasType(Component))
}

exports.allByType = function(children, Component) {
	return React.Children.toArray(children).filter(elementHasType(Component))
}

exports.withoutTypes = function(children, ...Components) {
	const types = Components.map((C) => React.createElement(C).type)

	return React.Children.toArray(children).filter(
		(child) => !types.includes(child.type)
	)
}