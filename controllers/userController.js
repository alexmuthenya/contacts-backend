import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export async function register(req, res) {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists! Use a new email");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ _id: newUser.id, email: newUser.email });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User with the provided email not found.");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Wrong password!");
  }
  const accessToken = jwt.sign(
    {
      userName: user.userName,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "45m" }
  );
  res.status(200).json({ accessToken });
}

export async function current(req, res) {
  res.status(200).json(req.user);
}
