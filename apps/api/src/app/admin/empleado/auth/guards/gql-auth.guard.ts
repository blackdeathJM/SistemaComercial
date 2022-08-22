import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local')
{
    getRequest(context: ExecutionContext): any
    {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs().login;
        return request;
    }
}
