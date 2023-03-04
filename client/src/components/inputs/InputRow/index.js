import * as C from './styles';
import { useState, useEffect } from 'react';

import { InputType } from '../InputType';
import { InputValue } from '../InputValue';
import { InputUnit } from '../Unit';


export const InputRow = ( {item, setReturn1, setReturn2, setReturn3, setReturn4} ) => {

    const [inputValue, setInputValue] = useState();
    const [isShown, setIsShown] = useState(false);
    const [inputUnit, setInputUnit] = useState(item.defaultUnit)

    const inputType = item.defaultInput;

    useEffect(() => {
        if (inputType === 'Temperature' || inputType === 'Pressure' || inputType === 'power') {
            setIsShown(true);
        } else {
            setIsShown(false);
        }
        //console.log(isShown, inputType, inputUnit, inputValue);
        if(item.number === '1') {
            setReturn1(createData)
        } else if (item.number === '2'){
            setReturn2(createData)
            console.log(createData.value)
        } else if (item.number === '3') {
            setReturn3(createData)
        } else if (item.number === '4'){
            setReturn4(createData)
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
            <InputType label={item.input} defaultValue = {item.defaultInput} />
            <InputValue setInputValue={setInputValue} label={item.valor} />
            <InputUnit setInputUnit={setInputUnit} label="Unidade" inputType={inputType} visible={isShown} />
        </C.Container>
    )
}