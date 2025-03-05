import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) => {
  try {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"User not authenticated."})
    };

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decode){
        return res.status(401).json({ message:"Invalid token" });
    };

    req.id = decode.userId;
    // call the next function, which is getOtherUsers
    next();

  } catch (error) {
    console.error(error);
  }
};
export default isAuthenticated;

// const req = {
//     id:"",
// }

// req.id = "sdlbgnjdfn"