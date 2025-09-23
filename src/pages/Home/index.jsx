import { Trash2 } from 'lucide-react'
import './style.css'

function Home() {
  return(
    <div className='container'>
      <form>
        <h1>Olá Etec MCM</h1>
        <input name='nome' type='text'/>
        <input name='idade' type='number'/>
        <input name='email' type='email'/>
        <button type='button'>Cadastrar</button>
      </form>
      <div>
        <p>Nome: </p>
        <p>Idade: </p>
        <p>Email: </p>
      </div>
      <button>
        <Trash2/>
      </button>
    </div>
    

  )
}

export default Home