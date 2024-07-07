import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWT_PASS } from 'src/apuesta.infraestructure.cross.cuting/constants/jwt.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_PASS,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
