import {gql} from '@apollo/client';
import {FRAG_DEPTOS} from '@s-app/modules/admin/deptos/gql/deptos.fragment';

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
            _id
            nombre
            centroGestor
        }
    }
`;
