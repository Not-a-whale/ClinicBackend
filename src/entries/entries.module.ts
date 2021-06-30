import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntrySchema } from './entry.model';
import { MongooseModule } from "@nestjs/mongoose";
import { EntriesController } from "./entries.controller";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Entry', schema: EntrySchema}])],
    controllers: [EntriesController],
    providers: [EntriesService] 
})

export class EntriesModule {

}