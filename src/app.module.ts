import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { EntriesModule } from './entries/entries.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [DoctorsModule, EntriesModule, PatientsModule, MongooseModule.forRoot('mongodb+srv://Nikita:Kornienko130@cluster0.mblq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
