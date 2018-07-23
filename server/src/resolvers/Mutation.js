const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {APP_SECRET, getUserId} = require('../utils');

function post(root,args, context, info) {
    const userId = getUserId(context);
    return context.db.mutation.createLink({
        data: {
            url: args.url,
            description: args.description,
            postedBy: {
                connect: {
                    id: userId
                }
            }
        },
    }, info);
}

function updateLink(root,args, context, info) {
    return context.db.mutation.updateLink({
        data: {
            url: args.url,
            description: args.description
        },
        where: {
            id: args.id
        }
    }, info);
}

function deleteLink(root, args) {
    let index = links.findIndex(link => link.id === args.id);
    if (index !== -1) {
        let deletedLink = links[index];
        links.splice(index,1);
        return deletedLink;
    }
    console.warn(`Unable to find link on ID:${args.id}`);
    return null;
}

// asyn method
async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser({
        data : {
            ...args,
            password
        }
    });

    const token = jwt.sign({
        data: {
            userId: user.id
        }
    }, APP_SECRET);
    
    return {
        token,
        user
    };
}

async function login(parent, args, context, info) {
    const selection = `{id password}`
    const user = await context.db.query.user({
        where: {
            email: context.email
        }
    }, selection);

    // we compare our password
    const valid = await bcrypt.compare(args.password, user.password);

    if(valid) {
        const token = jwt.sign({
            data: {
                userId: user.id
            }
        },APP_SECRET);

        return {
            token,
            user
        }
    }

    throw new Error('Invalid password')
}

module.exports = {
    post,
    updateLink,
    deleteLink,
    signup,
    login
}