const mongoose = require('mongoose')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const authRouter = require('./Routes/authRouter')
const likeRouter = require('./Routes/likeRouter')
const projectRouter = require('./Routes/projectRouter')
const offerRouter = require('./Routes/offerRouter')
const profileRouter = require('./Routes/profileRouter')
const PORT = process.env.PORT || 5000

const app = express()
const schema = require('./schema')
const mutation = require('./GraphQL/Project/ProjectMutations.js')
const ProjectSchema = require('./GraphQL/Project/ProjectType')
const { isRequiredArgument } = require('graphql')
const User = require('./Models/User')
const Project = require('./Models/Project')
let users
let projects

const createUser = (input) => {
  const id = Date.now()
  return { id, ...input }
}

const root = {
  getAllCompanies: async ({ role }) => {
    users = await User.find({}, (err, users) => {
      if (err) {
        console.log(err.respone.data)
      }
      users = users
    })
    const companies = await users.filter((user) => user.role === 'Компания')
    return companies
  },
  getAllProjects: async () => {
    const allProjects = await Project.find({}, (err, res) => {
      if (err) {
        console.log(err.respone.data)
      }
    })
    return allProjects
  },
  getCompanyProjects: async ({ id }) => {
    const allProjects = await Project.find({}, (err, res) => {
      if (err) {
        console.log(err.respone.data)
      }
    })
    const filteredProjects = allProjects.filter(
      (project) => project.companyId === id
    )
    return filteredProjects
  },
  getUser: async ({ id }) => {
    users = await User.find({}, (err, users) => {
      if (err) {
        console.log(err.respone.data)
      }
      users = users
    })
    return users.find((user) => user.id === id)
  },
  // connect with DB
  createProject: async ({ input }) => {
    const candidate = await Project.findOne({ name: input.name })
    if (candidate) {
      console.log('exists')
      return false
    }
    const project = new Project(input)
    await project.save()
    return project
  },
}

app.use(cors())
app.use(express.json())
app.use('/', authRouter)
app.use('/', likeRouter)
app.use('/', offerRouter)
app.use('/', projectRouter)
app.use('/profile', profileRouter)
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
)

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bichenov:123qwerty@hackmpit.ashhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    users = await User.find({}, (err, res) => {
      if (err) {
        console.log(err.respone.data)
      }
      users = res
    })

    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
