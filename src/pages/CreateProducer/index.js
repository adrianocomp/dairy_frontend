import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2} from 'react-icons/fi';

import api from '../../services/Api';
import './styles.css';
 

export default function CreateProducer(){
    
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [producers, setProducers] = useState([]);

    const history = useHistory();
    const UserId = localStorage.getItem('userId');

    //variables for pagination
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);


    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            name,
            login,
            address,
            telephone,
        };
        try{
            await api.post('producers/create', data, {
                headers: {
                    Authorization: UserId,
                }});

            alert('Produtor cadastrado com sucesso!');

            history.push('/profiles');
        } catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    }
    
    useEffect(() => {
        api.get('/producers/index', {
            headers: {
                Authorization: UserId,
            }
        }).then(response => {
            setProducers(response.data);
        })
    }, [producers]);

     // Get current posts
     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     const currentProducers = producers.slice(indexOfFirstPost, indexOfLastPost);
 
     // Change page
     const paginate = pageNumber => setCurrentPage(pageNumber);
 
     const pageNumbers = [];
   
     for (let i = 1; i <= Math.ceil(producers.length / postsPerPage); i++) {
       pageNumbers.push(i);
     }

     async function handleDeleteProducer(id){
        console.log(id);
        try{
            await api.delete(`producers/delete/${id}`, {
                headers: {
                    Authorization: UserId,
                }
            });
            setProducers(producers.filter(producer => producer.id !== id));
        }catch(err){
            alert('Erro ao deleter caso, tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
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
                                <Link class="nav-link" to="/dairy/add">CADASTRAR LATICÍNIO<span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/producer/add">CADASTRAR PRODUTOR</Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/teste/add">CADASTRAR TESTE DO LEITE</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" to="/helpDairy">AJUDA</Link>
                            </li>
                            <li class="nav-item active">
                                <Link type="button" class="nav-link" onClick={()=> {handleLogout()}}>LOGOUT</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                </div>
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">   
            <div className="d-flex flex-column align-items-center justify-content-center">
            
                    <h3 class="mt-2">Cadastro do Produtor</h3>                
                    <form class="border rounded shadow pl-3 pr-3 pt-3 pb-3" onSubmit={handleRegister}>
                        <div class="row">
                        <div class="col-sm form-group mb-3">   
                            <input
                                required
                                class="form-control"
                                placeholder="Nome do Produtor"
                                value={name}
                                onChange={e=> setName(e.target.value)}
                            />
                        </div>
                        <div class="col-sm form-group mb-3">   
                            <input
                                required
                                class="form-control"
                                placeholder="Login do Produtor"
                                value={login}
                                onChange={e=> setLogin(e.target.value)}
                            />
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm form-group mb-3">
                            <input
                                required
                                class="form-control"
                                placeholder="Endereço"
                                value={address}
                                onChange={e=> setAddress(e.target.value)}
                            />
                        </div>
                        <div class="col-sm form-group mb-3">
                            <input
                                required
                                class="form-control"
                                placeholder="Telefone"
                                value={telephone}
                                onChange={e=> setTelephone(e.target.value)}
                            />                      
                        </div>
                        </div>
                        <div class="d-flex justify-content-center">
                    <button className="btn btn-primary" type="submit">Cadastrar</button>
                        </div>
                </form>
                
                <div className="d-flex flex-column justify-content-center">
                <Link className="btn btn-link" to="/Profiles">Voltar para listagem dos testes</Link>
                </div>
                <p></p>
                <h3>Produtores Cadastrados</h3>
                <div className="border rounded shadow pt-3 pl-3 pr-3 pb-3">
                <table className="table table-striped">
                    <thead className="thead-light text-center">
                        <tr>
                            <th>Produtor</th>
                            <th>login</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Apagar Produtor</th>
                        </tr>
                    </thead>
                        {currentProducers.map(producer => (
                            <tbody className="text-center" key={producer.id} >
                                <td>{producer.name}</td>
                                <td>{producer.login}</td>
                                {/*<!-- replace para corrigir o problema da formatação da hora -->*/}
                                <td>{producer.address}</td>
                                <td>{producer.telephone}</td>
                                <td> <a className="d-flex align-items-center justify-content-center" href="#" onClick={() => {handleDeleteProducer(producer._id)}}><FiTrash2 size={20} color="e63946"/> </a> </td>
                            </tbody>
                        ))}
                </table>
            </div>
            <div className="container-fluid align-items-center justify-content-center">  
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
        </div>
        </div>
    );
}