import { userRepository } from "../repositories/userRepository.js";

class UserService {

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser(userData) {
    const {email, phoneNumber} = userData;
    const isExistEmail = userService.search({email});
    if (isExistEmail) {
      throw Error(`User with this email ${email} is already exist`);
    }
    const isExistPhone = userService.search({phoneNumber});
    if (isExistPhone) {
      throw Error(`User with this phone number ${phoneNumber} is already exist`);
    }
    const user = userRepository.create(userData);
    return user
  }

  getUsers() {
    const users = userRepository.getAll();
    return users
  }

  getUser(id) {
    const user = this.search(id);
    return user
  }

  editUser(id, userData) {
    const user = userRepository.update(id, userData);
    return user
  }

  removeUser({id}) {
    const user = userRepository.delete(id);
    return user
  }
}

const userService = new UserService();

export { userService };
