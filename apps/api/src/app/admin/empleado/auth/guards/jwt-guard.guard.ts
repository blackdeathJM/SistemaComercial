import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export class JwtAuthGuard extends AuthGuard('jwt')
{
    getRequest(context: ExecutionContext): any
    {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
