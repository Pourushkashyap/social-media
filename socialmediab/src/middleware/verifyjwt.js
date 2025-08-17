import jwt from "jsonwebtoken"

function verifyjwt(req, res, next) {
  const token = req.cookies?.accesstoken;

  console.log("ha bhai tu andar aa gya")
  
  if (!token){
    console.log("bhai token aaya hi nhi")
  return res.status(401).json({ message: 'bhai token nhi aaya' });
  } 
  console.log(token)

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("user set bhi ho gya")
    console.log(req.user);
    next();
  } catch (err) {
    console.log("jwt verification error: ",err.message)
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export {verifyjwt}
