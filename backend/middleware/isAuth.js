import jwt from 'jsonwebtoken';

const isAuth = (req,res,next) => {
  try {
    const {token} = req.cookies;
    console.log("Token in middleware:", token);
    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "User does not have a token" });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECREAT);
    req.userId = verifiedToken.userId; // token ke andar jo encode kiya tha wahi field use karo

    next();
  } catch (error) {
    console.log("isAuth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
