import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['token'] || req.headers['authorization'];

  if (!token) {
    return res.json({ success: false, message: "No token provided, please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // Inject userId into request
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid token, please login again" });
  }
};

export default authMiddleware;
