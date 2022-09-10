import {Field, InputType} from '@nestjs/graphql';
import {GraphQLUpload, Upload} from 'graphql-upload';
import {ISubirArchivo} from './upload.interface';
import {UploadScalar} from './upload.scalar';

@InputType('ArchivoInput')
export class UploadDto
{
    @Field(() => [GraphQLUpload], {nullable: true})
    file: Promise<ISubirArchivo[]>;
}
