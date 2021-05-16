const Project = require('../../Models/Project')
const { GraphQLNonNull, GraphQLString } = require('graphql')

const createProject = {
  type: Project,
  args: {
    companyId: {
      name: 'companyId',
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString),
    },
    desc: {
      name: 'desc',
      type: new GraphQLNonNull(GraphQLString),
    },
    likes: {
      name: 'likes',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async function (root, param) {
    console.log('resolve')
    const projectModel = new Project(param)
    const saveProject = await projectModel.save()
    if (!saveProject) {
      throw new Error('Error')
    }
    return saveProject
  },
}

const deleteProject = {
  type: Project,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async function (root, param) {
    const deleteProject = await Post.findByIdAndRemove(param._id)
    if (deleteProject) {
      throw new Error('Error')
    }
    return deleteProject
  },
}

module.exports = { createProject, deleteProject }
