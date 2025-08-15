import jwt from "jsonwebtoken"

function verifyjwt(req, res, next) {
  const token = req.cookies.accesstoken;
  console.log("ha bhai tu andar aa gya")
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("user set bhi ho gya")
    next();
  } catch (err) {
    console.log("jwt verification error: ",err.message)
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export {verifyjwt}
