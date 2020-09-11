import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'

function DetalhesUsuario() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        // funciona como componentDidMount
        fetch(`https://reqres.in/api/users/${id}`)
          .then(resposta => resposta.json())
          .then(dados => {
              if (dados.data) {
                  setUsuario({
                      id: dados.data.id,
                      nome: dados.data.first_name,
                      sobrenome: dados.data.last_name,
                      email: dados.data.email,
                      foto: dados.data.avatar   
                  })
                }
              })
            // passar id no array para ser uma dependencia
          }, [id])

          if (usuario.nome !== undefined) {
              return <>
                <h1>{usuario.nome} {usuario.sobrenome}</h1>
                <img src={usuario.foto} alt={usuario.nome} />
                <p>{usuario.email}</p>
                <Link to="/usuarios">Voltar</Link>
              </>
          }

    return <>
        <h1>Usuario não encontrado</h1>
        <Link to="/usuarios">Voltar</Link>
    </>
}

export default DetalhesUsuario ;