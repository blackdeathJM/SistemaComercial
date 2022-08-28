import {Field, ID, InputType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';

@InputType('GeneralInput')
export class GeneralDto
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Id no obtenido'})
    _id: string;
}
