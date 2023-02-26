import React from 'react';

import * as C from './styles';
import { ResultItem } from '../resultItem';

export const Result = ( {data, resultInfo} ) => {

    return(
        <C.Container>
            <C.Title>
                Resultados
            </C.Title>
            {(data === undefined && resultInfo !== 'loading') &&
            <C.Loading>
                <p>
                    Insira todos os valores, conforme solicitado, e clique em "Calcular Ciclo" para obter os resultados do seu sistema.
                </p>
            </C.Loading>}
            {(resultInfo === 'loading') &&
            <C.Loading>
                <p>
                    Loading...
                </p>
            </C.Loading>}
            {data &&
            data.map((item, index) => (
                <ResultItem
                    key={index}
                    item={item}
                />
            ))}
            {data &&
            <>
            - Para calcular o mesmo ciclo com diferentes valores de entrada, basta modificar estes e clicar em calcular novamente.
            <br/><br/>
            - Para alterar o tipo de ciclo ou as entradas que serão fornecidas, clique em configurações e selecione o setup desejado.
            </>
            }

        </C.Container>
    );
}