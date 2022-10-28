import { Request, Response, NextFunction } from 'express';

const matchValidation = {
  async verifyTeamExist(req: Request, res:Response, next:NextFunction) {
    const { id } = req.params;
    const num = parseInt(id, 10);
    if (num > 16) {
      res.status(404).json({ message: 'There is no team with such id!' });
    } else {
      next();
    }
  },
};

export default matchValidation;
