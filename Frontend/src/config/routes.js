/* eslint-disable react/jsx-key */
import React, {lazy} from 'react'
import {Route} from 'react-router-dom'
import PrivateRoute from "../components/PrivateRoute";



const SignIn = lazy(() => import('../pages/auth/Signin'))
const Dashboard = lazy(() => import('../pages/Dashboard'))



const routes = [
    <Route key="/signin" path="/signin" redirectTo="/" exact component={SignIn}/>,    
    <PrivateRoute key="/dashboard" path={"/dashboard"} exact component={Dashboard}/>,
    <PrivateRoute key={"/"} path={"/"} exact component={Dashboard} />,
    <PrivateRoute key='404' exact component={NoMatchPage}/>
]

export default routes
