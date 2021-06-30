import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";



@Controller('doctors')
export class DoctorsController {
    constructor(private doctorsService: DoctorsService) {
    }

    @Get()
    async getAllDoctors() {
        const products = await this.doctorsService.getDoctors();
        return products;
    }

    @Get(':id')
    async getDoctor(@Param('id') docId: string) {
        console.log(docId);
        return await this.doctorsService.getDoctor(docId);
    }

    @Post()
    async addDoctor( 
    @Body('personalId') personalId: string,
    @Body('name') name: string,
    @Body('speciality') speciality: string,
    @Body('address') address: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('examineRoomNumber') examineRoomNumber: number) {
        const id = await this.doctorsService.insertDoctor(personalId, name, speciality, address, phoneNumber, examineRoomNumber);
        return {id: id};
    }

    @Patch(':id')
    async updateDoctor(
    @Body('personalId') personalId: string, 
    @Body('speciality') speciality: string, 
    @Body('name') name: string, 
    @Body('address') address: string,
    @Body('phoneNumber') phoneNumber: string, 
    @Body('examineRoomNumber') examineRoomNumber: number) {
        await this.doctorsService.updateDoctor(personalId, speciality, name, address, phoneNumber, examineRoomNumber);
        return 'patched';
    }

    @Delete(':id') 
    async removeProduct(@Param('id') personalId: string) {
        await this.doctorsService.deleteDoctor(personalId);
        return 'removed';
    }
}