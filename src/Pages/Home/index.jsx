import axios from 'axios'
import { useState } from 'react'
import './style.css'

export default function Home() {

  const [RFID,setRFID] = useState("")
  const [dados,setDados] = useState(null)
  const [status,setStatus] = useState(null)
  
  const andar_atual = 5

  if(RFID.toString().length === 24){
    setRFID("");
    ValidaRFID(RFID)
  }

function ValidaRFID(RFID){

  axios.get(`http://localhost:3000/movimentacao/isAtivo/${RFID}`)
  .then(res => {  
      if(res.data.length > 0){
        setStatus(res.data[0].SITUACAO)
      }
      (res.data.length > 0)?
        axios.put(`http://localhost:3000/movimentacao/atualizar`,{
          "RFID": RFID
        }):axios.post(`http://localhost:3000/movimentacao/cadastrar`,{
            "RFID": RFID,
            "ANDAR_ATUAL": 10,
            "SITUACAO": 1
          })
  }
      )
    axios.get(`http://localhost:3000/RFID/validar/${RFID}`)
    .then(res => setDados(res.data))
  }

  return (
    <div className='main'>
      <a href="/administrador" className='info'>Ver informações</a>
      <section className={(dados && dados.length > 0 && dados[0].ANDAR !== andar_atual)? 'noAcess validacao':'validacao'}>
            <h1 className='title'>Validação RFID</h1>
            <input 
              className={(dados && dados.length === 0)?
              'input_rfid error'
              :'input_rfid'}
              placeholder='Insira o RFID'
              type="text" 
              name="RFID" 
              id="RFID"
              value={RFID}
              onChange={(e) => setRFID(e.target.value)}
              />
              {
                (dados && typeof dados[0] == "object")?(
                  <div className='dados_funcionario'>
                    <h1>Dados</h1>
                    <h2><span>NOME:</span> {dados[0].NOME}</h2>
                    <h3><span>SETOR:</span> {dados[0].SETOR}</h3>
                    <p><span>ANDAR:</span> {dados[0].ANDAR}</p>
                  </div>
                ):null
              }
              {
                (dados && dados.length === 0)?
                  <p className='credenciais_invalidas'>Credenciais Inválidas</p>
                  :null
              }
              {
                (!dados)?<p className='credenciais'>Por favor , insira seu RFID</p>:null
              }
              {
                (dados && dados.length > 0 && dados[0].ANDAR !== andar_atual)? <p className='noAcess-txt'>{dados[0].NOME.split(" ")[0]} {dados[0].NOME.split(" ")[1]} não possui permissão para acessar o andar {andar_atual}</p>:null
              }
              {
               (dados && dados.length > 0 && dados[0].ANDAR === andar_atual)? <p className='Acess-txt'>{dados[0].NOME.split(" ")[0]} {dados[0].NOME.split(" ")[1]} possui permissão para acessar o andar {andar_atual}</p>:null
              }
              {
                (status)?<p>Entrou no andar {andar_atual}</p>:(status !== null)?<p>Saiu do Prédio</p>:null
              }
          </section>
    </div>
   
  )
}