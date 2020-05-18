import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/Api';

import './styles.css';

//import DairyImg from '../../assets/dairy_farm.jpg';
import LogoImg from '../../assets/logo_ifmg.png';

export default function Logon(){

    localStorage.clear();

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const history = useHistory();
    
    function handleLogin(e){
        
        async function validateLogin() {
            e.preventDefault();
            
            try {
                const response = await api.get('login', {
                    headers: { login, pass }
                });
                if(response.data === null){
                    alert('Falha no Login, tente novamente.');
                }
                if (response) {
                    localStorage.setItem('userId', (response.data._id).toString());
                    localStorage.setItem('login', response.data.login);
                    localStorage.setItem('userName', response.data.name);
                    localStorage.setItem('usercanpublish', JSON.stringify(response.data.canpublish));
                    console.log(localStorage);
                    
                    if(response.data.canpublish){
                        history.push('/Profiles');
                    }else if(response.data === null){
                        alert('Falha no Login, tente novamente.'); 
                    }
                    
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
                            <div className="form-group mb-4">
                                        <input
                                            required
                                            className="form-control" 
                                            type = "password"
                                            placeholder="Sua Senha"
                                            value={pass}
                                            onChange={e=> setPass(e.target.value)}
                                        />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <button className="btn btn-primary" type="submit">Entrar</button>    
                            </div>
                        </form>
                            <div className="d-flex flex-column justify-content-center">
                                    <Link className="btn btn-link" to="/producerlogin">Produtor? Acesse aqui</Link>
                                    <Link className="btn btn-link" to="/user/add">Laticínio? Cadastre-se aqui</Link>
                                    <Link className="btn btn-link"to="/about">Sobre o projeto</Link>    
                            </div>
                            
                    </div>           
                </div>            
            </div>
        </div>
    )
}