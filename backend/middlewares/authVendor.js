import jwt from "jsonwebtoken";

const authVendor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        const check = jwt.verify(dtoken, process.env.JWT_KEY);

        req.body.vendorId = check.id;

        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid Token, Please Login Again" });
    }
};

export default authVendor;
