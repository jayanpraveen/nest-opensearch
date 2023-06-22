import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { opensearchProvider } from './opensearch.provider';


@Module({
    providers: [...databaseProviders, ...opensearchProvider],
    exports: [...databaseProviders, ...opensearchProvider]
})
export class DatabaseModule { }