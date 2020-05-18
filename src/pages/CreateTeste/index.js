import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/Api';
import './styles.css';
 

export default function CreateTeste(){
    
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cpp, setCPP] = useState('');
    const [ccs, setCCS] = useState('');
    const [temp, setTemp] = useState('');
    const [alizarol, setAlizarol] = useState('');

    const [producers, setProducers] = useState([]);
    
    const history = useHistory();
    
    const UserId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('producers/index', {
            headers: {
                Authorization: UserId,
            }
        }).then(response => {
            setProducers(response.data);
        })
    }, [producers]);
    
    function handleRegister(e){
        async function insertTeste(){
            e.preventDefault();
        
            const data = {
                name,
                date,
                time,
                cpp,
                ccs,
                temp,
                alizarol,
            };
            console.log(data.name, data.date, data.time, data.cpp, data.ccs, data.temp, data.alizarol);
            try{
                const response = await api.post('testes/create', data, {
                    headers: {
                        Authorization: UserId,
                    }});

                alert('Teste cadastrado com sucesso!');
                console.log(response);
                history.push('/profiles');
            }catch(err){
                alert('Erro no cadastro, tente novamente');
            }
        }
        insertTeste();
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
        <div className="container-fluid d-flex align-items-center justify-content-center">   
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h3>Cadastro do Teste</h3>

                <form class="needs-validation" novalidate onSubmit={handleRegister}>
                    <div class="form-group mb-3">
                        <label for="select1">Produtor</label>                 
                        <select required className = "custom-select" id="select1" value={name} onChange={e=> setName(e.target.value)}>
                                <option disabled="" value="">Selecione o Produtor</option>
                                {producers.map(producer => (<option key={producer._id} value={producer.name}>{producer.name}</option>))}
                        </select>
                    </div>
                    <div class="form-group mb-3">
                    <label>Data</label>    
                    <input
                        required
                        type="date"
                        class="form-control"
                        placeholder="Data do Teste"
                        value={date}
                        onChange={e=> setDate(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <label>Hora</label>    
                    <input
                        required
                        type="time"
                        class="form-control"
                        placeholder="Hora do Teste"
                        value={time}
                        onChange={e=> setTime(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <label>CPP</label>
                    <input
                        
                        type="number"
                        pattern=".{6,6}"
                        min="0"
                        class="form-control" 
                        placeholder="CPP: até 300.000 UFC/mL"
                        value={cpp}
                        onChange={e=> setCPP(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <label>CCS</label>
                    <input
                        class="form-control"
                        type="number"
                        pattern=".{6,6}"
                        min="0"
                        placeholder="CSS: até 500.000 CCS/mL"
                        value={ccs}
                        onChange={e=> setCCS(e.target.value)}
                    />
                    </div>
                    <div class="form-group mb-3">
                    <label>Temperatura</label>   
                    <input
                        class="form-control"
                        type="number"
                        placeholder="Temperatura"
                        value={temp}
                        onChange={e=> setTemp(e.target.value)}
                    />
                    </div>
                    <div>
                    <label>Alizarol</label>
                    <div class="custom-control custom-radio">
                        <input required type="radio" id="conforme" name="radiobutton" class="custom-control-input" value={alizarol} onChange={e=> setAlizarol("Conforme")}/>
                        <label class="custom-control-label" for="conforme">Conforme</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input required type="radio" id="naoconforme" name="radiobutton" class="custom-control-input" value={alizarol} onChange={e=> setAlizarol("Não conforme")}/>
                        <label class="custom-control-label" for="naoconforme">Não Conforme</label>
                    </div>
                    <p></p>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
                <div className="d-flex flex-column justify-content-center">
                <Link className="btn btn-link" to="/Profiles">Voltar para listagem dos testes</Link>
                </div>
            </div>
        </div>
        </div>
    );
}