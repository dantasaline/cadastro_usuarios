import { Pencil, Trash2 } from 'lucide-react'
import './style.css'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  // let usuarios = []

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()


  async function getUsuarios(){
    const usuariosdaApi = await api.get('/cadastro')
    setUsuarios(usuariosdaApi.data)
    console.log(usuarios)
  }

  async function createUsuarios(){
    await api.post('/cadastro',{
      email: inputEmail.current.value,
      nome: inputNome.current.value,
      idade: inputIdade.current.value
    })
    getUsuarios()

    inputNome.current.value = ''
    inputEmail.current.value = ''
    inputIdade.current.value = ''
  }

  async function deleteUsuarios(id){
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
  }

  async function atualizaUsuarios(id){

  }

  useEffect(()=>{
    getUsuarios()
  },[])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' name='nome' type='text' ref={inputNome}/>
        <input placeholder='Digite sua idade' name='idade' type='number' ref={inputIdade}/>
        <input placeholder='Digite seu email' name='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsuarios}>Cadastrar</button>
      </form>
      {usuarios.map(usuarios => (
      <div key={usuarios.id} className='card'>
        <div>
          <p>Nome: <span>{usuarios.nome}</span></p>
          <p>Idade: <span>{usuarios.idade}</span></p>
          <p>Email: <span>{usuarios.email}</span></p>
        </div>
        <button onClick={()=> deleteUsuarios(usuarios.id)}>
          <Trash2 size={30}/>
        </button>
        <button onClick={()=> atualizaUsuarios(usuarios.id)}>
          <Pencil size={30}/>
        </button>
      </div>
      ))}
    </div>


  )
}

export default Home