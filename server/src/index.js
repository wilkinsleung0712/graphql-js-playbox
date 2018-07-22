const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

// 
// The resolvers object is the actual implementation of the GraphQL schema.
//  Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        }
    },
    Mutation: {
        post: (root,args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                },
            }, info)
        },
        updateLink: (root,args, context, info) => {
            return context.db.mutation.updateLink({
                    data: {
                        url: args.url,
                        description: args.description
                    },
                    where: {
                        id: args.id
                    }
            }, info)
        },
        deleteLink: (root, args) => {
            let index = links.findIndex(link => link.id === args.id);
            if (index !== -1) {
                let deletedLink = links[index];
                links.splice(index,1);
                return deletedLink;
            }
            console.warn(`Unable to find link on ID:${args.id}`);
            return null;
        }
    },
}

// 
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
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