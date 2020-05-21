import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import api from '../../services/Api';

import './styles.css';
import { FiTrash2 } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';

export default function Profiles(){
    
  const [testes, setTestes] = useState([]);

    const UserId = localStorage.getItem('userId');
    const UserName = localStorage.getItem('userName');


    //variables for Teste Edit

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cpp, setCPP] = useState('');
    const [ccs, setCCS] = useState('');
    const [temp, setTemp] = useState('');
    const [alizarol, setAlizarol] = useState('');
    
    const [producers, setProducers] = useState([]);

    useEffect(() => {
        api.get('producers/index', {
            headers: {
                Authorization: UserId,
            }
        }).then(response => {
            setProducers(response.data);
        })
    }, [producers]);

    //variables for pagination
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const history = useHistory();

    useEffect(() => {
        api.get('testes/index', {
            headers: {
                Authorization: UserId,
            }
        }).then(response => {
            setTestes(response.data);
        })
    }, [testes]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentTestes = testes.slice(indexOfFirstPost, indexOfLastPost);


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(testes.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const [testemodal, setTesteModal] = useState([]);

    function handleFillModal(id){
        
        setTesteModal(testes.filter(teste => teste._id === id));
        
    }
    const dataTeste = {
        name,
        date,
        time,
        cpp,
        ccs,
        temp,
        alizarol,
    };
    async function handleUpdateTeste(id){
        try{
            await api.post(`testes/update/${id}`, dataTeste, {
                headers: {
                    Authorization: UserId,
                }
            });
            alert('Teste atualizado com sucesso!');
            history.push('/profiles');
        }catch(err){
            alert('Erro ao atualizar teste, tente novamente');
        }
    }

    async function handleDeleteTeste(id){
        
        try{
            await api.delete(`testes/delete/${id}`, {
                headers: {
                    Authorization: UserId,
                }
            });
            setTestes(testes.filter(teste => teste.id !== id));
        }catch(err){
            alert('Erro ao deleter caso, tente novamente');
        }
    }

       
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    const tempthreshold = 4;
    const isalizarol = "Conforme";
    
    return(
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
                                <Link class="nav-link" to="/teste/add">Cadastrar Teste do Leite</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/help">Ajuda</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" onClick={()=> {handleLogout()}}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                </div>     
        <div className="container">
                <p> </p>
                <span>Bem vindo(a), {UserName}</span>
                <p> </p>
            <h3>Testes Cadastrados</h3>
           <div className="border rounded shadow pt-3 pl-3 pr-3">
                <table className="table table-striped border rounded">
                    <thead className="thead-light text-center">
                        <tr>
                            <th>Produtor</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>CPP</th>
                            <th>CCS</th>
                            <th>Temperatura do leite</th>
                            <th>Alizarol</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                        {currentTestes.map(teste => (
                            <tbody className="text-center" key={teste.id} >
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{teste.name}</td>
                                {/*<!-- replace para corrigir o problema da formatação da hora -->*/}
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{new Intl.DateTimeFormat("pt-BR").format(new Date(teste.date.replace(/-/g, '\/').replace(/T.+/, '')))}</td>
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{teste.time}</td>
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{teste.cpp}{"  UFC/mL"}</td>
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{teste.ccs}{"  CCS/mL"}</td>
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{teste.temp}{"ºC"}</td>
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}>{teste.alizarol}</td>
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}> <Link data-toggle="modal" data-target="#EditModalCenter" onClick={() => {handleFillModal(teste._id)}}><TiPencil size={20} color="e63946"/></Link><span> </span><Link className="flex-row" onClick={() => {handleDeleteTeste(teste._id)}}><FiTrash2 size={20} color="e63946"/> </Link> </td>
                            </tbody>
                        ))}
                </table>
            </div>
            
        </div>
        <div className="container align-items-center justify-content-center">  
                <nav>
                    <ul className='pagination'>
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                <a onClick={() => paginate(number)} className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
           
            
            <div class="modal fade" id="EditModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Editar Teste do Leite</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/*default value on those inputs for enable editing. */}
                    
                    <div class="modal-body">
                    {testemodal.map(teste => ( 
                    <form class="needs-validation" novalidate key={teste.id}>
                    <div class="row">
                    <div class="col-sm form-group mb-3">
                        <label for="select1">Produtor</label>                 
                        <select required className = "custom-select" id="select1" value={name} onChange={e=> setName(e.target.value)}>
                                <option disabled="" value="">Selecione o Produtor</option>
                                
                                {producers.map(producer => (<option key={producer._id} defaultValue={producer.name}>{producer.name}</option>))}
                        </select>
                    </div>
                    <div class="col-sm form-group mb-3">
                    <label>Data</label>    
                    <input
                        required
                        type="date"
                        class="form-control"
                        placeholder="Data do Teste"
                        defaultValue={new Intl.DateTimeFormat("pt-BR").format(new Date(teste.date.replace(/-/g, '\/').replace(/T.+/, '')))}
                        onChange={e=> setDate(e.target.value)}
                    />
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-sm form-group mb-3">
                    <label>Hora</label>    
                    <input
                        required
                        type="time"
                        class="form-control"
                        placeholder="Hora do Teste"
                        defaultValue={teste.time}
                        onChange={e=> setTime(e.target.value)}
                    />
                    </div>
                    <div class="col-sm form-group mb-3">
                    <label>CPP</label>
                    <input
                        type="number"
                        pattern=".{6,6}"
                        min="0"
                        class="form-control" 
                        placeholder="CPP: até 300.000 UFC/mL"
                        defaultValue={teste.cpp}
                        onChange={e=> setCPP(e.target.value)}
                    />
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-sm form-group mb-3">
                    <label>CCS</label>
                    <input
                        class="form-control"
                        type="number"
                        pattern=".{6,6}"
                        min="0"
                        placeholder="CSS: até 500.000 CCS/mL"
                        defaultValue={teste.ccs}
                        onChange={e=> setCCS(e.target.value)}
                    />
                    </div>
                    <div class="col-sm form-group mb-3">
                    <label>Temperatura</label>   
                    <input
                        class="form-control"
                        type="number"
                        placeholder="Temperatura"
                        defaultValue={teste.temp}
                        onChange={e=> setTemp(e.target.value)}
                    />
                    </div>
                    </div>
                    <div>
                    <label>Alizarol</label>
                    <div class="custom-control custom-radio">
                        <input required type="radio" id="conforme" name="radiobutton" class="custom-control-input" defaultValue={teste.alizarol} onChange={e=> setAlizarol("Conforme")}/>
                        <label class="custom-control-label" for="conforme">Conforme</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input required type="radio" id="naoconforme" name="radiobutton" class="custom-control-input" defaultValue={teste.alizarol} onChange={e=> setAlizarol("Não conforme")}/>
                        <label class="custom-control-label" for="naoconforme">Não Conforme</label>
                    </div>
                    </div>
                    <div class="row d-flex justify-content-end mr-2">
                        <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" onClick={() => {handleUpdateTeste(teste._id)}} data-dismiss="modal">Salvar Alterações</button>
                    </div>
                    
                </form>
                    ))}
                    </div>
                    
                   
                </div>
                
            </div>
        </div>
        
    </div>   
    );

}

    
/*<div className="pagination">
          <span>&laquo;</span>
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          </div>*/