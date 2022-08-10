import { Request, Response, NextFunction } from "express";
export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;
  const errors = [];
  if (!name) {
    errors.push("Please enter your name");
  } else if (name.length > 20) {
    errors.push("Name max 20 chars are allow");
  }
  if (!account) {
    errors.push("Please enter your email or phone");
  } else if (!validatePhone(account) && !validateEmail(account)) {
    errors.push("Email or phone number is not valid");
  }
  if (password.length < 6) {
    errors.push("Password must be at least 6 chars");
  }
  if (errors.length > 0) return res.status(400).json({ message: errors });
  next();
};
export function validatePhone(phone: string) {
  const regexPhone = /^[+]/g;
  return regexPhone.test(phone);
}
export function validateEmail(email: string) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
}
