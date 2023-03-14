import * as C from './styles';
import { useState, useEffect } from 'react';


export const InputType = ( {label, defaultValue} ) => {

    const [defaultValueText, setDefaultValueText] = useState(defaultValue)

    useEffect(() => {
        if (defaultValue === 'Density') {
            setDefaultValueText('Densidade')
        } else if (defaultValue === 'Pressure') {
            setDefaultValueText('Pressão')
        } else if (defaultValue === 'Temperature') {
            setDefaultValueText('Temperatura')
        } else if (defaultValue === 'Enthalpy') {
            setDefaultValueText('Entalpia')
        } else if (defaultValue === 'Entropy') {
            setDefaultValueText('Entropia')
        } else if (defaultValue === 'liquid') {
            setDefaultValueText('Líquido Saturado')
        } else if (defaultValue === 'mixture') {
            setDefaultValueText('Mistura Saturada')
        } else if (defaultValue === 'superheated') {
            setDefaultValueText('Vapor Superaquecido')
        }else if (defaultValue === 'power') {
            setDefaultValueText('Potência')
        }else if (defaultValue === 'Efficiency') {
            setDefaultValueText('Eficiência')
        }else if (defaultValue === 'flowRate') {
            setDefaultValueText('Vazão')
        }else if (defaultValue === 'massFlowRate') {
            setDefaultValueText('Vazão mássica')
        }}, [defaultValue]);

    return (
        <C.Container>
            <C.Label>
                {label}
            </C.Label>
            <C.Type>
                <p>{defaultValueText}</p>
            </C.Type>
        </C.Container>
    )
}