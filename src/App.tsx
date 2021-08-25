import React from 'react';
import './App.css';
import NavMenu from "./components/NavMenu/NavMenu";
import Catalog from "./components/Catalog/Catalog";
import Authorization from "./components/Authorization/Authorization";
import {BrowserRouter, Switch, Route} from "react-router-dom";


const App: React.FC = () => {
    return (<div className="shopApp">
        <BrowserRouter>
            <NavMenu/>

            <Switch>
                <Route component={Catalog} path="/" exact/>
                <Route component={Authorization} path="/authorization"/>
            </Switch>
        </BrowserRouter>
    </div>);
}

export default App;
