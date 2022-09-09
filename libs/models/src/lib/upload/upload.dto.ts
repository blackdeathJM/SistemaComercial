import {Field, InputType} from '@nestjs/graphql';
import {ISubirArchivo} from './upload.interface';
import {GraphQLUpload} from 'graphql-upload';

@InputType('ArchivoInput')
export class UploadDto
{
    @Field(() => GraphQLUpload, {nullable: true})
    archivo: Promise<ISubirArchivo>;
}
