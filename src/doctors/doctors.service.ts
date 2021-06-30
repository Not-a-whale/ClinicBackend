import { Injectable, NotFoundException } from "@nestjs/common";
import { DoctorModel } from './doctor.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorsModule } from "./doctors.module";
@Injectable()
export class DoctorsService {
    private doctors: DoctorModel[] = [];

    constructor(@InjectModel('Doctor') private readonly doctorModel: Model<DoctorModel> ) {

    }

    async insertDoctor(
        personalId: string,
        speciality: string,
        address: string,
        phoneNumber: string,
        name: string,
        examineRoomNumber: number) {
            const docId = personalId;
            const newDoctor = new this.doctorModel({personalId, speciality, name, address, phoneNumber, examineRoomNumber});
            const result = await newDoctor.save();
            return newDoctor.personalId as string;
    }

    async getDoctors() {
        const doctors = await this.doctorModel.find().exec(); 
        return doctors.map((doctor) => ({personalId: doctor.personalId, 
            speciality: doctor.speciality,
            name: doctor.name,
            address: doctor.address,
            phoneNumber: doctor.phoneNumber,
            examineRoomNumber: doctor.examineRoomNumber}))
    }

    async getDoctor(doctorsId) {
       const doctor = await this.findDoctor(doctorsId);
       return { personalId: doctor.personalId, speciality: doctor.speciality, name: doctor.name, address: doctor.address,
        phoneNumber: doctor.phoneNumber, examineRoomNumber: doctor.examineRoomNumber};
    }

    async updateDoctor(personalId: string | number, speciality: string, name: string, address: string, phoneNumber: string, 
        examineRoomNumber: number) {
        const updatedDoctor = await this.findDoctor(personalId);
        if(speciality) {
            updatedDoctor.speciality = speciality;
        }
        if(name) {
            updatedDoctor.name = name;
        }
        if(address) {
            updatedDoctor.address = address;
            console.log(address);
        }
        if(phoneNumber) {
            updatedDoctor.phoneNumber = phoneNumber;
        }
        if(examineRoomNumber) {
            updatedDoctor.examineRoomNumber = examineRoomNumber;
        }
        updatedDoctor.save();
    }

    async deleteDoctor(docId: string) {
        await this.doctorModel.deleteOne({personalId: docId});
    }

    private async findDoctor(doctorsId): Promise<DoctorModel> {
        let doctor;
        console.log(doctorsId);
        try {
            doctor = await this.doctorModel.findOne({ personalId: doctorsId });
        } catch {
            throw new NotFoundException('Could not find the product');
        }
        return doctor;
    }
}