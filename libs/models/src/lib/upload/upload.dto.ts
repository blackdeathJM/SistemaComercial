import {Field, InputType} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload';
import {IArchivo, IDatosArchivo} from './upload.interface';

@InputType('ArchivoInput')
export class UploadDto implements IDatosArchivo
{
    @Field({nullable: true})
    carpeta: string;
    @Field(() => Boolean, {nullable: true})
    guardarLocal: boolean;
    @Field(() => [GraphQLUpload], {nullable: true})
    file: Promise<IArchivo[]>;
}
