
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: { email: string; role:string, name: string},
    secret: Secret,
) =>{
     const payload = {
    email: jwtPayload.email,
    role: jwtPayload.role,
    name: jwtPayload.name,
  };
    return jwt.sign(payload, secret, { expiresIn:'1d'})
};

export const verifyToken = (token: string, secret:Secret) =>{
    return jwt.verify(token, secret) as JwtPayload;
};