import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { PatientsService } from "./patients.service";



@Controller('patients')
export class PatientsController {
    constructor(private patientsService: PatientsService) {
    }

    @Get()
    async getAllPatients() {
        const patients = await this.patientsService.getPatients();
        return patients;
    }

    @Get(':id')
    async getDoctor(@Param('id') patientId: string) {
        return await this.patientsService.getPatient(patientId);
    }

    @Post()
    async addEntry( 
    @Body('name') name: string,
    @Body('dateOfBirth') dateOfBirth: Date,
    @Body('historyNumber') historyNumber: number,
    @Body('address') address: string,
    @Body('phoneNumber') phoneNumber: string) {
        const id = await this.patientsService.insertPatient(name, dateOfBirth, historyNumber,
            address, phoneNumber);
        return {id: id};
    }

    @Patch(':id')
    updatePatientr(
        @Body('name') name: string,
        @Body('dateOfBirth') dateOfBirth: Date,
        @Body('historyNumber') historyNumber: number,
        @Body('address') address: string,
        @Body('phoneNumber') phoneNumber: string) {
        this.patientsService.updatePatient(name, dateOfBirth, historyNumber,
            address, phoneNumber);
        return 'patched';
    }

    @Delete(':id') 
    removeEntry(@Param('id') personalId: number) {
        this.patientsService.deletePatient(personalId);
        return 'removed';
    }
}