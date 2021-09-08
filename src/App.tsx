import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import Catalog from "./components/Catalog/Catalog";
import Authorization from "./components/Authorization/Authorization";
import Page404 from "./components/Page404/Page404";


const App: React.FC = () => {
    return (<div className="">
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