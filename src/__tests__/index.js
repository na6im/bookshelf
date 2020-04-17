import React from 'react'
import {ReactQueryConfigProvider} from 'react-query'
import {screen, waitForElementToBeRemoved, userEvent} from 'test/app-test-utils'
import {render} from '@testing-library/react'
import {buildUser} from 'test/generate'
import {App} from '../app'

beforeAll(() => {
  document.body.focus()
})

test('can login and use the book search', async () => {
  const queryConfig = {
    retry: 0,
    useErrorBoundary: true,
    refetchAllOnWindowFocus: false,
  }
  render(<App />, {
    wrapper: props => (
      <ReactQueryConfigProvider config={queryConfig} {...props} />
    ),
  })

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  const user = buildUser()

  userEvent.click(screen.getByRole('button', {name: /register/i}))
  await userEvent.type(screen.getByLabelText(/username/i), user.username)
  await userEvent.type(screen.getByLabelText(/password/i), user.password)

  userEvent.click(screen.getByRole('button', {name: /register/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  const discoverLink = screen.getAllByRole('link', {name: /discover/i})[0]
  discoverLink.focus()
  userEvent.click(discoverLink)

  const searchInput = screen.getByPlaceholderText(/search/i)
  await userEvent.type(searchInput, 'voice of war')

  userEvent.click(screen.getByLabelText(/search/i))
  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i))

  userEvent.click(screen.getByText(/voice of war/i))

  expect(window.location.href).toMatchInlineSnapshot(
    `"http://localhost/book/B084F96GFZ"`,
  )

  expect(
    await screen.findByText(/to the west, a sheltered girl/i),
  ).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', {name: /logout/i}))

  expect(searchInput).not.toBeInTheDocument()
})
