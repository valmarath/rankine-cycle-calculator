import * as C from './styles';
import { useState, useEffect } from 'react';

import { FluidInput } from '../FluidInput';
import { InputType } from '../InputType';
import { InputValue } from '../InputValue';
import { InputUnit } from '../Unit';



export const InputRow = ( {item, setReturn1, setReturn2, setReturn3, setReturn4, setReturn5, setReturn6, setReturn7, setReturn8, setReturn9, setReturn10, setReturn11, setReturn12} ) => {

    const [inputValue, setInputValue] = useState();
    const [isShown, setIsShown] = useState(false);
    const [inputUnit, setInputUnit] = useState(item.defaultUnit)

    const inputType = item.defaultInput;

    useEffect(() => {
        if (inputType === 'Temperature' || inputType === 'Pressure' || inputType === 'power' || inputType === 'Efficiency' || inputType === 'Density' || inputType === 'flowRate' || inputType === 'massFlowRate') {
            setIsShown(true);
        } else {
            setIsShown(false);
        }
        //console.log(inputValue);
        if(item.number === '1') {
            setReturn1(createData)
        } else if (item.number === '2'){
            setReturn2(createData)
        } else if (item.number === '3') {
            setReturn3(createData)
        } else if (item.number === '4'){
            setReturn4(createData)
        } else if (item.number === '5'){
            setReturn5(createData)
        } else if (item.number === '6'){
            setReturn6(createData)
        } else if (item.number === '7'){
            setReturn7(createData)
        } else if (item.number === '8'){
            setReturn8(createData)
        } else if (item.number === '9'){
            if (inputValue === undefined) {
                setInputValue('Water');
            }
            setReturn9(createData)
        } else if (item.number === '10'){
            setReturn10(createData)
        } else if (item.number === '11'){
            setReturn11(createData)
        } else if (item.number === '12'){
            setReturn12(createData)
        }
    }, [inputType, inputUnit, inputValue]);

    const createData = {
        input: inputType,
        value: inputValue,
        unit: inputUnit,
        number: item.number
    };

    return (
        <C.Container>
            {item.defaultInput === 'fluid' &&
                <FluidInput setFluid={setInputValue} label="Fluido" fluidType="cooling" />
            }
            {item.defaultInput !== 'fluid' &&
            <>
                <InputType label={item.input} defaultValue = {item.defaultInput} />
                <InputValue setInputValue={setInputValue} label={item.valor} />
                <InputUnit setInputUnit={setInputUnit} label="Unidade" inputType={inputType} visible={isShown} />
            </>
            }
        </C.Container>
    )
}