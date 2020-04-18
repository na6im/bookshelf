import {screen} from '@testing-library/react'
beforeAll(() => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
})

test('renders the app', () => {
  require('..')

  screen.getByTitle('Bookshelf')
  screen.getByRole('heading', {name: /Bookshelf/i})
  screen.getByRole('button', {name: /Login/i})
  screen.getByRole('button', {name: /Register/i})
})
