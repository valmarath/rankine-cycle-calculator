import * as C from './styles';

export const InputValue = ( {setInputValue, label} ) => {



    return (
        <C.Container>
            <C.Label>
                {label}
            </C.Label>
            <C.Input placeholder='' type='number' onChange={e => setInputValue(e.target.value)}>

            </C.Input>
        </C.Container>
    )
}