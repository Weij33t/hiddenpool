import { gql } from '@apollo/client'

export const GET_COMPANY = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      name
      desc
      INN
      likes
      role
    }
  }
`

export const GET_COMPANIES = gql`
  query getAllCompanies($role: String) {
    getAllCompanies(role: $role) {
      id
      name
      desc
      INN
      likes
      role
      projects {
        name
        desc
        likes
      }
    }
  }
`
