import {Field, InputType} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload';
import {IArchivo, IDatosArchivo} from './upload.interface';
import {IsOptional} from 'class-validator';

@InputType('ArchivoInput')
export class UploadDto implements IDatosArchivo
{
    @Field({nullable: true})
    @IsOptional()
    carpeta: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsOptional()
    eliminar: boolean;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsOptional()
    reemplazar: boolean;
    @Field(() => String, {nullable: true, defaultValue: null})
    @IsOptional()
    url: string;
    @Field(() => [GraphQLUpload], {nullable: true})
    @IsOptional()
    file: Promise<IArchivo[]>;
}
