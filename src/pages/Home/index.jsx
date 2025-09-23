import { Pencil, Trash2 } from 'lucide-react'
import './style.css'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const [editId, setEditId] = useState(null) 

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()

  async function getUsuarios() {
    const usuariosdaApi = await api.get('/cadastro')
    setUsuarios(usuariosdaApi.data)
  }

  async function salvarUsuario() {
    if (editId) {

      await api.put(`/cadastro/${editId}`, {
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
        email: inputEmail.current.value
      })
      setEditId(null) 
    } else {

      await api.post('/cadastro', {
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
        email: inputEmail.current.value
      })
    }


    inputNome.current.value = ''
    inputIdade.current.value = ''
    inputEmail.current.value = ''
    getUsuarios()
  }

  async function deleteUsuarios(id) {
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
  }

  function editarUsuario(usuario) {

    inputNome.current.value = usuario.nome
    inputIdade.current.value = usuario.idade
    inputEmail.current.value = usuario.email
    setEditId(usuario.id)
  }

  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' type='text' ref={inputNome}/>
        <input placeholder='Digite sua idade' type='number' ref={inputIdade}/>
        <input placeholder='Digite seu email' type='email' ref={inputEmail}/>
        <button type='button' onClick={salvarUsuario}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: <span>{usuario.nome}</span></p>
            <p>Idade: <span>{usuario.idade}</span></p>
            <p>Email: <span>{usuario.email}</span></p>
          </div>
          <button onClick={() => deleteUsuarios(usuario.id)}>
            <Trash2 size={30}/>
          </button>
          <button onClick={() => editarUsuario(usuario)}>
            <Pencil size={30}/>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
