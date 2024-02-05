const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const { getUserById } = require('../db/sqlHelperFunctions/users')

const authRequired = (req, res, next) => {
  let token = null
  if (req.get('Authorization')) {
    console.log(`${JSON.stringify(req.cookies)} cookie token`)
    token = req.get('Authorization').split(' ')[1];
    console.log(token);
  } else {
    token = req.cookies.token
  }
  if (!token){
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    })
  }
  
  try {
   jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    })
    throw new Error('Token invalid');
  }
  next()
}

function getUserFromRequest(req) {
  if (req.get('Authorization') == null) return
  const token = req.get('Authorization').split(' ')[1];
  if (token == null) return
  console.log(token)
  decoded = jwt.verify(token, JWT_SECRET)
  console.log(decoded)
  const user = getUserById(decoded.id);
  return user;
}

module.exports = { authRequired, getUserFromRequest}