const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');


const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
// 
// The resolvers object is the actual implementation of the GraphQL schema.
//  Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

// 
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
      ...req,
      db: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://eu1.prisma.sh/wilkinsweiqiangliang-518a49/graphql-db/dev',
          secret: 'mysecret123',
          debug: true,
      })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`));