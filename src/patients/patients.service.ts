import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientModel } from './patient.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientsModule } from "./patients.module";
@Injectable()
export class PatientsService {
    private patients: PatientModel[] = [];

    constructor(@InjectModel('Patient') private readonly patientModel: Model<PatientModel> ) {

    }


    async insertPatient(
        name: String,
        dateOfBirth: Date,
        historyNumber: Number,
        address: String,
        phoneNumber: String) {
            const docId = historyNumber;
            const newEntry = new this.patientModel({name, dateOfBirth, address, phoneNumber, historyNumber});
            const result = await newEntry.save();
            return newEntry.historyNumber as number;
    }

    async getPatients() {
        const patients = await this.patientModel.find().exec(); 
        console.log(patients);
        return patients.map((patient) => ({name: patient.name, 
            dateOfBirth: patient.dateOfBirth,
            address: patient.address,
            phoneNumber: patient.phoneNumber,
            historyNumber: patient.historyNumber}));
    }

    async getPatient(patientId) {
       const patient = await this.findPatient(patientId);
       return { name: patient.name, dateOfBirth: patient.dateOfBirth, 
        address: patient.address, phoneNumber: patient.phoneNumber,
        historyNumber: patient.historyNumber};
    }

    async updatePatient(name: String, dateOfBirth: Date, historyNumber: Number, address: String, phoneNumber: String, 
        ) {
        const updatedPatient = await this.findPatient(historyNumber);
        if(name) {
            updatedPatient.name = name;
        }
        if(dateOfBirth) {
            updatedPatient.dateOfBirth = dateOfBirth;
        }
        if(address) {
            updatedPatient.address = address;
        }
        if(phoneNumber) {
            updatedPatient.phoneNumber = phoneNumber;
        }
        if(historyNumber) {
            updatedPatient.historyNumber = historyNumber;
        }
        updatedPatient.save();
    }

    async deletePatient(historyNumber: number) {
        await this.patientModel.deleteOne({historyNumber: historyNumber});
    }

    private async findPatient(patientId): Promise<PatientModel> {
        let patient;
        try {
            patient = await this.patientModel.findOne({ historyNumber: patientId });
        } catch {
            throw new NotFoundException('Could not find the patient');
        }
        return patient;
    }
}