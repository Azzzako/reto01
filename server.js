const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')

app.set('port', process.env.PORT || 3001)

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// MongoDB connection
const URI = 'mongodb://localhost/users'
mongoose.connect(URI)
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err))


//Modelos
const { Schema } = mongoose

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)



//Rutas
const router = express.Router()
const routerGet = express.Router()

router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body
  const newUser = new User({
    firstName,
    lastName,
    email
  })
  try {
    const saveNewUser = await newUser.save()
    res.status(200).json(saveNewUser)
    console.log('nuevo usuario creado')
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el usuario' })
  }
});

routerGet.get('/', async (req, res) => {
  try {
    const users = await User.find().exec()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error: 'error'})
  }
})

app.use('/add', router)
app.use('/users', routerGet)



// Server ON
app.listen(app.get('port'), () => {
  console.log(`server listen on port ${app.get('port')}`);
})
