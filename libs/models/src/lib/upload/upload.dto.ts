import {Field, InputType} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload';
import {UploadScalar} from './upload.scalar';

@InputType('ArchivoInput')
export class UploadDto
{
    @Field(() => GraphQLUpload, {nullable: true})
        // archivo: Promise<ISubirArchivo>;
    archivo: UploadScalar;
}
