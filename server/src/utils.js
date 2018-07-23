const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';
/**
 * The getUserId function is a helper function that you’ll call in resolvers that
 * require authentication (such as post). It first retrieves the Authorization header
 * (which contains the User’s JWT) from the incoming HTTP request. 
 * It then verifies the JWT and retrieves the user’s ID from it. 
 * Notice that if that process is not successful for any reason, 
 * the function will throw an exception. You can therefore use it to “protect” the resolvers 
 * which require authentication.
 *
 * @param {*} context
 * @returns
 */
function getUserId(context) {
    const Authorization = context.request.get('Authorization');

    if(Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const result = jwt.verify(token, APP_SECRET); 
        const {userId} = result.data;
        return userId;
    }

    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId,
  }