import React from 'react'
import PropTypes from 'prop-types'
import {expect} from 'chai'
import {spy} from 'sinon'
import {create} from 'react-test-renderer'
import {oneByType, allByType, withoutTypes} from '../src/index'

const Type1 = ({v}) => <p>{v}</p>
Type1.propTypes = {
	v: PropTypes.string.isRequired
}
const Type2 = ({v}) => <p>{v}</p>
const Type3 = ({v}) => <p>{v}</p>

beforeEach(() => {
	spy(console, `error`)
})

afterEach(() => {
	expect(console.error.called).to.be.false
	console.error.restore()
})

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

	it(`ignores fragments as if they are invisible`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <Type1 v="2" />
		const renderer = create(<div><React.Fragment>{child1}</React.Fragment>{child2}<Type2 /><div /></div>)
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

	it(`ignores fragments as if they are invisible`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <Type1 v="2" />
		const renderer = create(<div><React.Fragment>{child1}<React.Fragment>{child2}<Type2 /></React.Fragment></React.Fragment><div /></div>)
		expect(allByType(renderer.root.props.children, Type1).map(withoutKey)).to.deep.equal([child1, child2].map(withoutKey))
	})

	it(`returns an empty array if no children with the given type exist`, () => {
		const renderer = create(<div><Type2 /><div /></div>)
		expect(allByType(renderer.root.props.children, Type1)).to.be.empty
	})
})

describe(`#withoutTypes`, () => {
	it(`returns all children not of the given types`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <div />
		const renderer = create(<div>{child1}<Type2 /><Type3 />{child2}</div>)
		expect(withoutTypes(renderer.root.props.children, Type2, Type3).map(withoutKey)).to.deep.equal([child1, child2].map(withoutKey))
	})

	it(`ignores fragments as if they are invisible`, () => {
		const child1 = <Type1 v="1" />
		const child2 = <div />
		const renderer = create(<div><React.Fragment>{child1}<Type2 /></React.Fragment><Type3 />{child2}</div>)
		expect(withoutTypes(renderer.root.props.children, Type2, Type3).map(withoutKey)).to.deep.equal([child1, child2].map(withoutKey))
	})

	it(`returns an empty array if no children not of the given type exist`, () => {
		const renderer = create(<div><Type1 v="1" /><Type2 /></div>)
		expect(withoutTypes(renderer.root.props.children, Type1, Type2)).to.be.empty
	})
})

// this is necessary because react is copying the element and then adding a key - i would
// rather ignore keys than add a static value that guesses at their logic
function withoutKey({key, ...el}) {
	return el
}