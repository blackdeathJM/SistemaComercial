import {CustomScalar, Scalar} from '@nestjs/graphql';
import {GraphQLUpload} from 'graphql-upload-ts';

@Scalar('Upload')
export class UploadScalar implements CustomScalar<object, any>
{
    description = 'Upload custom scalar type';

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
