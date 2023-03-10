import { sign } from 'jsonwebtoken';

const getToken = (email: string, password: string): string => {
  const token = sign({ email, password }, 'jwt_secret', {
    expiresIn: '999d',
    algorithm: 'HS256',
  });
  return token;
};

// const authToken = (token: string): JwtPayload | string => {
//   const isTokenValid = verify(token, 'jwt_secret');
//   return isTokenValid;
// };

export default getToken;
// export {
//   authToken,
// };
