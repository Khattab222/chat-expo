
import jwt from 'jsonwebtoken';
import type { UserProps } from '../types.js';

interface TokenOptions {
    user: UserProps;
}

interface VerifyOptions {
    token: string;
    signature?: string;
}

export const generateToken = ({ 
    user,   
}: TokenOptions): string => {
  
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar:user.avatar
    }

    const token = jwt.sign(payload, process.env.TOKEN_SIGNATURE as string,{expiresIn:"30d"});
    return token;
};






export const verifyToken = ({ 
    token, 
    signature = process.env.TOKEN_SIGNATURE 
}: VerifyOptions): UserProps => {
    if (!signature) {
        throw new Error('Token signature is required');
    }

    try {
        const decoded = jwt.verify(token, signature) as UserProps;
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token has expired');
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token');
        }
        throw error;
    }
};