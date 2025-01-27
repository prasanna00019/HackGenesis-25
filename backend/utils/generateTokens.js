import jwt from "jsonwebtoken";
/**
 * Generates a jwt token and sets it as a cookie in the response
 * @param {string} userId - The id of the user to generate a token for
 * @param {Object} res - The response object to set the cookie on
 */
const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //milli seconds
        httpOnly: true,//prevent XSS attacks,    
        sameSite: "strict" //prevent csrf attacks    
        , secure: process.env.NODE_ENV !== 'development'
    })
}
export default generateTokenAndSetCookie;
