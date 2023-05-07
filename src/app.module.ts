import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest-news-blog',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NewsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
