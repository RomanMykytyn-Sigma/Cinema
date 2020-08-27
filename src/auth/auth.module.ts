import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [PassportModule.register({session: true}), 
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
