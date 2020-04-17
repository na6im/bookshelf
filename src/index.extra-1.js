import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from './context/auth-context'
import {App} from './app'

const queryConfig = {
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

loadDevTools(() => {
  ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReactQueryConfigProvider>,
    document.getElementById('root'),
  )
})
