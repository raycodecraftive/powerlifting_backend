import { IsString } from "class-validator";

export class CreateCompetitionDto {
    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsDateString()
    date: string;

    @IsString()
    category : string;
}
