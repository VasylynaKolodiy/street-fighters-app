import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const {health, defense, power} = req.body;
  const isSomeFieldEmpty = Object.keys(FIGHTER).some(item => item !== 'id' && item !== 'health' && !req.body[item]);
  if(isSomeFieldEmpty){
    throw Error("Please fill all required fields");
  }
  if(defense < 1 || defense > 10){
    throw Error("Defense should be from 1 to 10");
  }
  if(health && (health < 80 || health > 120)){
    throw Error("Health should be from 80 to 120");
  }
  if(power < 1 || health > 100){
    throw Error("Power should be from 1 to 100");
  }
  next();
};

const updateFighterValid = (req, res, next) => {

  for(let key in req.body){
    if(!FIGHTER.hasOwnProperty(key)){
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

export { createFighterValid, updateFighterValid };
