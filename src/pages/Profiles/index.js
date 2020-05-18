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

    async function handleDeleteTeste(id){
        console.log(id);
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
                                <td style={{backgroundColor: tempthreshold > teste.temp ? "white" : "#e6b2b2" }}> <Link to="/teste/add"><TiPencil size={20} color="e63946"/></Link><span> </span><Link className="flex-row" onClick={() => {handleDeleteTeste(teste._id)}}><FiTrash2 size={20} color="e63946"/> </Link> </td>
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