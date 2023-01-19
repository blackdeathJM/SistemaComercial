import {Field, InputType} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload-ts';
import {IArchivo, IDatosArchivo} from './upload.interface';
import {IsOptional} from 'class-validator';

@InputType('UploadInput')
export class UploadDto implements IDatosArchivo
{
    @Field({nullable: true})
    @IsOptional()
    carpeta: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsOptional()
    eliminar: boolean;
    @Field(() => String, {nullable: true, defaultValue: null, description: 'Es la url A eliminar en caso de que sea remplazar o eliminar el archivo'})
    @IsOptional()
    url: string;
    @Field(() => [GraphQLUpload], {nullable: true, defaultValue: null})
    @IsOptional()
    file: Promise<IArchivo[]>;
}
