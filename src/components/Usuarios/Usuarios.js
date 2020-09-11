import React, { useState, useEffect } from 'react'

import Usuario from '../Usuario/Usuario'

function Usuarios() {

  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    // funciona como componentDidMount
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
        setUsuarios(usuarios)
      })
      // adicionar array vazio comom segundo parametro para nao entrar em loop 
  }, [])


  const removerUsuario = usuario => {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      
      fetch(`https://reqres.in/api/users/usuario.id`, 
      {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            //let usuarios = this.state.usuarios
            setUsuarios(usuarios.filter(x => x.id !== usuario.id))
            //this.setState({ usuarios: usuarios })
          }
        })
      
    }
  }
  

    return (
      <>

        {usuarios.map(usuario => (
          <Usuario key={usuario.id}
            usuario={usuario}
            removerUsuario={() => removerUsuario(usuario)}
          />
        ))}
      </>
    )

}

export default Usuarios