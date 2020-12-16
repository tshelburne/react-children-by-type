import React from 'react'

export function oneByType(children, Component) {
	return getArray(children).find(elementHasType(Component)) || null
}

export function allByType(children, Component) {
	return getArray(children).filter(elementHasType(Component))
}

export function withoutTypes(children, ...Components) {
	const types = Components.map(getType)

	return getArray(children).filter(
		(child) => !types.includes(child.type)
	)
}

function getArray(children) {
	const array = React.Children.toArray(children)
	if (!React.Fragment) return array
	return array.flatMap((child) => {
		const isFragment = elementHasType(React.Fragment)(child)
		return isFragment ? getArray(child.props.children) : child
	})
}

function elementHasType(Component) {
	const type = getType(Component)
	return (element) => element.type === type
}

function getType(Component) {
	const original = console.error
	console.error = () => {}
	const element = React.createElement(Component)
	console.error = original
	return element.type
}