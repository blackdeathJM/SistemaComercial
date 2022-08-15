import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {IsNotEmpty} from "class-validator";

@ObjectType('GeneralType')
@InputType('GeneralInput')
export class GeneralDto
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Id no obtenido'})
    _id: string;
}
