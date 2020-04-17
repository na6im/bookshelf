import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {homepage} from '../package.json'
import {useAuth} from './context/auth-context'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

const fullUrl = new URL(homepage)
const basename = fullUrl.pathname.endsWith('/')
  ? fullUrl.pathname.slice(0, fullUrl.pathname.length - 1)
  : fullUrl.pathname

function App() {
  const {user} = useAuth()
  return user ? (
    <Router basename={basename}>
      <AuthenticatedApp />
    </Router>
  ) : (
    <UnauthenticatedApp />
  )
}

export {App}
