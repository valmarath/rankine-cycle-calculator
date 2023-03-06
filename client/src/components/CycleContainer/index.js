import React from 'react';

import * as C from './styles';
import { useState, useEffect } from 'react';

import { FluidInput } from '../inputs/FluidInput';
import { InputRow } from '../inputs/InputRow';
import { PostButton } from '../buttons/PostButton';



export const CycleContainer = ({setReturnApi, cycleType, cycleProperties, setResultInfo}) => {

    const [fluid, setFluid] = useState('Water');
    const [return1, setReturn1] = useState();
    const [return2, setReturn2] = useState();
    const [return3, setReturn3] = useState();
    const [return4, setReturn4] = useState();
    const [return5, setReturn5] = useState();
    const [return6, setReturn6] = useState();

    const specific1 = {
        input: 'Pressão na caldeira',
        valor: 'Valor', 
        defaultInput: 'Pressure',
        defaultUnit: 'MPa',
        number: '1',
    };
    const specific2 = {
        input: 'Temperatura na caldeira',
        valor: 'Valor', 
        defaultInput: 'Temperature',
        defaultUnit: 'Celsius',
        number: '2'
    };
    const specific3 = {
        input: 'Temperatura no condensador',
        valor: 'Valor', 
        defaultInput: 'Temperature',
        defaultUnit: 'Celsius',
        number: '3'
    };
    const specific4 = {
        input: 'Potência da Turbina',
        valor: 'Valor', 
        defaultInput: 'power',
        defaultUnit: 'kW',
        number: '4',
    };
    const specific5 = {
        input: 'Potência líquida',
        valor: 'Valor', 
        defaultInput: 'power',
        defaultUnit: 'kW',
        number: '4',
    };
    const specific6 = {
        input: 'Pressão no condensador',
        valor: 'Valor', 
        defaultInput: 'Pressure',
        defaultUnit: 'MPa',
        number: '3',
    };
    const specific7 = {
        input: 'Potência da turbina (2º estágio)',
        valor: 'Valor', 
        defaultInput: 'power',
        defaultUnit: 'kW',
        number: '6',
    };
    const specific8 = {
        input: 'Temperatura de reaquecimento',
        valor: 'Valor', 
        defaultInput: 'Temperature',
        defaultUnit: 'Celsius',
        number: '5'
    };
    const specific9 = {
        input: 'Pressão na turbina (1º estágio)',
        valor: 'Valor', 
        defaultInput: 'Pressure',
        defaultUnit: 'MPa',
        number: '1',
    };
    const specific10 = {
        input: 'Temperatura na turbina (1º estágio)',
        valor: 'Valor', 
        defaultInput: 'Temperature',
        defaultUnit: 'Celsius',
        number: '2'
    };
    const specific11 = {
        input: 'Pressão do vapor expandido',
        valor: 'Valor', 
        defaultInput: 'Pressure',
        defaultUnit: 'MPa',
        number: '3',
    };

    const RSI_1 = [specific1, specific2, specific3, specific4];

    const RSI_2 = [specific1, specific2, specific6, specific5];

    const RRI_1 = [specific9, specific10, specific11, specific8, specific3, specific7];


    const PostRequest = async(e) => {
        setResultInfo('loading');
        setReturnApi();

        let returnArray = [];
        if (cycleProperties === 'RSI_1' | cycleProperties === 'RSI_2') {
            returnArray = [return1, return2, return3, return4];
        } else if (cycleProperties === 'RRI_1') {
            returnArray = [return1, return2, return3, return4, return5, return6];
        }
        console.log(returnArray);

        let validInput = false;

        returnArray.forEach(function(item, index){
            if(item.value === undefined) {
                return
            } else {
                validInput = true;
            }
        })
        
        if (validInput === false) {
            alert('Preencha todos os valores de entrada!')
            return;
        }

        let apiData = [cycleType, cycleProperties, fluid, returnArray];

        console.log(apiData);

        let res= await fetch("http://localhost:5000/RankineCycle", {
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify({parcel:apiData})
        });

        let data = await res.json();
        console.log(data);
        setResultInfo('None')
        setReturnApi(data);
    };

    return(
        <C.Container>
            <C.Title>
                {(cycleType === 'RSI') && 
                    <>Rankine Simples (Ideal)</>
                }
                {(cycleType === 'RSR') && 
                    <>Rankine Simples (Real)</>
                }
                {(cycleType === 'RRI') && 
                    <>Rankine com Reaquecimento (Ideal)</>
                }
                {(cycleType === 'RRR') && 
                    <>Rankine com Reaquecimento (Real)</>
                }
            </C.Title>
            <FluidInput setFluid={setFluid} label="Fluido" />
            {(cycleProperties === 'RSI_1') && 
                RSI_1.map((item, index) => (
                    <InputRow
                        key={index}
                        item={item}
                        setReturn1 = {setReturn1}
                        setReturn2 = {setReturn2}                    
                        setReturn3 = {setReturn3}
                        setReturn4 = {setReturn4}
                    />
            ))}
            {(cycleProperties === 'RSI_2') && 
                RSI_2.map((item, index) => (
                    <InputRow
                        key={index}
                        item={item}
                        setReturn1 = {setReturn1}
                        setReturn2 = {setReturn2}                    
                        setReturn3 = {setReturn3}
                        setReturn4 = {setReturn4}
                    />
            ))}
            {(cycleProperties === 'RRI_1') && 
                RRI_1.map((item, index) => (
                    <InputRow
                        key={index}
                        item={item}
                        setReturn1 = {setReturn1}
                        setReturn2 = {setReturn2}                    
                        setReturn3 = {setReturn3}
                        setReturn4 = {setReturn4}
                        setReturn5 = {setReturn5}
                        setReturn6 = {setReturn6}
                    />
            ))}
            <PostButton onClick={PostRequest}/>
        </C.Container>
    );
}