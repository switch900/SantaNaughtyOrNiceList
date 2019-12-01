import React, { Component } from 'react';
import { NavMenu } from './components/NavMenu';
import { LoginForm } from './components/LoginForm';
//import Logout  from './components/Logout';
import { RegisterForm } from './components/RegisterForm';
import EditChildPage from './pages/EditChildPage';
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SantaListPage from "./pages/SantaListPage";
import ChildDetailPage from "./pages/ChildDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (  
            <>     
           
            <Router>
                <div className="container">
                    <NavMenu />
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/about" component={AboutPage} exact />
                        <Route path="/list" component={SantaListPage} exact />        
                        <Route path="/login" component={LoginForm} exact />
                        <Route path="/register" component={RegisterForm} exact />
                        <Route path="/detail/:id" component={ChildDetailPage} exact />
                        <Route path="/edit/:id" component={EditChildPage} exact />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
                      
           </>
        )
    }
}
