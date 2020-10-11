import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface Payload {
    email: string,
    _id: string,
    phone: string,
    devicesToken: string,
    type: string,
    roles: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: Payload) {
        return {
            _id: payload._id,
            email: payload.email,
            phone: payload.phone,
            devicesToken: payload.devicesToken,
            type: payload.type,
            roles: payload.roles,
        };
    }
}
