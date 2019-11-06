import React from 'react'

function elementHasType(Component) {
	return (element) => element.type === React.createElement(Component).type
}

export function oneByType(children, Component) {
	return React.Children.toArray(children).find(elementHasType(Component))
}

export function allByType(children, Component) {
	return React.Children.toArray(children).filter(elementHasType(Component))
}

export function withoutTypes(children, ...Components) {
	const types = Components.map((C) => React.createElement(C).type)

	return React.Children.toArray(children).filter(
		(child) => !types.includes(child.type)
	)
}