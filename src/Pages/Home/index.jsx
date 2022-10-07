import axios from 'axios'
import { useState } from 'react'
import './style.css'

export default function Home() {

  const [RFID,setRFID] = useState("")
  const [dados,setDados] = useState(null)



  if(RFID.toString().length === 24){
    setRFID("");
    ValidaRFID(RFID)
  }

function ValidaRFID(RFID){
    axios.post(`http://localhost:3000/movimentacao/cadastrar`,{
      "RFID": RFID,
      "ANDAR_ATUAL": 2,
      "SITUACAO": 1
    })
    axios.get(`http://localhost:3000/RFID/validar/${RFID}`)
    .then(res => setDados(res.data))
  }

  return (
    <div className='main'>
      <section className='validacao'>
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
          </section>
    </div>
   
  )
}