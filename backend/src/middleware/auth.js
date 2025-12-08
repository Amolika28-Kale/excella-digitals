const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function(req, res, next){
  const auth = req.headers.authorization || req.cookies.token;
  if(!auth) return res.status(401).json({error:'no token'});
  let token = auth;
  if(auth.startsWith('Bearer ')) token = auth.split(' ')[1];
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await User.findById(data.id).select('-passwordHash');
    if(!user) return res.status(401).json({error:'invalid'});
    req.user = user;
    next();
  }catch(err){ console.error(err); res.status(401).json({error:'invalid token'}); }
};
