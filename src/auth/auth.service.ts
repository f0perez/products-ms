import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}

    async register(userObject: RegisterAuthDto) {
        const { password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = {...userObject, password: plainToHash};
        return this.userModel.create(userObject);
    }

    async login(userObjectLogin: LoginAuthDto) {

        const { email, password } = userObjectLogin;
        const user = await this.userModel.findOne({ email });
        if (!user) throw new HttpException('USER_NOT_FOUND', 404);


        const checkPassword = await compare(password, user.password);
        if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);
        
        const payload = { id: user._id, name: user.name };
        const token = this.jwtService.sign(payload)

        const data = {
            user,
            token
        };
        return data;
    }
}
