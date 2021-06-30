import * as mongoose from 'mongoose';


export const EntrySchema = new mongoose.Schema({
    analysisNumbers: { type: Array, required: false },
    inspectionNumbers: { type: Array, required: false }, 
    doctorId: { type: Number, required: true },
    historyNumber: { type: Number, required: true },
    description: { type: String, required: true },
    numberOfVisit: { type: Number, required: true },
    ICDcode: { type: String, required: true }
});

export class EntryModel extends mongoose.Document {
    analysisNumbers: [];
    inspectionNumbers: [];
    doctorId: Number;
    historyNumber: String;
    description: String;
    numberOfVisit: Number;
    ICDcode: String;
}