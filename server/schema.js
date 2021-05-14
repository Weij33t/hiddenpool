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
  }

  type Mutation {
    createUser(input: UserInput): User
  }
  `
)

module.exports = schema
