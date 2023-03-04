import React from 'react';
import { useState, useEffect } from 'react';

import * as C from './styles';

export const ResultItem = ( {index, item} ) => {

    
    const [value, setValue] = useState(item.value);
    const [unit, setUnit] = useState(item.unit);

    useEffect(() => {
        if (unit === 'J/kg' | unit === 'J/kgK' | unit === 'W') {
            setValue(item.value*1000);
        }
        else if (unit === 'kJ/kg' | unit === 'kJ/kgK' | unit === 'kW') {
            setValue(item.value);
        }
        else if (unit === 'MW') {
            setValue(item.value/1000);
        }
      }, [item.value, unit]);


    return(
        <C.Container>
            <C.Title>
                {item.property}:
            </C.Title>
            <C.Results>
                {value.toString().replace('.', ',')}
            </C.Results>
            {item.unit === 'kJ/kg' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="J/kg">J/kg</option>
                    <option value="kJ/kg">kJ/kg</option>
                </C.Unit>
            }
            {item.unit === 'kJ/kgK' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="J/kgK">J/kgK</option>
                    <option value="kJ/kgK">kJ/kgK</option>
                </C.Unit>
            }
            {item.unit === 'kW' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="W">W</option>
                    <option value="kW">kW</option>
                    <option value="MW">MW</option>
                </C.Unit>
            }
            {item.unit === '' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="">Sem Unidade</option>
                </C.Unit>
            }
            {item.unit === 'kg/s' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="kg/s">kg/s</option>
                </C.Unit>
            }
            {item.unit === '%' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="%">%</option>
                </C.Unit>
            }
            {item.unit === 'm3/kg' &&
                <C.Unit defaultValue={item.unit} onChange={e => setUnit(e.target.value)}>
                    <option value="m3/kg">m3/kg</option>
                </C.Unit>
            }
        </C.Container>
    );
}