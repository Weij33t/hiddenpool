const mongoose = require('mongoose')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const authRouter = require('./Routes/authRouter')
const PORT = process.env.PORT || 5000

const app = express()
const schema = require('./schema')
const { isRequiredArgument } = require('graphql')
const User = require('./models/User')
let users

const createUser = (input) => {
  const id = Date.now()
  return { id, ...input }
}

const root = {
  getAllUsers: () => {
    return users
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id)
  },
  // connect with DB
  createUser: ({ input }) => {
    const user = createUser(input)
    users.push(user)
    return user
  },
}

app.use(cors())
app.use(express.json())
app.use('/', authRouter)
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
)

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bichenov:123qwerty@hackmpit.ashhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    await User.find({}, (err, res) => {
      if (err) {
        console.log(e)
      }
      users = res
    })
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
