import {CustomScalar, Scalar} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@Scalar('JSON', () => Object)
export class JsonScalar implements CustomScalar<string, any>
{
    name = GraphQLJSON.name;
    parseValue = GraphQLJSON.parseValue;
    parseLiteral = GraphQLJSON.parseLiteral;

    serialize(value: any): any
    {
        return GraphQLJSON.serialize(value);
    }
}
