import './style.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Filtros from './Filtros';
import { useParams } from 'react-router-dom';

export default function Admininstrador(){
  
  const [ativos,setAtivos] = useState([])
  const [filtrados,setFiltrados] = useState(null)
  const { filtro } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/movimentacao/ativos`)
    .then(res => setAtivos(res.data.response))
  },[])

  function FiltrarItems(item){
    
    switch (filtro){
        case "todos":
          return item;
          break;
        case "sem-acesso":
          if(item.ANDAR_ATUAL !== item.ANDAR && item.SITUACAO === 1){
            return item;
          }
          break;
        case "com-acesso":
          if(item.ANDAR_ATUAL === item.ANDAR && item.SITUACAO === 1){
            return item;
          }
          break;
        case "ausentes":
          if(item.SITUACAO === 0){
            return item;
          }
          break;
        case "presentes":
            if(item.SITUACAO === 1){
              return item;
            }
            break;
        default:
          return item;
      } 
  }

  if(filtro && ativos.length > 0 && !filtrados ){
    setFiltrados(ativos.filter((item) => FiltrarItems(item)))
  }
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
                <th>Horário</th>
              </tr>
            </thead>
            <tbody >
        
          {(ativos.length)?
            (filtro && filtrados)?
            filtrados.map((funcionario) => (
              <tr key={funcionario.MATRICULA} className={
                (funcionario.SITUACAO === 1)?
                (funcionario.ANDAR !== funcionario.ANDAR_ATUAL)?
                  "sem-acesso":
                  "acesso-permitido"
                :"ausente"
                  }>
                <td>{funcionario.MATRICULA} </td>
                <td> {funcionario.NOME}</td>
                <td>{funcionario.ANDAR} </td>
                <td>{funcionario.ANDAR_ATUAL} </td>
                <td>{funcionario.SETOR} </td>
                <td>{funcionario.HORARIO}</td>
              </tr>
            ))
            :
            ativos.map((funcionario) => (
              <tr key={funcionario.MATRICULA} className={
                (funcionario.SITUACAO === 1)?
                (funcionario.ANDAR !== funcionario.ANDAR_ATUAL)?
                  "sem-acesso":
                  "acesso-permitido"
                :"ausente"
                  }>
                <td>{funcionario.MATRICULA} </td>
                <td> {funcionario.NOME}</td>
                <td>{funcionario.ANDAR} </td>
                <td>{funcionario.ANDAR_ATUAL} </td>
                <td>{funcionario.SETOR} </td>
                <td>{funcionario.HORARIO}</td>
              </tr>
            ))
          :<tr>
            <td colSpan="6">Nehum funcionário no local</td>
          </tr>}    
          </tbody>
          </table>
        </div>
      </section>
  )
}