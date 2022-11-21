import {environment} from '@api-environments:/environment';

export default (): any =>
{
    console.log('enviroments');
    if (environment.production)
    {
    } else
    {

    }
};
