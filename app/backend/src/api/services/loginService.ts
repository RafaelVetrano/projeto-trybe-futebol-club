import { verify } from 'jsonwebtoken';
import Usermodel from '../../database/models/User';

const loginService = {

  async getUser(email: string) {
    const user = await Usermodel.findOne({
      where: { email },
    });
    return user;
  },

  async decode(token: string) { return verify(token, 'jwt_secret'); },

};

export default loginService;
