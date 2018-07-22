const {GraphQLServer} = require('graphql-yoga');

// 
// The resolvers object is the actual implementation of the GraphQL schema.
//  Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root,args) => {
            return links.find(link => link.id === args.id);
        }
    },
    Mutation: {
        post: (root,args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        updateLink: (root,args) => {
            // lets filter the one we interested
            let index = links.findIndex(link => link.id === args.id);
            if (index !== -1) {
                let newLink = {
                    'id': args.id,
                    'description': args.description,
                    'url': args.url
                }
                // update by index
                links[index] = newLink;
                // return newly added link
                return newLink;
            }
            console.warn(`Unable to find link on ID:${args.id}`);
            return null;
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
})

server.start(() => console.log(`Server is running on http://localhost:4000`));