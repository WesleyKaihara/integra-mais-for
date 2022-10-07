import './style.css'
import axios from 'axios'
import { useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';

export default function Filtros() {

  const [pessoas,setPessoas] = useState([]);
  const { filtro } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/movimentacao/ativos`)
    .then(res => setPessoas(res.data.response))
  },[])

  return (
    <div className='filtros'>
      <h1 className='filtros_title'>Integra+</h1>
      <p className='info_filtro'>Pessoa no prédio: {(pessoas.length)}</p>
      <select name="filtro" id="filtro" onChange={(item) => window.location.href = ("http://localhost:3001/administrador/"+item.target.value)}>
        <option value="filtrar">Filtrar</option>
        <option value="sem-acesso">Sem acesso</option>
        <option value="com-acesso">Com acesso</option>
        <option value="ausentes">Ausente</option>
        <option value="presentes">Presente</option>
        <option value="todos">Todos</option>
      </select>
      {(filtro)?<p className='info_filtro'>Buscar por: {filtro}</p>:""}
      <a href="/" className='filtro_link'><h3 >Validar RFID</h3></a>

    </div>
  )
}