import {InputType, PickType} from '@nestjs/graphql';
import {DocumentosDto} from './documentos.dto';

@InputType('DocAnoInput')
export class DocAnoInput extends PickType<DocumentosDto, 'ano'>(DocumentosDto, ['ano'] as const)
{
}

