react-children-by-type
======================

Simple utilities for React components to help in creating stricter component APIs.

## Intention

I like to be defensive with my components, not because developers can't be trusted,
but because good code is is easy to use and difficult to mess up. With that in mind,
I write parent / child relationship components where the parent will only accept
children of a particular type. This becomes useful in implementing all kinds of
complex use-cases, like named layouts, tables, tabs and accordions, cards, modals, etc.

Basically, anytime I'm making a component that encourages using specific children,
I use these utilities. See the example below for a named layout!

## Installation

```bash
npm install react-children-by-type
```

## Usage

```js
// golden-layout.js

import React from 'react'
import {oneByType, allByType, withoutTypes} from 'react-children-by-type'

import 'golden-layout.scss' // grid / flexbox layout rules

const GoldenLayout = ({children}) => {
  const header = oneByType(children, GoldenLayout.Header)
  const leftSidebar = oneByType(children, GoldenLayout.Left)
  const rightSidebar = oneByType(children, GoldenLayout.Right)
  const footer = oneByType(children, GoldenLayout.Footer)

  const content = allByType(children, GoldenLayout.Content)

  const extra = withoutTypes(children, GoldenLayout.Header, GoldenLayout.Left, GoldenLayout.Right, GoldenLayout.Content, GoldenLayout.Footer)

  return <div className="golden-layout">
    <header className="golden-layout--header">{header}</header>
    <aside className="golden-layout--left-sidebar">{leftSidebar}</aside>
    <main className="golden-layout--content">{content}</main>
    <div className="golden-layout--extra">{extra}</div>
    <aside className="golden-layout--right-sidebar">{rightSidebar}</aside>
    {footer && <footer className="golden-layout--footer">{footer}</footer>}
  </div>
}

GoldenLayout.Header = ({title}) => <h1>{title}</h1>
GoldenLayout.Left = ({children}) => <React.Fragment>{children}</React.Fragment>
GoldenLayout.Right = ({children}) => <React.Fragment>{children}</React.Fragment>
GoldenLayout.Footer = () => <React.Fragment>
  <ul>
    <li>link 1</li>
    <li>link 2</li>
    <li>link 3</li>
  </ul>
</React.Fragment>

export default GoldenLayout

// app.js

import React from 'react'
import ReactDOM from 'react-dom'
import GoldenLayout from './golden-layout'

const {Header, Content, Left, Right, Footer} = GoldenLayout

ReactDOM.render(
  <GoldenLayout>
    <Header title="Example page" />
    <Left>
      <ul>
        <li>Some link</li>
        <li>Some link</li>
        <li>Some link</li>
      </ul>
    </Left>

    <Content><article>Details details details 1...</article></Content>
    <Content><article>Details details details 2...</article></Content>
    <Content><article>Details details details 3...</article></Content>
    <Content><article>Details details details 4...</article></Content>

    <p>This random stuff will all</p>
    <p>end up in the extra bit.</p>

    <Right>
      <p>Author biography...</p>
    </Right>

    <Footer />
  </GoldenLayout>,
  document.getElementByID(`app`)
)
```
