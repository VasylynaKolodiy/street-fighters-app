import { fightRepository } from "../repositories/fightRepository.js";

class FightService {

  saveFight(data){
    const fight = fightRepository.create(data);
    return fight
  }
  getFights(){
    const fights = fightRepository.getAll();
    return fights
  }

}

const fightService = new FightService();

export { fightService };
