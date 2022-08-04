import {gql} from '@apollo/client';

export const FRAG_DEPTOS = gql`
    fragment fragDeptos on DeptoType
    {
        _id
        nombre
        centroGestor
    }
`;
