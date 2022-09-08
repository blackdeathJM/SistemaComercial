import {Field, InputType, Int, ObjectType, PickType} from '@nestjs/graphql';
import {DocumentoDto} from './documento.Dto';

@InputType('DocAnoInput')
export class DocAnoDto extends PickType(DocumentoDto, ['ano'], InputType)
{
}
