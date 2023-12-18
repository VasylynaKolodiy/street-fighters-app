import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getFighters() {
    const fighters = fighterRepository.getAll();
    return fighters;
  }
  createFighter(userData) {
    const {name} = userData;
    const isExist = fighterRepository.getOne({name});
    if (isExist) {
      throw Error("Fighter is already exist");
    }
    if(!userData.health) userData.health = 100;
    const fighter = fighterRepository.create(userData);
    return fighter
  }
  getFighter(id) {
    const fighter = fighterRepository.getOne(id);
    return fighter
  }
  removeFighter({id}) {
    const fighter = fighterRepository.delete(id);
    return fighter
  }
  editFighter(id, userData) {
    const fighter = fighterRepository.update(id, userData);
    return fighter
  }

}

const fighterService = new FighterService();

export { fighterService };
