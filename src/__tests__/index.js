import {
  screen,
  within,
  waitForElementToBeRemoved,
  userEvent,
} from 'test/app-test-utils'
import {buildUser} from 'test/generate'

beforeAll(() => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
})

test('can login and use the book search', async () => {
  require('..')

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  const user = buildUser()

  userEvent.click(screen.getByRole('button', {name: /register/i}))
  await userEvent.type(screen.getByLabelText(/username/i), user.username)
  await userEvent.type(screen.getByLabelText(/password/i), user.password)

  const inDialog = within(screen.getByRole('dialog'))

  userEvent.click(inDialog.getByRole('button', {name: /register/i}))

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

  userEvent.click(screen.getByRole('button', {name: /add to list/i}))

  // TODO: make this work
  // userEvent.click(await screen.findByRole('button', {name: /mark as read/i}))

  userEvent.click(screen.getByRole('button', {name: /logout/i}))

  expect(screen.getByRole('button', {name: /login/i})).toBeInTheDocument()
})
