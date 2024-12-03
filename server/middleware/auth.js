import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    // Espera "Bearer <token>"";
    const authHeader = req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(403).send("Acceso denegado");
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
