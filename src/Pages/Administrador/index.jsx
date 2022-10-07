import './style.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Filtros from './Filtros';

export default function Admininstrador(){

  const [ativos,setAtivos] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/movimentacao/ativos`)
    .then(res => setAtivos(res.data.response))
  },[])

  return (
      <section className='administrador'>
        <Filtros/>
        <div className='tabela'>
          <table className='funcionarios'>
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Andar</th>
                <th>Andar Atual</th>
                <th>Setor</th>
              </tr>
            </thead>
            <tbody >
        
          {(ativos.length > 0)?
            ativos.map((funcionario) => (
              <tr key={funcionario.MATRICULA} className={(funcionario.ANDAR !== funcionario.ANDAR_ATUAL )?"sem-acesso":"acesso-permitido"}>
                <td>{funcionario.MATRICULA} </td>
                <td> {funcionario.NOME}</td>
                <td>{funcionario.ANDAR} </td>
                <td>{funcionario.ANDAR_ATUAL} </td>
                <td>{funcionario.SETOR} </td>
              </tr>
            ))
          :<tr>
            <td colSpan="5">Nehum funcionário no local</td>
          </tr>}    
          </tbody>
          </table>
        </div>
      </section>
  )
}