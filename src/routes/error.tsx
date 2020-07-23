import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Bundle from '@src/components/Bundle'
const Page404 = lazy(() => import('./../pages/error/404'))

const ErrorRoute = () => {
    return (
        <>
            <Route path="/500" exact component={Bundle(Page404)} />
            <Route component={Bundle(Page404)} />
        </>
    )
}

export default ErrorRoute
