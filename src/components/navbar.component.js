import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './styles.css';
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Gerenciamento do Leite</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Visualizar Testes</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Cadastrar Produtor</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Cadastrar Teste</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Cadastrar Laticínio</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}