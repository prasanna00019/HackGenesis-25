import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
/**
 * Protects routes by verifying the JWT token sent in the request headers
 * and making sure the user is present in the database. If the user is not
 * found, it returns a 404 response with the error message "USER NOT FOUND"
 * If any other error occurs, it returns a 500 response with the error message
 * "INTERNAL SERVER ERROR"
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "UNAUTHORISED NO TOKEN PROVIDED " })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "UNAUTHORISED INVALID TOKEN " })
        }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: "USER NOT FOUND " });
        }
        req.user = user;;
        next();
    } catch (error) {
        console.log("error in protected routes")
        res.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }
}
export default protectRoute