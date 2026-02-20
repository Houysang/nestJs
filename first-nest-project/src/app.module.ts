import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task],
      synchronize: true, // use only in development!
    }),
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}



// x.y.z
// x is resource
// y is file function
// z is extension
// Example: app.module.ts

//synchronize: true, no to worry about lose data
// node_modules: store library
// Module: a feature

//app.controller.ts: rout for mapping url and function
//app.service.ts: business logic, data manipulation, database connection, etc

//@Entity: adject to class, make it as database table
// @PrimaryGeneratedColumn: make it as primary key, auto increment