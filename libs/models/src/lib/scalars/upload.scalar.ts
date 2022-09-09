import {Scalar} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar
{
    description = 'File upload scalar type';

    parseValue(value: any): any
    {
        return GraphQLUpload.parseValue(value);
    }

    serialize(value: any): any
    {
        return GraphQLUpload.serialize(value);
    }

    parseLiteral(ast: any): any
    {
        return GraphQLUpload.parseLiteral(ast, ast.value);
    }
}
