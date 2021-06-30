import * as mongoose from 'mongoose';

export const DoctorSchema = new mongoose.Schema({
    personalId: { type: String, required: true },
    name: { type: String, required: true }, 
    speciality: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    examineRoomNumber: { type: Number, required: true },
});

export class DoctorModel extends mongoose.Document {
    personalId: string;
    name: string;
    speciality: string;
    address: string;
    phoneNumber: string;
    examineRoomNumber: number;
}