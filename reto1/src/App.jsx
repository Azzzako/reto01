import style from './styles.module.css'
import { useState } from 'react'
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
        <h2 className={style.title}>User Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.containerForm}>

            <label>First Name:</label>
            <input type="text" name="firstName" value={user.firstName} required onChange={handlerFormUser} />


            <label>Last Name:</label>
            <input type="text" name="lastName" value={user.lastName} required onChange={handlerFormUser} />


            <label>Email:</label>
            <input type="email" name="email" value={user.email} required onChange={handlerFormUser} />

          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
