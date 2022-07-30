export interface IRespuesta
{
    errors?: {
        'message': string;
        'extensions': {
            'code': string;
        };
        'response': {
            'statusCode': number;
            'message': string[];
            'error': string;
        };
    }[];
    data: any;
    loading: boolean;
}
