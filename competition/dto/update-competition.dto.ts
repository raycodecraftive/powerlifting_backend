import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitionDto } from './create-competition.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateCompetitionDto {

    @IsString()
    @IsOptional()
    name? : string;

    @IsString()
    @IsOptional()
    location? : string;

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsString()
    @IsOptional()
    category?: string;
}
