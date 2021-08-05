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
       host: 'sql6.freesqldatabase.com',
       port: 3306,
       username: 'sql6429236',
       password: '76gj3NCiJS',
       database: 'sql6429236',
       logging:true,
       synchronize: true,
       autoLoadEntities: true,
     // keepConnectionAlive: true,
      //insecureAuth : true
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
