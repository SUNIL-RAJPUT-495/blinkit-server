import jwt from 'jsonwebtoken'

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ 
                message: "Provide Token",
                error: true,
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decode) {
            return res.status(401).json({
                message: "unauthorized access",
                error: true,
                success: false
            })
        }

        req.userId = decode.id || decode._id; 
        
        console.log('User ID found:', req.userId);
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "You are not logged in or token expired",
            error: true,
            success: false
        })
    }
}

export default auth;