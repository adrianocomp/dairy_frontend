import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';



import Logon from './pages/Logon';
import Profiles from './pages/Profiles';
import CreateUser from './pages/CreateUser';
import CreateDairy from './pages/CreateDairy';
import CreateProducer from './pages/CreateProducer';
import CreateTeste from './pages/CreateTeste';
import About from './pages/About';
import Help from './pages/Help';
import ProducerLogin from './pages/ProducerLogin';
import ProducerProfile from './pages/ProducerProfile';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Logon} />
                <Route path="/profiles" component = {Profiles} />
                <Route path="/user/add" component = {CreateUser} />
                <Route path="/dairy/add" component = {CreateDairy}/>
                <Route path="/producer/add" component = {CreateProducer}/>
                <Route path="/teste/add" component = {CreateTeste}/>
                <Route path="/about" component = {About}/>
                <Route path="/producerlogin" component = {ProducerLogin}/>
                <Route path="/producer/profiles" component = {ProducerProfile}/>
                <Route path="/help" component = {Help}/>
            </Switch>
        </BrowserRouter>
    );
}