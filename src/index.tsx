import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'
import './styles/base.scss'

function AppRouter(): JSX.Element {
  return (
    <div>
      <Routes />
    </div>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root-app'))
