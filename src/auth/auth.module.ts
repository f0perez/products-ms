import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './jwt.constants';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  JwtModule.register({
    secret: jwtConstant.secret,
    signOptions: { expiresIn: '60s' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
