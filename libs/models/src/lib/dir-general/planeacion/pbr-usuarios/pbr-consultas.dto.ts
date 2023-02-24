import {ArgsType, PickType} from '@nestjs/graphql';
import {PbrDto} from './pbr.dto';

@ArgsType()
export class PbrPorAno extends PickType(PbrDto, ['ano'], ArgsType)
{

}
