import {ArgsType, PickType, InputType, OmitType} from '@nestjs/graphql';
import {MirDto} from './mir.dto';

@ArgsType()
export class MirsPorAnoDto extends PickType(MirDto, ['ano'], ArgsType)
{

}

export type TMirsPorAno = MirsPorAnoDto;

@ArgsType()
export class MirsPorCentroGestorDto extends PickType(MirDto, ['centroGestor', 'ano'], ArgsType)
{

}

export type TMirsPorCentroGestor = MirsPorCentroGestorDto;
