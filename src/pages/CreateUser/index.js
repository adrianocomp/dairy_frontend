import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/Api';
import './styles.css';
  

export default function CreateUser(){
    
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            login,
            pass,
            name,
            email,
        };
        try{
            await api.post('users/create', data);

            alert('Usuário cadastrado com sucesso!');

            history.push('/');
        } catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    
    
    return (
    
        <div className="container-fluid d-flex align-items-center justify-content-center">   
            <div className="card shadow p-2 animated" style={{ minWidth: '350px' }}>
                <div className="card-body">
                    <div className="logo text-center mb-5">
                        
                            <h3>SiGQL - Cadastro</h3>
                            <p>Faça seu cadastro para ter acesso ao sistema.</p>
                    </div>
                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                    <input
                        
                        className="form-control"
                        required
                        placeholder="Informe o seu Login"
                        value={login}
                        onChange={e=> setLogin(e.target.value)}
                    />
                    </div>
                    <div className="form-group mb-3">
                    <input
                        className="form-control"
                        required
                        type="password" 
                        placeholder="Informe sua senha"
                        value={pass}
                        onChange={e=> setPass(e.target.value)}
                    />
                    </div>
                    <div className="form-group mb-3">
                    <input
                        className="form-control" 
                        required
                        placeholder="Informe o seu nome"
                        value={name}
                        onChange={e=> setName(e.target.value)}
                    />
                    </div>
                    <div className="form-group mb-3">
                    <input
                        className="form-control"
                        required
                        type ="email"
                        placeholder="Informe seu email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                    <button className="btn btn-primary" type="submit">Cadastrar</button>
                    
                    </div>
                </form>
                <div className="d-flex flex-column justify-content-center">
                <button className="btn btn-link" onClick={handleLogout}>Voltar para a página inicial</button>
                </div>
                
            </div>
        </div>
        </div>
        
    );
}