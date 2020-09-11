import React from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import Usuarios from './components/Usuarios/Usuarios'
import AdicionarUsuario from './components/AdicionarUsuario/AdicionarUsuario';
import Home from './components/home/Home';
import DetalhesUsuario from './components/DetalhesUsuario'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><NavLink to="/">Inicío</NavLink></li>
              <li><NavLink to="/usuarios">Usuários cadastrados</NavLink></li>
              <li><NavLink to="/adicionar">Adicionar usuário</NavLink></li>
            </ul>
          </nav>
        </header>

        <main>
          <Switch>

          <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/usuarios/:id">
              <DetalhesUsuario />
            </Route>

            <Route path="/usuarios">
              <Usuarios />
            </Route>

            <Route path="/adicionar">
              <AdicionarUsuario />
            </Route>

            <Route path="*">
              <PaginaNaoEncontrada />
            </Route>

          </Switch>

        </main>
      </div>

    </Router>
  );
}

function PaginaNaoEncontrada(){

  return <>
    <h1>404</h1>
    <p>Página não encontrada!</p>
  </>
}
export default App;
