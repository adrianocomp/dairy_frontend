import React from 'react';
import {Link, useHistory} from 'react-router-dom';

import Slide1 from '../../assets/ajuda/Slide1.PNG';
import Slide2 from '../../assets/ajuda/Slide2.PNG';
import Slide3 from '../../assets/ajuda/Slide3.PNG';
import Slide4 from '../../assets/ajuda/Slide4.PNG';
import Slide5 from '../../assets/ajuda/Slide5.PNG';
import Slide6 from '../../assets/ajuda/Slide6.PNG';
import Slide7 from '../../assets/ajuda/Slide7.PNG';
import Slide8 from '../../assets/ajuda/Slide8.PNG';

export default function HelpScreenProducer() {

    const history = useHistory();

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div class="container-fluid">
            <div>  
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a class="navbar-brand" href="#">SiGQL</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/help">AJUDA</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" onClick={()=> {handleLogout()}}>LOGOUT</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="d-flex flex-column">
                <img src={Slide1} class="img-fluid"></img>
                <img src={Slide2} class="img-fluid"></img>
                <img src={Slide3} class="img-fluid"></img>
                <img src={Slide4} class="img-fluid"></img>
                <img src={Slide5} class="img-fluid"></img>
                <img src={Slide6} class="img-fluid"></img>
                <img src={Slide7} class="img-fluid"></img>
                <img src={Slide8} class="img-fluid"></img>
            </div>

        </div>
    );
}