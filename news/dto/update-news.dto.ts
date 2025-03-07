import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto {
    title?: string;
    content?: string;
    imageUrl?: string;
}
