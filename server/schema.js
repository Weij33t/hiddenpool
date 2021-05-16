const { buildSchema } = require('graphql')

const schema = buildSchema(
  `
   type User {
     id: ID
     role: String
     name: String
     desc: String
     INN: Int
     likes: Int
     likedCompanies: [ID]
     projects: [Project]
   }
   
   type Project {
     companyId: String
     name: String
     desc: String
     likes: Int
     id: ID 
   }

   input ProjectInput {
     companyId: String!
     name: String!
     desc: String!
     likes: Int
  }
  
  input UserInput {
    id: ID
    name: String!
    desc: String 
    INN: Int!
    likes: Int
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID): User 
    getAllCompanies(role: String): [User]
    getAllProjects: [Project]
    getCompanyProjects(id: ID): [Project]
  }

  type Mutation {
    createUser(input: UserInput): User
    createProject(input: ProjectInput): Project
  }
  `
)

module.exports = schema
