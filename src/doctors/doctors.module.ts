import { DoctorsController } from "./doctors.controller";
import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorSchema } from './doctor.model';
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Doctor', schema: DoctorSchema}])],
    controllers: [DoctorsController],
    providers: [DoctorsService] 
})

export class DoctorsModule {

}