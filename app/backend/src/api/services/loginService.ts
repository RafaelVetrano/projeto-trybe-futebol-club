import { authToken } from '../../JWT/tokenGenerate';
import Usermodel from '../../database/models/User';

const loginService = {

  async getUser(email: string) {
    const user = await Usermodel.findOne({
      where: { email },
    });
    return user;
  },

  async decode(token: string) {
    const user = authToken(token);
    return user;
  },

};

export default loginService;
