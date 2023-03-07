import {ArgsType, InputType, OmitType, PickType} from '@nestjs/graphql';
import {PbrDto} from './pbr.dto';

@ArgsType()
export class PbrsDto extends PickType(PbrDto, ['ano', 'centroGestor'], ArgsType)
{

}

@InputType('RegPbrInput')
export class RegPbrDto extends OmitType(PbrDto, ['_id', 'ejercicio'], InputType)
{

}

export type TRegPbr = RegPbrDto;
