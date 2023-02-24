import {ArgsType, PickType, InputType, OmitType} from '@nestjs/graphql';
import {MirDto} from './mir.dto';

@ArgsType()
export class ObtenerMirsDto extends PickType(MirDto, ['ano'], ArgsType)
{

}

export type TObtenerMirs = ObtenerMirsDto & Document;

@InputType('agregarMirInput')
export class AgregarMirDto extends OmitType(MirDto, ['_id'], InputType)
{

}

export type TAgregarMir = AgregarMirDto;
