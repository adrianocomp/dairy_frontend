import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/Api';

//import DairyImg from '../../assets/dairy_farm.jpg';
import LogoImg from '../../assets/logo_ifmg.png';

export default function ProducerLogin(){

    localStorage.clear();

    const [login, setLogin] = useState('');

    const history = useHistory();
    
    function handleLogin(e){
        
        async function validateLogin() {
            e.preventDefault();
            
            try {
                const response = await api.get('/producers/login', {
                    headers: { login }
                });
                if(response.data === null){
                    alert('Falha no Login, tente novamente.');
                }
                if (response) {
                    
                    localStorage.setItem('producerLogin', response.data.login);
                    localStorage.setItem('producerName', response.data.name);
                    
                    history.push('/producer/profiles');
                   
                }else if(response.data === null){
                    alert('Falha no Login, tente novamente.'); 
                }
            } catch (err) { 

            }
            
        }
    
        validateLogin();
    }
    
    return(
        <div className="container-fluid d-flex align-items-center justify-content-center h-100 bg-light">
            <div className="d-flex flex-column justify-content-center">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <div className="card shadow p-2 animated" style={{ minWidth: '350px' }}>
					<div className="card-body">
						<div className="logo text-center mb-5">
                            <img src={LogoImg} alt="IFMG" height="100px" width="px" />
                            <p></p>
                            <link href='http://fonts.googleapis.com/css?family=Arvo' rel='stylesheet'  type='text/css'></link>
                            <h2>SiGQL</h2>
                            <span>Produtor insira o login fornecido</span>
                            <p>pelo laticínio para ter acesso ao sistema</p>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <input
                                    
                                    required
                                    className="form-control" 
                                    placeholder="Seu Login"
                                    value={login}
                                    onChange={e=> setLogin(e.target.value)}
                                />
                            </div>
                            
                            <div className="d-flex flex-column justify-content-center">
                                <button className="btn btn-primary" type="submit">Entrar</button>    
                            </div>
                        </form>  
                    </div>           
                </div>            
            </div>
        </div>
    )
}