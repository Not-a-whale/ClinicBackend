import { Injectable, NotFoundException } from "@nestjs/common";
import { EntryModel } from './entry.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntriesModule } from "./entries.module";
@Injectable()
export class EntriesService {
    private entry: EntryModel[] = [];

    constructor(@InjectModel('Entry') private readonly entryModel: Model<EntryModel> ) {

    }

    async insertEntry(
        analysisNumbers: [],
        inspectionNumbers: [],
        description: String,
        doctorId: Number,
        historyNumber: String,
        numberOfVisit: Number,
        ICDcode: String) {
            const docId = doctorId;
            const newEntry = new this.entryModel({analysisNumbers, inspectionNumbers, description, doctorId, historyNumber, numberOfVisit, ICDcode});
            const result = await newEntry.save();
            return newEntry.doctorId as number;
    }

    async getEntries() {
        const entries = await this.entryModel.find().exec(); 
        console.log(entries);
        return entries.map((entry) => ({analysisNumbers: entry.analysisNumbers, 
            inspectionNumbers: entry.inspectionNumbers,
            doctorId: entry.doctorId,
            description: entry.description,
            historyNumber: entry.historyNumber,
            numberOfVisit: entry.numberOfVisit,
            ICDcode: entry.ICDcode}))
    }

    async getEntry(entryId) {
       const entry = await this.findEntry(entryId);
       return { analysisNumbers: entry.analysisNumbers, inspectionNumbers: entry.inspectionNumbers, 
        doctorId: entry.doctorId, historyNumber: entry.historyNumber,
        numberOfVisit: entry.numberOfVisit, ICDcode: entry.ICDcode};
    }

    async updateEntry(analysisNumbers: [], inspectionNumbers: [], description: string, doctorId: number, 
        historyNumber: string, numberOfVisit: number, 
        ICDcode: string) {
        const updatedEntry = await this.findEntry(historyNumber);
        if(analysisNumbers) {
            updatedEntry.analysisNumbers = analysisNumbers;
        }
        if(inspectionNumbers) {
            updatedEntry.inspectionNumbers = inspectionNumbers;
        }
        if(description) {
            updatedEntry.description = description;
        }
        if(numberOfVisit) {
            updatedEntry.numberOfVisit = numberOfVisit;
        }
        if(doctorId) {
            updatedEntry.doctorId = doctorId;
        }
        if(historyNumber) {
            updatedEntry.historyNumber = historyNumber;
        }
        if(ICDcode) {
            updatedEntry.ICDcode = ICDcode;
        }
        updatedEntry.save();
    }

    async deleteEntry(historyNumber: string) {
        await this.entryModel.deleteOne({historyNumber: historyNumber});
    }

    private async findEntry(entryId): Promise<EntryModel> {
        let entry;
        try {
            entry = await this.entryModel.findOne({ historyNumber: entryId });
        } catch {
            throw new NotFoundException('Could not find the product');
        }
        return entry;
    }
}