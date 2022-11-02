import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import matchService from '../services/matchService';
// import loginService from '../services/loginService';

const matchValidation = {
  // verifyTeamExist(req: Request, res:Response, next:NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const num = parseInt(id, 10);
  //     if (num > 16) {
  //       res.status(404).json({ message: 'There is no team with such id!' });
  //     } else {
  //       next();
  //     }
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       res.status(500).json(e);
  //     }
  //   }
  // },

  async authToken(req: Request, res:Response, next:NextFunction) {
    const token = req.header('Authorization');
    if (!token || token === '') {
      return res.status(401).json({ message: 'token not found' });
    }
    try {
      const payload = await matchService.decode(token) as JwtPayload;
      if (!payload.email) {
        res.status(401).json({ message: 'Token must be a valid token' });
      } else {
        next();
      }
    } catch (e) {
      if (e instanceof Error) {
        res.status(401).json({ message: 'Token must be a valid token' });
      }
    }
  },

};

export default matchValidation;
