import React, { Component } from 'react'

import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'

class Usuarios extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usuarios: []
    }

    this.adicionarUsuario = this.adicionarUsuario.bind(this)
  }

  adicionarUsuario(usuario) {
    const usuarios = [...this.state.usuarios, usuario]
    this.setState({ usuarios: usuarios })
  }

  removerUsuario(usuario) {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      
      fetch(`https://reqres.in/api/users/usuario.id`, 
      {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            let usuarios = this.state.usuarios
            usuarios = usuarios.filter(x => x.id !== usuario.id)
            this.setState({ usuarios: usuarios })
          }
        })
      
    }
  }

  // Melhor local para fazer a chamada
  componentDidMount(){
    // Retorna uma promise
    const resposta = fetch('https://reqres.in/api/users')
    console.log(resposta)

    fetch('https://reqres.in/api/users')
      .then(resposta => resposta.json())
      .then(dados => {
        //console.log(dados.data)

        // mudando nome das chaves para o esperado pela aplicação
        const usuarios = dados.data.map(usuario => {
          return {
            id: usuario.id,
            nome: usuario.first_name,
            sobrenome: usuario.last_name,
            email: usuario.email
          }
        })

        //console.log(usuarios)
        //quando a variavel tem o mesmo nome do objeto, podemos utilizar assim
        this.setState({ usuarios }) //this.setState({ usuarios: usuarios })
      })
  }

  render() {
    return (
      <>
        <AdicionarUsuario adicionarUsuario={this.adicionarUsuario} />

        {this.state.usuarios.map(usuario => (
          <Usuario key={usuario.id}
            usuario={usuario}
            removerUsuario={this.removerUsuario.bind(this, usuario)}
          />
        ))}
      </>
    )
  }
}

export default Usuarios