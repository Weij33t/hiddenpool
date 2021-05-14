import { gql } from '@apollo/client'

export const GET_ONE_USER = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      name
      desc
      INN
      likedCompanies
      likes
      role
    }
  }
`

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      name
      desc
      INN
      likes
    }
  }
`
