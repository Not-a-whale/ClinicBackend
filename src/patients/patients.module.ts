import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientSchema } from './patient.model';


@Module({
    imports: [MongooseModule.forFeature([{name: 'Patient', schema: PatientSchema}])],
    controllers: [PatientsController],
    providers: [PatientsService] 
})

export class PatientsModule {

}