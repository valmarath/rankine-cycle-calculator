import { useEffect, useRef, useState } from 'react';
import * as C from './App.styles';

import headerImage from './svg/logo3.png';
import settingsImage from './svg/settings30.png';

import './App.css';
import { CycleContainer } from './components/CycleContainer';
import { CycleSelector } from './components/CycleSelector';
import { Result } from './components/results';

const App = () => {

  const [returnApi, setReturnApi] = useState();
  const [cycle, setCycle] = useState('first');
  const [layout, setLayout] = useState(false);
  const [resultInfo, setResultInfo] = useState('None');
  const resultFocusRef = useRef(null);


  useEffect(() => {
    console.log(typeof returnApi);
    if (typeof returnApi === 'object') {
      resultFocusRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  }, [returnApi]);

  const handleChangeCycle = () => {
    if(cycle !== 'first'){
      setLayout((current) => !current)
    }
  }

  return (
    <C.Container>
      <C.HeaderArea>
        <C.HeaderImg>
          <C.ChangeCycle onClick={handleChangeCycle}>
          <img src={settingsImage} alt="thermodynamics calculator logo" height={40} />
          </C.ChangeCycle>
          <img src={headerImage} alt="thermodynamics calculator logo" height={40} />
        </C.HeaderImg>
      </C.HeaderArea>
      {(layout === false) &&
      <CycleSelector setReturnApi={setReturnApi} cycle={cycle} setCycle={setCycle} setLayout={setLayout}/>
      }
      {(layout === true) &&
      <C.CalcCycle>
        <C.InputSide>
          <CycleContainer setReturnApi={setReturnApi} cycleType={cycle.cycleType} cycleProperties={cycle.property} setResultInfo={setResultInfo} />
        </C.InputSide>
        <C.ResultSide ref={resultFocusRef}>
          <Result data={returnApi} resultInfo={resultInfo} />
        </C.ResultSide>
      </C.CalcCycle>
      }
    </C.Container>
  );
}

export default App;
