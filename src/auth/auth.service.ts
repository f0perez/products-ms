import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async register(userObject: RegisterAuthDto) {
        const { password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = {...userObject, password: plainToHash};
        return this.userModel.create(userObject);
    }

    login() {}
}
