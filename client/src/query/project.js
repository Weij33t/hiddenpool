import { gql } from '@apollo/client'

export const GET_COMPANY_PROJECTS = gql`
  query getCompanyProjects($id: ID) {
    getCompanyProjects(id: $id) {
      likes
      desc
      name
      id
    }
  }
`

export const GET_ALL_PROJECTS = gql`
  query {
    getAllProjects {
      name
      desc
      id
      likes
      companyId
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation createProject($input: ProjectInput) {
    createProject(input: $input) {
      likes
      desc
      name
    }
  }
`
