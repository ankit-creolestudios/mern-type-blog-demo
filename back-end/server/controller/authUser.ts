import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { validateEmail, validatePhone } from "../middleware/validateRegister";
import { sendSms } from "../config/sendSms";
import { IToken, IUser } from "../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`;
const authUser = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user)
        return res
          .status(400)
          .json({ message: "Email or phone number already" });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = { name, account, password: passwordHash };
      const active_token = generateActiveToken(newUser);

      const url = `${CLIENT_URL}/active/${active_token}`;
      // if (validateEmail(account)) {
      //   console.log(account, "account");
      //   sendEmail(account, url, "verify email address").then(() => {
      //     return res.status(200).json({ message: "Please check your email" });
      //   });
      // }
      // if (validatePhone(account)) {
      //   sendSms(account, url, "verify your phone number");
      //   return res.json({ message: "Success SMS" });
      // }
      res.json({ message: "register success", data: newUser, active_token });
    } catch (err) {
      console.log(err);
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    console.log(req.body.active_token, "token");
    console.log(process.env.ACTIVE_TOKEN_SECRET, "secret");
    try {
      const { active_token } = req.body;
      const decoded = <IToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      if (!decoded)
        return res.status(400).json({ message: "invalid authentication" });
      // const { newUser } = decoded;
      const user = new Users(decoded);
      await user.save();
      res.json({ message: "account activated" });
    } catch (err) {
      console.log(err);
      //let errMsg; 4 need to rework

      return res.status(500).json({ mesg: err });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      const user = await Users.findOne({ account });
      if (!user)
        return res.status(400).json({ message: "account does not exist" });
      loginUser(user, password, res);
      // res.status(200).json({ message: "login success" });
    } catch (err) {}
  },
};
const loginUser = async (user: IUser, password: string, res: Response) => {
  console.log(user);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Password is wrong" });
  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.json({
    message: "login success",
    access_token,
    user: {
      ...user._doc,
      password: "",
    },
  });
};
export default authUser;
