import React from 'react';

import * as C from './styles';
import { useState, useEffect } from 'react';



export const CycleSelector = ({setReturnApi, cycle, setCycle, setLayout}) => {

    const [cycleType, setCycleType] = useState('RSI');
    const [cycleProperties, setCycleProperties] = useState('');

    useEffect(()=> {
        if(cycleType === 'RSI') {
            setCycleProperties({property: 'RSI_1', index1: true})
        } else if (cycleType === 'RSR') {
            setCycleProperties({property: 'RSR_1', index1: true})
        } else if (cycleType === 'RRI') {
            setCycleProperties({property: 'RRI_1', index1: true})
        } else if (cycleType === 'RRR') {
            setCycleProperties({property: 'RRR_1', index1: true})
        }
    }, [cycleType])

    const startButton = () => {
        let property = cycleProperties.property
        let item = {
            cycleType,
            property
        }
        setCycle(item);
        setLayout(true);
        setReturnApi();
    }

    const cancelButton = () => {
        setLayout((current) => !current)
    }

    return(
        <C.Container>
            <C.Label>
                Qual ciclo termodinâmico você deseja calcular?
            </C.Label>
            <C.Select defaultValue='RSI' onChange={e => setCycleType(e.target.value)}>
                <option value="RSI">Rankine Simples (Ideal)</option>
                <option value="RRI">Rankine com Reaquecimento (Ideal)</option>
                <option value="RRR">Rankine com Reaquecimento (Real)</option>
            </C.Select>
            <C.Label>
                Qual conjunto de propriedades você deseja fornecer?
            </C.Label>
            {(cycleType === 'RSI') &&
                <C.Inputs>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RSI_1', index1: true})} cycleProperties={cycleProperties.index1} >
                        <p>Fluido</p>
                        <p>Pressão na caldeira</p>
                        <p>Temperatura na na entrada da turbina</p>
                        <p>Temperatura no condensador</p>
                        <p>Potência da turbina</p>
                        <p>Fluido de resfriamento</p>
                        <p>Densidade do fluido de resfriamento</p>
                        <p>Temperatura de entrada do fluido de resfriamento</p>
                        <p>Vazão do fluido (de resfriamento)</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RSI_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Fluido</p>
                        <p>Pressão na caldeira</p>
                        <p>Temperatura na entrada da turbina</p>
                        <p>Pressão no condensador</p>
                        <p>Potência líquida</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index2} />
                    </C.InputItem>
                </C.Inputs>
            }
            {(cycleType === 'RRI') &&
                <C.Inputs>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRI_1', index1: true})} cycleProperties={cycleProperties.index1} >
                        <p>Fluido</p>
                        <p>Pressão da caldeira</p>
                        <p>Temperaturada na entrada da turbina 1</p>
                        <p>Pressão de reaquecimento</p>
                        <p>Temperatura na entrada da turbina 2</p>
                        <p>Temperatura no condensador</p>
                        <p>Potência da turbina (2º estágio)</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRI_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Fluido</p>
                        <p>Pressão da caldeira</p>
                        <p>Temperaturada na entrada da turbina 1</p>
                        <p>Pressão de reaquecimento</p>
                        <p>Temperatura na entrada da turbina 2</p>
                        <p>Pressão no condensador</p>
                        <p>Potência líquida</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index2} />
                    </C.InputItem>
                </C.Inputs>
            }
            {(cycleType === 'RRR') &&
                <C.Inputs>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRR_1', index1: true})} cycleProperties={cycleProperties.index1} >
                        <p>Fluido</p>
                        <p>Pressão da caldeira</p>
                        <p>Temperatura na entrada da turbina 1</p>
                        <p>Pressão de reaquecimento</p>
                        <p>Temperaturada na saída da turbina 2</p>
                        <p>Temperaturada na entrada da turbina 2</p>
                        <p>Pressão do condensador</p>
                        <p>Eficiência isoentrópica (2º estágio)</p>
                        <p>Potência líquida</p>
                        <p>Fluido de resfriamento</p>
                        <p>Densidade do fluido de resfriamento</p>
                        <p>Temperatura de entrada do fluido de resfriamento</p>
                        <p>Vazão do fluido (de resfriamento)</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRR_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Fluido</p>
                        <p>Pressão da caldeira</p>
                        <p>Temperatura na entrada da turbina 1</p>
                        <p>Pressão de reaquecimento</p>
                        <p>Temperaturada na saída da turbina 2</p>
                        <p>Temperaturada na entrada da turbina 2</p>
                        <p>Pressão do condensador</p>
                        <p>Potência da turbina (2º estágio)</p>
                        <p>Vazão mássica do fluido</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index2} />
                    </C.InputItem>
                </C.Inputs>
            }
            <C.ButtonContainer>
                <C.Button type="button" onClick={startButton}>
                    Iniciar
                </C.Button>
                {(cycle !== 'first') &&
                    <C.Button type="button" onClick={cancelButton}>
                        Cancelar
                    </C.Button>
                }
            </C.ButtonContainer>
        </C.Container>
    );
}