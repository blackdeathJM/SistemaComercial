import {Field, InputType} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload';
import {IArchivo, IDatosArchivo} from './upload.interface';
import {IsNotEmpty} from 'class-validator';

@InputType('ArchivoInput')
export class UploadDto implements IDatosArchivo
{
    @Field({nullable: true})
    @IsNotEmpty({message: 'Es necesario el nombre de la carpeta'})
    carpeta: string;
    @Field(() => [GraphQLUpload], {nullable: true})
    @IsNotEmpty({message: 'Es necesario un arreglo de archivos'})
    file: Promise<IArchivo[]>;
}
