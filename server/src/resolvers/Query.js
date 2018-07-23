function feed(parent, args, context, info) {
    return context.db.query.links({}, info)
}

function info() {
    return `This is the API of a Hackernews Clone`;
}
  
module.exports = {
    feed,
    info
}