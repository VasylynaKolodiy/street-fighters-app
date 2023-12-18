import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const {email, password, phoneNumber} = req.body;
  const isSomeFieldEmpty = Object.keys(USER).some(item => item !== 'id' && !req.body[item]);
  if(isSomeFieldEmpty){
    throw Error("Please fill all fields");
  }
  if(String(password).length < 3){
    throw Error("Password should contain at least 3 characters");
  }
  if(!email.match(/^[\w.+\-]+@gmail\.com$/i)){
    throw Error("Only gmail is allowed, please provide correct format example@gmail.com");
  }
  if(/^\+380/.test(phoneNumber)){
    throw Error("Wrong phone format (+380...)");
  }
  next();
};

const updateUserValid = (req, res, next) => {

  for(let key in req.body){
    if(!USER.hasOwnProperty(key)){
      throw Error(`There is wrong property ${key}`);
    }
  }

  const fields = Object.keys(req.body);

  if(!fields.length){
    throw Error("There is no changes");
  }

  const isSomeFieldEmpty = fields.some(item => !item);
  if(isSomeFieldEmpty){
    throw Error("Please fill all fields");
  }

  next();
};

export { createUserValid, updateUserValid };
