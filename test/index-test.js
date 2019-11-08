import React from 'react'
import {expect} from 'chai'
import {create} from 'react-test-renderer'
import {oneByType, allByType, withoutTypes} from '../src/index'

const Type1 = ({v}) => <p>{v}</p>
const Type2 = ({v}) => <p>{v}</p>
const Type3 = ({v}) => <p>{v}</p>

describe(`#oneByType`, () => {
	it(`returns a child of the given type`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <Type2 v="1" />
		const renderer = create(<div>{child1}{child2}<div /></div>)
		expect(withoutKey(oneByType(renderer.root.props.children, Type1))).to.deep.equal(withoutKey(child1))
	})

	it(`returns only the first child of the given type`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <Type1 v="2" />
		const renderer = create(<div>{child1}{child2}<Type2 /><div /></div>)
		expect(withoutKey(oneByType(renderer.root.props.children, Type1))).to.deep.equal(withoutKey(child1))
	})

	it(`returns null if no child with the given type exists`, () => {
		const renderer = create(<div><Type2 /><div /></div>)
		expect(oneByType(renderer.root.props.children, Type1)).to.be.null
	})
})

describe(`#allByType`, () => {
	it(`returns all children of the given type`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <Type1 v="2" />
		const renderer = create(<div>{child1}{child2}<Type2 /><div /></div>)
		expect(allByType(renderer.root.props.children, Type1).map(withoutKey)).to.deep.equal([child1, child2].map(withoutKey))
	})

	it(`returns an empty array if no children with the given type exist`, () => {
		const renderer = create(<div><Type2 /><div /></div>)
		expect(allByType(renderer.root.props.children, Type1)).to.be.empty
	})
})

describe(`#withoutTypes`, () => {
	it(`returns all children not of the given types`, () => {
		const child1 = <Type1 />
		const child2 = <div />
		const renderer = create(<div>{child1}<Type2 /><Type3 />{child2}</div>)
		expect(withoutTypes(renderer.root.props.children, Type2, Type3).map(withoutKey)).to.deep.equal([child1, child2].map(withoutKey))
	})

	it(`returns an empty array if no children not of the given type exist`, () => {
		const renderer = create(<div><Type1 /><Type2 /></div>)
		expect(withoutTypes(renderer.root.props.children, Type1, Type2)).to.be.empty
	})
})

// this is necessary because react is copying the element and then adding a key - i would
// rather ignore keys than add a static value that guesses at their logic
function withoutKey({key, ...el}) {
	return el
}