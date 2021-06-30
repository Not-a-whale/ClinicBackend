import * as mongoose from 'mongoose';


export const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, 
    historyNumber: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

export class PatientModel extends mongoose.Document {
    name: String;
    dateOfBirth: Date;
    historyNumber: Number;
    address: String;
    phoneNumber: String;
}