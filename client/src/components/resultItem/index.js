import React from 'react';

import * as C from './styles';

export const ResultItem = ( {index, item} ) => {

    return(
        <C.Container>
            <C.Title>
                {item}
            </C.Title>
            <C.Results>
               
            </C.Results>
        </C.Container>
    );
}