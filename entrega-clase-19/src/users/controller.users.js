import { Router } from "express";
import User from '../dao/models/users.models.js'

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const newUserInfo = {
      name,
      lastname,
      email,
      password,
    };

    const newUser = await User.create(newUserInfo);
    res.status(201).json({ msg: newUser });
  } catch (error) {
    console.log(error);
    if(error.code === 11000) return res.status(400).json({error: `email is in use`})
    res.status(500).json({ error: 'internal error'});
  }
});

export default router;
