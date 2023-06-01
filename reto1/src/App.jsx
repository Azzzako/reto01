import style from './styles.module.css'
import { useState } from 'react'
import { AiFillShop } from 'react-icons/ai'
import axios from 'axios'

function App() {

  const [user, setUser] = useState('')
  const [newUser, setNewUser] = useState(false)

  const handlerFormUser = (e) => {
    e.preventDefault()
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })


  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(user.email)) {
      alert('Invalid email format');
      return;
    }

    axios.post('http://localhost:3001/add', user)
    setNewUser(!newUser)
    console.log('usuario creado');

    setUser({
      firstName: '',
      lastName: '',
      email: ''
    })
  }


  return (
    <>
      <div className={style.container}>

        <div className={style.image}>
        </div>
        <form onSubmit={handleSubmit} className={style.containerForm}>
          <AiFillShop
            style={{ fontSize: 70 }}
          />
          <h1>Sign up to receive updates!</h1>

          <div className={style.inputCont}>
            <label htmlFor='firstName'>First Name:</label>
            <input type="text" name="firstName" value={user.firstName} required onChange={handlerFormUser} />


            <label htmlFor='lastName'>Last Name:</label>
            <input type="text" name="lastName" value={user.lastName} required onChange={handlerFormUser} />


            <label htmlFor='email'>Email:</label>
            <input type="email" name="email" value={user.email} required onChange={handlerFormUser} />



          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
