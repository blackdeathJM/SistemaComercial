import {InputType, PickType} from '@nestjs/graphql';
import {DocumentoDto} from './documento.Dto';

@InputType('DocAnoInput')
export class DocsUsuarioPendientes extends PickType(DocumentoDto, ['ano', 'usuarios', 'proceso'], InputType)
{
}
