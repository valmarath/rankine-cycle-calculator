import * as C from './styles';

export const PostButton = ( {onClick} ) => {

    return (
        <C.Container onClick={onClick}>
            <C.Label>Calcular Ciclo</C.Label>
        </C.Container>
    )
}