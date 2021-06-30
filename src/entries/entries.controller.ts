import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { EntriesService } from "./entries.service";



@Controller('journals')
export class EntriesController {
    constructor(private entriesService: EntriesService) {
    }

    @Get()
    async getAllEntries() {
        const entries = await this.entriesService.getEntries();
        return entries;
    }

    @Get(':id')
    async getDoctor(@Param('id') entryId: string) {
        return await this.entriesService.getEntry(entryId);
    }

    @Post()
    async addEntry( 
    @Body('analysisNumbers') analysisNumbers: [],
    @Body('inspectionNumbers') inspectionNumbers: [],
    @Body('doctorId') doctorId: number,
    @Body('description') description: string,
    @Body('historyNumber') historyNumber: string,
    @Body('numberOfVisit') numberOfVisit: number,
    @Body('ICDcode') ICDcode: string) {
        const id = await this.entriesService.insertEntry(analysisNumbers, inspectionNumbers, description,
            doctorId, historyNumber, numberOfVisit, ICDcode);
        return {id: id};
    }

    @Patch(':id')
    updateDoctor(
        @Body('analysisNumbers') analysisNumbers: [],
        @Body('inspectionNumbers') inspectionNumbers: [],
        @Body('description') description: string,
        @Body('doctorId') doctorId: number,
        @Body('historyNumber') historyNumber: string,
        @Body('numberOfVisit') numberOfVisit: number,
        @Body('ICDcode') ICDcode: string) {
        this.entriesService.updateEntry(analysisNumbers, inspectionNumbers, description,
            doctorId, historyNumber, numberOfVisit, ICDcode);
        return 'patched';
    }

    @Delete(':id') 
    removeEntry(@Param('id') personalId: string) {
        this.entriesService.deleteEntry(personalId);
        return 'removed';
    }
}