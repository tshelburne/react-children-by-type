import React from 'react'

function elementHasType(Component) {
	const type = getType(Component)
	return (element) => element.type === type
}

export function oneByType(children, Component) {
	return React.Children.toArray(children).find(elementHasType(Component)) || null
}

export function allByType(children, Component) {
	return React.Children.toArray(children).filter(elementHasType(Component))
}

export function withoutTypes(children, ...Components) {
	const types = Components.map(getType)

	return React.Children.toArray(children).filter(
		(child) => !types.includes(child.type)
	)
}

function getType(Component) {
	const original = console.error
	console.error = () => {}
	const element = React.createElement(Component)
	console.error = original
	return element.type
}