import React, { lazy } from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Bundle from '@src/components/Bundle'

const Index = lazy(() => import('@src/pages/index'))

import ErrorPages from './error'

const Routes = () => (
  <Router>
    <Switch>
      <Redirect path="/" to="/index" exact></Redirect>
      <Route path="/index" exact component={Bundle(Index)} />
      {/* other Route */}
      <ErrorPages />
    </Switch>
  </Router>
)

export default Routes
