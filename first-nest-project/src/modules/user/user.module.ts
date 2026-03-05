import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  // Add any other necessary configurations or modules
})
export class UserModule {}