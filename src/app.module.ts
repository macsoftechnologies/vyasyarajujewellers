import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Register } from './userRegister/entity/userRegister.entity';
import { userRegisterModule } from './userRegister/userRegister.module';
import { createConnection } from 'typeorm';
import { QueriesController } from './queries/queries.controller';
import { QueriesService } from './queries/queries.service';
import { queriesModule } from './queries/queries.module';
import { productsModule } from './product/product.module';
import { reviewsModule } from './reviews/reviews.module';
import { contactModule } from './contact/contact.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { imagesModule } from './images/images.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({type: 'mysql',
       host: 'ls-9b6b93368d6c8ba4138f6ccb36923e6c27c074a4.c7vrc7k2qb9e.ap-south-1.rds.amazonaws.com',
       port: 3306,
       username: 'dbmasteruser',
       password: '5016:loqLAL,(]FfeVO9qMRt.8kYD<M7',
       database: 'dbmaster',
       logging:true,
      synchronize: true,
       autoLoadEntities: true,
      keepConnectionAlive: true,
      retryDelay: 3000,
      insecureAuth : true
   }),
      userRegisterModule,
      queriesModule,
      productsModule,
      reviewsModule,
      contactModule,
      SubscribeModule,
      imagesModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
