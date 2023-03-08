import {ArgsType, PickType, InputType} from '@nestjs/graphql';
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

@InputType('MirsActAvancesInput')
export class MirsActAvancesDto extends PickType(MirDto, ['_id', 'lineaBaseAno', 'lineaBaseValor', 'meta', 'semefVerde', 'semefAmarillo',
    'semefRojo', 'avanceTrim1', 'avanceTrim2', 'avanceTrim3', 'avanceTrim4'], InputType)
{

}

export type TMirsActAvances = MirsActAvancesDto;
