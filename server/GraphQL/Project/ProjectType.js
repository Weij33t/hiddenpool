const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql')
const ProjectType = new GraphQLObjectType({
  name: 'ProjectType',
  description: 'ProjectType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    companyId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    desc: { type: new GraphQLNonNull(GraphQLString) },
  }),
})
module.exports = ProjectType
