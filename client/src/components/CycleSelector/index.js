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
                <option value="RSR">Rankine Simples (Real)</option>
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
                        <p>Temperatura na caldeira</p>
                        <p>Temperatura no condensador</p>
                        <p>Potência da turbina</p>
                        <p>Fluido de resfriamento</p>
                        <p>Densidade do fluido de resfriamento</p>
                        <p>Temperatura de entrada do fluido de resfriamento</p>
                        <p>Vazão do fluído (de resfriamento)</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RSI_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Fluido</p>
                        <p>Pressão na caldeira</p>
                        <p>Temperatura na caldeira</p>
                        <p>Pressão no condensador</p>
                        <p>Potência líquida</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index2} />
                    </C.InputItem>
                </C.Inputs>
            }
            {(cycleType === 'RSR') &&
                <C.Inputs>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RSR_1', index1: true})} cycleProperties={cycleProperties.index1} >
                        <p>Fluido</p>
                        <p>Temperatura no Condensador</p>
                        <p>Potência da Turbina</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RSR_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Potência da Turbina</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index2} />
                    </C.InputItem>
                </C.Inputs>
            }
            {(cycleType === 'RRI') &&
                <C.Inputs>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRI_1', index1: true})} cycleProperties={cycleProperties.index1} >
                        <p>Fluido</p>
                        <p>Pressão da turbina (1º estágio)</p>
                        <p>Temperaturada turbina (1º estágio) </p>
                        <p>Pressão do vapor expandido</p>
                        <p>Temperatura de reaquecimento</p>
                        <p>Temperatura no condensador</p>
                        <p>Potência da turbina (2º estágio)</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRI_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Fluido</p>
                        <p>Pressão da turbina (1º estágio)</p>
                        <p>Temperaturada turbina (1º estágio) </p>
                        <p>Pressão do vapor expandido</p>
                        <p>Temperatura de reaquecimento</p>
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
                        <p>Pressão da turbina (1º estágio, entrada)</p>
                        <p>Temperaturada turbina (1º estágio, entrada) </p>
                        <p>Pressão da turbina (1º estágio, saída)</p>
                        <p>Temperaturada turbina (1º estágio, saída) </p>
                        <p>Temperatura de reaquecimento</p>
                        <p>Pressão do vapor expandido</p>
                        <p>Eficiência isoentrópica (2º estágio)</p>
                        <p>Potência líquida</p>
                        <p>Fluido de resfriamento</p>
                        <p>Densidade do fluido de resfriamento</p>
                        <p>Temperatura de entrada do fluido de resfriamento</p>
                        <p>Vazão do fluído (de resfriamento)</p>
                        <C.SelectedCircle cycleProperties={cycleProperties.index1} />
                    </C.InputItem>
                    <C.InputItem onClick={e => setCycleProperties({property: 'RRR_2', index2: true})} cycleProperties={cycleProperties.index2} >
                        <p>Fluido</p>
                        <p>Pressão da turbina (1º estágio, entrada)</p>
                        <p>Temperaturada turbina (1º estágio, entrada) </p>
                        <p>Pressão da turbina (1º estágio, saída)</p>
                        <p>Temperaturada turbina (1º estágio, saída) </p>
                        <p>Temperatura de reaquecimento</p>
                        <p>Pressão do vapor expandido</p>
                        <p>Potência da turbina (2º estágio)</p>
                        <p>Vazão mássica do fluído</p>
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