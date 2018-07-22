const {GraphQLServer} = require('graphql-yoga');

// 
// The typeDefs constant defines your GraphQL schema (more about this in a bit).
// Here, it defines a simple Query type with one field called info
const typeDefs = `
type Query {
    info: String!   
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

// 
// The resolvers object is the actual implementation of the GraphQL schema.
//  Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    }
}

// 
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`));