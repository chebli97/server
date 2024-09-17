import Users from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import sendMail from "../services/sendMail.js";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "21d",
  });
};

const cryptToken = async () => {
  const d = new Date()
  return crypto.randomBytes(48).toString('hex')+"$-$$"+d.setHours(d.getHours() + 1);
}

async function validateToken(token) {
  let test = true;
  if(token.indexOf("$-$$") < 0) test = false
  const dateToExpireLink = await (token.substring(token.indexOf("$-$$"))).replace('$-$$', '');
  const dNow = new Date()
  if(dNow > dateToExpireLink) test = false
  return test;
}

export const registerUser = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  if (!name || !email || !password || !confPassword)
    return res.status(400).json({ error: "All fields are required" });
  if (password !== confPassword)
    return res.status(400).json({ error: "Passwords don't match" });
  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Email is not valid" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "Password should be at least 8 characters" });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      
      try {
        const user = await Users.findOne({ where: { email } });
        if(user){
          if(user.get('isValid') == 0 && user.get('accountActivationToken') !== null){
            const accountActivationToken = await cryptToken();
            await user.update({accountActivationToken});
            await sendMail.sendmail(
              user.get('email'), 
                'signup',
                {token: user.get('accountActivationToken'), link: `${process.env.DOMAIN_FRONT}`}
            );
  
            return res.status(200).json({ type:"warning", message: "Not active account founded new mail sended"});
        } else {
            return res.status(200).json({ type:"danger", message: "exist_user"});
        }
        }
        if (!user){
        const accountActivationToken = await cryptToken();
          const user = await Users.create({
            name,
            email,
            password: hashPassword,
            accountActivationToken
          })
              await sendMail.sendmail(
                    user.get('email'), 
                    'signup',
                    {token: user.get('accountActivationToken'), link: `${process.env.DOMAIN_FRONT}`,name :user.get('name'),role :user.get('role') }
                );
            return res.status(200).json({
              message: "Registration successful!",
              user: { id: user.id, name, email , isValid : user.isValid },
            });
      
       } 
  } catch (err) {
      return res.status(400).json({ error: "Error saving account" });
  }
};

export const validAccount = async (req, res) => {
  try {
    const tokenToValid = req.params.tovalid;
    const user = await Users.findOne({ where: { 'accountActivationToken': tokenToValid } });
    if (!user) {
      return res.status(500).json({ type: "danger", message: "No user founded" });
    }
    await user.update({ accountActivationToken: null, isValid: '1' });
    return res.status(201).json({ type: "success", message: "Account confirmed" });
  } catch (error) {
    return res.status(500).json({ type: "danger", message: "Error occurred" });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });
  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Email is not valid" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "Password should be at least 8 characters" });

  try {
    const user = await Users.findAll({
      where: { email },
    });

    

    if (user[0]) {
      const { id, name, avatar, gymName } = user[0];
      const match = await bcrypt.compare(password, user[0].password);
      if (!match) return res.status(400).json({ error: "Incorrect password" });

      const token = createToken(id);
      return res
        .status(200)
        .json({ user: { id, name, email, avatar, gymName }, token });
    } else {
      return res.status(400).json({ error: "Email not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProfile = async (req,res) => {

}

export const updatePassword = async (req,res) => {

}

const confirmByMail = async (req,res) => {

}
