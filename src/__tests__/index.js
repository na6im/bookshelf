import {screen, prettyDOM} from '@testing-library/react'

beforeAll(() => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
})

test('renders the app', () => {
  require('../index')

  screen.getByTitle('Bookshelf')
  screen.getByRole('heading', {name: /Bookshelf/i})
  screen.getByRole('button', {name: /Login/i})
  screen.getByRole('button', {name: /Register/i})

  const cssEl = document.querySelector('[css]')
  expect(
    cssEl,
    `
At least one element has an attribute called "css". This means that emotion did not compile the prop correctly.

Make sure to include this at the top of the file:

/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'


Here's the element that has the css attribute that wasn't compiled:

${prettyDOM(cssEl)}
    `.trim(),
  ).toBeNull()

  expect(
    document.body.innerHTML,
    `None of your elements are styled by emotion. Make sure to render a styled component and use the css prop.`,
  ).toContain('class="css-')
})
