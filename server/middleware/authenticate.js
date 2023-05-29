import jwt from 'jsonwebtoken';
import User from '../mongodb/models/user.js';


const authenticate = async(req,res,next) => {

try{

    const token = req.cookies.jwtoken;
    if(!token)
    {
        throw new Error('No Token Found');
    }
    const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

    

    const rootUser = await User.findOne({'token':token});

    if(!rootUser) {throw new Error('User Not Found')};

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();


}
catch(error)
{
    res.status(401).send('Unauthorized:No Token Provided');
    
}

}


export default authenticate;