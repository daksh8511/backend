import express from "express";
import cors from 'cors'
import ConnecetDB from "./ConnectDB.js";
import UserModel from "./NewUser.js";
const app = express();
app.use(express.json());
app.use(cors())

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

    return res.status(200).json({ message: "Signup success" });
  } catch (error) {
    console.error("Error : ", error);
  }
});

app.listen(PORT, () => {
  console.log("server start : ", PORT);
});
