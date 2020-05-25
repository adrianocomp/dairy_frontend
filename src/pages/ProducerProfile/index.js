import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import api from '../../services/Api';

export default function ProducerProfile(){
    
  const [testes, setTestes] = useState([]);

    const ProducerLogin = localStorage.getItem('producerLogin');
    const ProducerName = localStorage.getItem('producerName');

    //variables for pagination
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const history = useHistory();

    useEffect(() => {
        api.get('/testes/index_producer', {
            headers: {
                ProducerName,
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


    
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    const tempthreshold = 4;
    const isalizarol = "Conforme";
    
    return(
        <div id="root">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="#">SiGQL</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/helpProducer">AJUDA</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/">LOGOUT</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
        
        <div className="container">
                <p> </p>
                <span>Bem vindo(a), {ProducerName}</span>
                <p> </p>
            <h3>Testes Cadastrados</h3>
           <div className="border rounded shadow pt-3 pl-3 pr-3">
                <table className="table table-striped border rounded">
                    <thead className="thead-light text-center">
                        <tr>
                            <th>Produtor</th>
                            <th>Data do Teste</th>
                            <th>Hora do Teste</th>
                            <th>CPP</th>
                            <th>CCS</th>
                            <th>Temperatura do leite</th>
                            <th>Alizarol</th>
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