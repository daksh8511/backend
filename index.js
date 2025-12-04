import express from "express";
import cors from "cors";
import ConnecetDB from "./ConnectDB.js";
import UserModel from "./NewUser.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
const PORT = process.env.PORT || 3000;
ConnecetDB();

app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !password || !email) {
      return res.status(401).json({ message: "enter fields" });
    }

    const FindUser = await UserModel.findOne({ email: email });

    if (FindUser) {
      return res.status(400).json({ message: "User already registerd" });
    }

    const UserRegistration = new UserModel({ email, password, name });

    await UserRegistration.save();

    return res
      .status(200)
      .json({ message: "Signup success", user: UserRegistration });
  } catch (error) {
    console.error("Error : ", error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter email and password" });
  }

  try {
    const User = await UserModel.findOne({ email: email });

    if (User.password !== password) {
      return res.status(400).json({ message: "passsword are not match" });
    }

    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    return res.status(500).json({ message: "Server side error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const GetUserList = await UserModel.find();
    return res
      .status(200)
      .json({ message: "All users are retrived", users: GetUserList })
      .send(GetUserList);
  } catch (error) {
    return res.status(500).json({ message: "Server side wrong" });
  }
});

app.post("/delete_user", async (req, res) => {
  const { _id } = req.body;

  try {
    const findUser = await UserModel.findByIdAndDelete({ _id });

    return res
      .status(200)
      .json({ message: "User delete successfully" })
      .send({ user: findUser });
  } catch (error) {
    return res.status(500).json({ message: "Server side error" });
  }
});

app.post("/update_user", async (req, res) => {
  const { name, email, _id } = req.body;

  const updated = {
    name,
    email,
  };
  try {
    const User = await UserModel.updateOne(
      { _id: _id },
      { $set: { email: updated?.email, name: updated?.name } }
    );

    return res
      .status(200)
      .json({ message: "User update successfully", user: User });
  } catch (error) {
    return res.status(500).json({ message: "Server side wrong!", user : User });
  }
});

app.listen(PORT, () => {
  console.log("server start : ", PORT);
});
