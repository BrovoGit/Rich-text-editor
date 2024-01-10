// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedData = jwt.verify(token, 'Qjhl05h88RFOPOiodnXNKzlMp9Tq3O6JUBmnP6iKSvBWpfTecKM6uk1cp3Znkbrv'); // Replace 'your-secret-key' with your actual secret key
    req.user = decodedData;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
