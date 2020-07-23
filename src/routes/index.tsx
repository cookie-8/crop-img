import React, { lazy } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Bundle from '@src/components/Bundle'

const Index = lazy(() => import('@src/pages/index'))
const Hooks = lazy(() => import('@src/pages/hooks'))
import ErrorPages from './error'

const Routes = () => (
  <Router>
    <>
      <Switch>
        <Route path="/" exact component={Bundle(Index)} />
        <Route path="/hooks" exact component={Bundle(Hooks)} />
        {/* other Route */}
        <ErrorPages />
      </Switch>
    </>
  </Router>
)

export default Routes
