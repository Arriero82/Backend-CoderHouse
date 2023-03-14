import { Router } from "express";
import UserManager from "../dao/user.manager.js";

const User = new UserManager();

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(email);
    if (!user)
      return res
        .status(400)
        .json({ error: `username and password don't match` });
    if (user.password !== password)
      return res
        .status(400)
        .json({ error: `username and password don't match` });

    req.session.user = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };
    user.email !== 'adminCoder@coder.com' ? req.session.user.role = 'usuario' : req.session.user.role = 'admin';

    return res.redirect("/api/profile");    
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(400).json({ error });
      res.redirect("/api/login");
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
});

export default router;
