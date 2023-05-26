import * as C from './styles';

export const InputUnit = ( {setInputUnit, label, inputType, visible} ) => {

    return (
        <C.Container visible={visible}>
            <C.Label>
                {label}
            </C.Label>
            {inputType === 'Pressure' &&
                <C.Select defaultValue="MPa"  onChange={e => setInputUnit(e.target.value)}>
                    <option value="Pa">Pa</option>
                    <option value="kPa">kPa</option>
                    <option value="MPa">MPa</option>
                    <option value="bar">bar</option>
                </C.Select>
            }
            {inputType === 'Temperature' &&
                <C.Select defaultValue="°C"  onChange={e => setInputUnit(e.target.value)}>
                    <option value="°C">°C</option>
                    <option value="K">K</option>
                </C.Select>
            }
            {inputType === 'power' &&
                <C.Select defaultValue="MW"  onChange={e => setInputUnit(e.target.value)}>
                    <option value="W">W</option>
                    <option value="kW">kW</option>
                    <option value="MW">MW</option>
                </C.Select>
            }
            {inputType === 'Efficiency' &&
                <C.Select defaultValue="%"  onChange={e => setInputUnit(e.target.value)}>
                    <option value="%">%</option>
                </C.Select>
            }
            {inputType === 'Density' &&
                <C.Select defaultValue="kg/m³" onChange={e => setInputUnit(e.target.value)}>
                    <option value="kg/m³">kg/m³</option>
                    <option value="g/cm³">g/cm³</option>
                </C.Select>
            }
            {inputType === 'flowRate' &&
                <C.Select defaultValue="m³/s" onChange={e => setInputUnit(e.target.value)}>
                    <option value="m³/s">m³/s</option>
                    <option value="m³/min">m³/min</option>
                    <option value="L/min">L/min</option>
                </C.Select>
            }
            {inputType === 'massFlowRate' &&
                <C.Select defaultValue="kg/s" onChange={e => setInputUnit(e.target.value)}>
                    <option value="kg/s">kg/s</option>
                    <option value="kg/min">kg/min</option>
                </C.Select>
            }
        </C.Container>
    )
}