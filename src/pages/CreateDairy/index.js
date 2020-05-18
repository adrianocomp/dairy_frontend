import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/Api';
import './styles.css';
 

export default function CreateDairy(){
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    

    const history = useHistory();
    const UserId = localStorage.getItem('userId');

    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            name,
            address,
            telephone,
            email,
            
        };
        console.log(data.name, data.address, data.telephone, data.email);
        try{
            const response = await api.post('dairys/create', data, {
                headers: {
                    Authorization: UserId,
                }});

            alert('Laticínio cadastrado com sucesso!');

            history.push('/profiles');
        } catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    }
    
    return (
        <div>
            <div>  
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="#">SiGQL</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/dairy/add">Cadastrar Laticínio<span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/producer/add">Cadastrar Produtor</Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/teste/add">Cadastrar Teste de Leite</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/help">Ajuda</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                </div>
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">   
            <div className="d-flex flex-column align-items-center justify-content-center">   
                <h3>Cadastro do Laticínio</h3>
                <form onSubmit={handleRegister}>
                    <div class="form-group mb-3">
                    <input
                        required
                        class = "form-control"
                        placeholder="Nome do laticínio"
                        value={name}
                        onChange={e=> setName(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <input
                        required
                        class = "form-control"
                        placeholder="Endereço"
                        value={address}
                        onChange={e=> setAddress(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <input
                        required
                        class = "form-control"
                        placeholder="Telefone"
                        value={telephone}
                        onChange={e=> setTelephone(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <input
                        required
                        class = "form-control"
                        type ="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                    <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
                    <div class="d-flex flex-column justify-content-center">
                        <Link className="btn btn-link" to="/Profiles">Voltar para listagem dos testes</Link>
                    </div>
            </div>
        </div>
        </div>
    );
}