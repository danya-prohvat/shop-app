import React, {useEffect} from 'react';
import './App.css';
import NavMenu from "./components/NavMenu/NavMenu";
import Catalog from "./components/Catalog/Catalog";
import Authorization from "./components/Authorization/Authorization";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Page404 from "./components/Page404/Page404";


const App: React.FC = () => {
    return (<div className="shopApp">
        <BrowserRouter>
            <NavMenu/>

            <Switch>
                <Route component={Catalog} path="/" exact/>
                <Route component={Authorization} path="/authorization"/>
                <Route path="*" component={Page404}/>
            </Switch>
        </BrowserRouter>
    </div>);
}

export default App;
