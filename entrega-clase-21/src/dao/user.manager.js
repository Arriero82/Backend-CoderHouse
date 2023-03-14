import User from "../dao/models/users.models.js";

class UserManager {
  async get() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(email){
    try {
      const user = await User.findOne({email});
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async create(userInfo) {
    try {
      const newUser = await User.create(userInfo);
      return newUser;
    } catch (error) {
      console.log();
    }
  }
}

export default UserManager;
