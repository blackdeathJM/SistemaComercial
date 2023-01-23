import {gql} from '@apollo/client';
import {FRAG_DEPTOS} from './deptos.fragment';

export const deptos = gql`
    query
    {
        deptos
        {
            ...fragDeptos
        }
    }
    ${FRAG_DEPTOS}
`;

export const crearDepto = gql`
    mutation crearDepto($input: DeptoInput!)
    {
        crearDepto(input: $input)
        {
            ...fragDeptos
        }
    }
    ${FRAG_DEPTOS}
`;
