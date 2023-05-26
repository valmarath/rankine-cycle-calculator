const express= require("express");
const Router= express.Router();

Router.post('/RankineCycle', (req, res) => {
    var {parcel} = req.body
    if(!parcel){
      return res.status(400).send({status:'failed'})
    }

    // Setting Variables received from the front-end
    let cycleProperties = parcel[1];
    let fluid = parcel[2];
    //console.log(parcel)
    // Making unit conversions
    parcel[3].forEach(function(property) {
      if(property.input == 'Pressure') {
        switch(property.unit) {
          case 'Pa':
            property.value = property.value;
          break;
          case 'kPa':
            property.value = property.value * 1000;
          break;
          case 'MPa':
            property.value = property.value * 1000000;
          break;
          case 'bar':
            property.value = property.value * 100000;
          break;
        };
      } else if (property.input == 'Temperature') {
        switch(property.unit) {
          case '°C':
            property.value = parseInt(property.value) + 273.15;
          break;
          case 'K':
            property.value = property.value;
          break;
        };
      } else if (property.input == 'power') {
        switch(property.unit) {
          case 'W':
            property.value = property.value;
          break;
          case 'kW':
            property.value = property.value * 1000;
          break;
          case 'MW':
            property.value = property.value * 1000000;
          break;
        };
      } else if (property.input == 'Density') {
        switch(property.unit) {
          case 'kg/m³':
            property.value = property.value;
          break;
          case 'g/cm³':
            property.value = property.value * 1000;
          break;
        };
      } else if (property.input == 'flowRate') {
        switch(property.unit) {
          case 'm³/s':
            property.value = property.value;
          break;
          case 'm³/min':
            property.value = property.value/60;
          break;
          case 'L/min':
            property.value = property.value * 0.001;
          break;
        };
      } else if (property.input == 'massFlowRate') {
        switch(property.unit) {
          case 'kg/s':
            property.value = property.value;
          break;
          case 'kg/min':
            property.value = (property.value)/60;
          break;
        };
      }
    })
    //console.log(parcel)
    // Standard inputs
    let input1 = parcel[3][0].input;
    let value1 = parcel[3][0].value;
    let input2 = parcel[3][1].input;
    let value2 = parcel[3][1].value;
    let input3 = parcel[3][2].input;
    let value3 = parcel[3][2].value;
    let input4 = parcel[3][3].input;
    let value4 = parcel[3][3].value;
  
    // Using pyhton script to get properties for each specific case

    if (cycleProperties == 'RSI_1') {
      let value6 = parcel[3][5].value;
      let value7 = parcel[3][6].value;
      let value8 = parcel[3][7].value;

      const { spawn } = require('child_process');
      const childPython = spawn('python', ['coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        //console.log(outputArray);
        //console.log(`stdout: ${outputArray[0]}`);
        let h1 = parseFloat(outputArray[2]);
        let specificVolume1 = parseFloat(1/outputArray[1]);
        let wb = specificVolume1*(outputArray[4]-outputArray[0]);
        let h2 = parseFloat(outputArray[2]) + parseFloat(wb);
        let h3 = parseFloat(outputArray[5]);
        let sl1 = parseFloat(outputArray[3]);
        let s4 = parseFloat(outputArray[6]);
        let x4 = (s4 - outputArray[3])/ (outputArray[8] - outputArray[3]);
        let h4 = h1 + (x4*(outputArray[7] - outputArray[2]));
        let massFlowRate = value4 / (h3 - h4);
        let qe = massFlowRate * (h3 - h2);
        let qs = massFlowRate * (h4 - h1);
        let wbpotencia = massFlowRate * (h2-h1);
        let wLiq = qe - qs;
        let rendimento = (wLiq/qe) * 100;
        let ma = (value8)*value6;
        let ts = ((qs/1000)/(ma*4.18)) + (value7-273.15);
      
        propListFinal = [
          {property: 'Entalpia do estado 1 (h1)', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 1 (s1)', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'Volume específico do fluido no estado 1', value: specificVolume1.toFixed(6), unit: 'm³/kg'},
          {property: 'Entalpia do estado 2 (h2)', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 3 (h3)', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 4 (h4)', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 4 (s4)', value: (s4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Título do estado 4 (x4)', value: x4.toFixed(4), unit: ''},
          {property: 'Vazão mássica do fluido de trabalho', value: massFlowRate.toFixed(4), unit: 'kg/s'},
          {property: 'Potência entregue pela bomba', value: (wbpotencia/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que entra na caldeira', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que sai no condensador', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência líquida do ciclo', value: (wLiq/1000).toFixed(4), unit: 'kW'},
          {property: 'Eficiência térmica do ciclo', value: rendimento.toFixed(4), unit: '%'},
          {property: 'Vazão mássica do fluido de resfriamento', value: (ma).toFixed(4), unit: 'kg/s'},
          {property: 'Temperatura de saída do fluido de resfriamento', value: (ts).toFixed(4), unit: '°C'},
        ]
        if (propListFinal.length == 13) {
          return res.status(200).json(propListFinal);
        }  
      });

      childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        console.log('erro2');
        if (error_count == 0) {
          error_count = 1;
          return res.status(400).json('error');
        }
      });
    
      childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    } else if (cycleProperties == 'RSI_2') {
      const { spawn } = require('child_process');
      const childPython = spawn('python', ['coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        //console.log(outputArray);
        //console.log(`stdoutRSI2: ${outputArray[0]}`);
        let h1 = parseFloat(outputArray[1]);
        let specificVolume1 = parseFloat(1/outputArray[0]);
        let wb = specificVolume1*(value1-value3);
        let h2 = parseFloat(outputArray[1]) + parseFloat(wb);
        let h3 = parseFloat(outputArray[4]);
        let sl1 = parseFloat(outputArray[2]);
        let s4 = parseFloat(outputArray[5]);
        let x4 = (s4 - outputArray[2])/ (outputArray[7] - outputArray[2]);
        let h4 = h1 + (x4*(outputArray[6] - outputArray[1]));
        let massFlowRate = value4 / ((h3 - h4) - (h2 - h1));
        let qe = massFlowRate * (h3 - h2);
        let qs = massFlowRate * (h4 - h1);
        let wt = massFlowRate * (h3 - h4);
        let wbpotencia = massFlowRate * (h2-h1);
        let wLiq = qe - qs;
        let rendimento = (wLiq/qe) * 100;
      
        propListFinal = [
          {property: 'Entalpia do estado 1 (h1)', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 1 (s1)', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'Volume Específico (estado 1)', value: specificVolume1.toFixed(6), unit: 'm³/kg'},
          {property: 'Entalpia do estado 2 (h2)', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 3 (h3)', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 4 (h4)', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 4 (s4)', value: (s4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Título do estado 4 (x4)', value: x4.toFixed(4), unit: ''},
          {property: 'Vazão mássica do fluido de trabalho', value: massFlowRate.toFixed(4), unit: 'kg/s'},
          {property: 'Potência produzida pela turbina', value: (wt/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência entregue pela bomba', value: (wbpotencia/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que entra na caldeira', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que sai no condensador', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'Eficiência térmica do ciclo', value: rendimento.toFixed(4), unit: '%'},
        ]
        if (propListFinal.length == 11 ) {
          return res.status(200).json(propListFinal);
        }  
      });

      childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        console.log('erro2');
        if (error_count == 0) {
          error_count = 1;
          return res.status(400).json('error');
        }
      });
    
      childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    } else if (cycleProperties == 'RRI_1') {
      let input5 = parcel[3][4].input;
      let value5 = parcel[3][4].value;
      let unit5 = parcel[3][4].unit;
      let input6 = parcel[3][5].input;
      let value6 = parcel[3][5].value;
      let unit6 = parcel[3][5].unit;

      const { spawn } = require('child_process');
      const childPython = spawn('python', ['coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3, input4, value4, input5, value5]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        //console.log(outputArray);

        let p1 = parseFloat(outputArray[0]);
        let specificVolume1 = parseFloat(1/outputArray[1]);
        let h1 = parseFloat(outputArray[2]);
        let hv1 = parseFloat(outputArray[3]);
        let sl1 = parseFloat(outputArray[4]);
        let sv1 = parseFloat(outputArray[5]);
        let wb = specificVolume1*(value1-p1);
        let h2 = parseFloat(h1) + parseFloat(wb);
        let h3 = parseFloat(outputArray[6]);
        let s3 = parseFloat(outputArray[7]);
        let h4 = '';
        let hl4 = parseFloat(outputArray[8]);
        let hv4 = parseFloat(outputArray[9]);
        let h4s3 = parseFloat(outputArray[10]);
        let sl4 = parseFloat(outputArray[11]);
        let sv4 = parseFloat(outputArray[12]);
        if (s3 > sv4) {
          h4 = h4s3;
        } else {
          let x4 = (s3 - sl4)/(sv4-sl4);
          h4=hl4+(x4*(hv4-hl4));
        }
        let h5 = parseFloat(outputArray[13]);
        let s5 = parseFloat(outputArray[14]);
        let h6 = ''; 
        if (sv1 > s5) {
          let x6 = (s5 - sl1)/(sv1-sl1);
          h6=h1+(x6*(hv1-h1));
        } else {
          h6=parseFloat(outputArray[15]);
        }
        let massFlowRate = value6 / ((h5 - h6));
        let qe = massFlowRate * (h3 - h2);
        let qr = massFlowRate * (h5 - h4);
        let qt = qe + qr;
        let qs = massFlowRate * (h6 - h1);
        let WB = wb*massFlowRate;
        let wb1 = massFlowRate * (h3 - h4);
        let wsai = wb1 + value6;
        let wLiq = wsai - WB;
        let ηt = (wLiq/qt) * 100;
      
        propListFinal = [
          {property: 'Entalpia do estado 1 (h1)', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 2 (h2)', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 3 (h3)', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 3 (s3)', value: (s3/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 4 (h4)', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 5 (h5)', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 5 (s5)', value: (s5/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 6 (h6)', value: (h6/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv1', value: (sv1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sl4', value: (sl4/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv4', value: (sv4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Vazão mássica do fluido de trabalho', value: massFlowRate.toFixed(4), unit: 'kg/s'},
          {property: 'Potência produzida pela primeira turbina', value: (wb1/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência produzida pelo ciclo', value: (wsai/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência entregue pela bomba', value: (WB/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que entra na caldeira', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor de reaquecimento', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor total fornecido para o ciclo', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor rejeitado pelo ciclo', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência líquida do ciclo', value: (wLiq/1000).toFixed(4), unit: 'kW'},
          {property: 'Eficiência térmica do ciclo', value: ηt.toFixed(4), unit: '%'},
        ]
        if (propListFinal.length == 16 ) {
          return res.status(200).json(propListFinal);
        }  
      });

      childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        console.log('erro2');
        if (error_count == 0) {
          error_count = 1;
          return res.status(400).json('error');
        }
      });
    
      childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

    } else if (cycleProperties == 'RRI_2') {
      let input5 = parcel[3][4].input;
      let value5 = parcel[3][4].value;
      let unit5 = parcel[3][4].unit;
      let input6 = parcel[3][5].input;
      let value6 = parcel[3][5].value;
      let unit6 = parcel[3][5].unit;

      const { spawn } = require('child_process');
      const childPython = spawn('python', ['coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3, input4, value4, input5, value5]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        //console.log(outputArray);

        let p1 = parseFloat(outputArray[0]);
        let specificVolume1 = parseFloat(1/outputArray[1]);
        let h1 = parseFloat(outputArray[2]);
        let hv1 = parseFloat(outputArray[3]);
        let sl1 = parseFloat(outputArray[4]);
        let sv1 = parseFloat(outputArray[5]);
        let wb = specificVolume1*(value1-p1);
        let h2 = parseFloat(h1) + parseFloat(wb);
        let h3 = parseFloat(outputArray[6]);
        let s3 = parseFloat(outputArray[7]);
        let h4 = '';
        let hl4 = parseFloat(outputArray[8]);
        let hv4 = parseFloat(outputArray[9]);
        let h4s3 = parseFloat(outputArray[10]);
        let sl4 = parseFloat(outputArray[11]);
        let sv4 = parseFloat(outputArray[12]);
        if (s3 > sv4) {
          h4 = h4s3;
        } else {
          let x4 = (s3 - sl4)/(sv4-sl4);
          h4=hl4+(x4*(hv4-hl4));
        }
        let h5 = parseFloat(outputArray[13]);
        let s5 = parseFloat(outputArray[14]);
        let h6 = ''; 
        if (sv1 > s5) {
          let x6 = (s5 - sl1)/(sv1-sl1);
          h6=h1+(x6*(hv1-h1));
        } else {
          h6=parseFloat(outputArray[15]);
        }
        let massFlowRate = value6 / ((h3 - h4)+(h5 - h6)-wb);
        let qe = massFlowRate * (h3 - h2);
        let qr = massFlowRate * (h5 - h4);
        let qt = qe + qr;
        let qs = massFlowRate * (h6 - h1);
        let wb1 = massFlowRate * (h3 - h4);
        let wb2 = massFlowRate * (h5 - h6);
        let wsai = wb1 + wb2;
        let WB = wb*massFlowRate;
        let ηt = (value6/qt) * 100;
      
        propListFinal = [
          {property: 'Entalpia do estado 1 (h1)', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 2 (h2)', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 3 (h3)', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 3 (s3)', value: (s3/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 4 (h4)', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 5 (h5)', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 5 (s5)', value: (s5/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 6 (h6)', value: (h6/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv1', value: (sv1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sl4', value: (sl4/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv4', value: (sv4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Vazão mássica do fluido de trabalho', value: massFlowRate.toFixed(4), unit: 'kg/s'},
          {property: 'Potência produzida pela primeira turbina', value: (wb1/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência produzida pela segunda turbina', value: (wb2/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência produzida pelo ciclo', value: (wsai/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência entregue pela bomba', value: (WB/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que entra na caldeira', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor de reaquecimento', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor total fornecido para o ciclo', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor rejeitado pelo ciclo', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'Eficiência térmica do ciclo', value: ηt.toFixed(4), unit: '%'},
        ]
        if (propListFinal.length == 16 ) {
          return res.status(200).json(propListFinal);
        }  
      });

      childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        console.log('erro2');
        if (error_count == 0) {
          error_count = 1;
          return res.status(400).json('error');
        }
      });
    
      childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

    } else if (cycleProperties == 'RRR_1') {
      let input5 = parcel[3][4].input;
      let value5 = parcel[3][4].value;
      let unit5 = parcel[3][4].unit;
      let input6 = parcel[3][5].input;
      let value6 = parcel[3][5].value;
      let unit6 = parcel[3][5].unit;
      let input7 = parcel[3][6].input;
      let value7 = parcel[3][6].value;
      let unit7 = parcel[3][6].unit;
      let input8 = parcel[3][7].input;
      let value8 = parcel[3][7].value;
      let unit8 = parcel[3][7].unit;
      let input9 = parcel[3][8].input;
      let value9 = parcel[3][8].value;
      let unit9 = parcel[3][8].unit;
      let input10 = parcel[3][9].input;
      let value10 = parcel[3][9].value;
      let unit10 = parcel[3][9].unit;
      let input11 = parcel[3][10].input;
      let value11 = parcel[3][10].value;
      let unit11 = parcel[3][10].unit;
      let input12 = parcel[3][11].input;
      let value12 = parcel[3][11].value;
      let unit12 = parcel[3][11].unit;

      const { spawn } = require('child_process');
      const childPython = spawn('python', ['coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3, input4, value4, input5, value5, input7, value7, value8]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        //console.log(outputArray);

        let p1 = parseFloat(outputArray[0]);
        let specificVolume1 = parseFloat(1/outputArray[1]);
        let h1 = parseFloat(outputArray[2]);
        let hv1 = parseFloat(outputArray[3]);
        let sl1 = parseFloat(outputArray[4]);
        let sv1 = parseFloat(outputArray[5]);
        let wb = specificVolume1*(value1-p1);
        let h2 = parseFloat(h1) + parseFloat(wb);
        let h3 = parseFloat(outputArray[6]);
        let s3 = parseFloat(outputArray[7]);
        let h4s = '';
        let hl4s = parseFloat(outputArray[8]);
        let hv4s = parseFloat(outputArray[9]);
        let h4s3s = parseFloat(outputArray[10]);
        let sl4s = parseFloat(outputArray[11]);
        let sv4s = parseFloat(outputArray[12]);
        let h4r = parseFloat(outputArray[16]);
        if (s3 > sv4s) {
          h4s = h4s3s;
        } else {
          let x4s = (s3 - sl4s)/(sv4s-sl4s);
          h4s=hl4s+(x4s*(hv4s-hl4s));
        }
        let h5 = parseFloat(outputArray[13]);
        let s5 = parseFloat(outputArray[14]);
        let h6s = parseFloat(outputArray[15]); 
        let h6r = parseFloat(outputArray[17]);
        let t6r = parseFloat(outputArray[18])-273.15;
        //console.log(t6r)
        let massFlowRate = value6 / ((h3-h4r) + (h5 - h6r) - (h2-h1));
        let ηt1 = (h3 - h4r)/(h3 - h4s);
        let qs = massFlowRate * (h6r - h1);
        let qe = massFlowRate * (h3-h2);
        let qr = massFlowRate * (h5-h4r);
        let qt = qe + qr;
        let wb1 = massFlowRate * (h3 - h4r);
        let wb2 = massFlowRate * (h5 - h6r);
        let wsai = wb1 + wb2;
        let WB = massFlowRate * wb;
        let ηt = value6 / qt;
        let ma = (value12)*value10;
        let ts = ((qs/1000)/(ma*4.18)) + (value11-273.15);
        
        propListFinal = [
          {property: 'Entalpia do estado 1 (h1)', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 2 (h2)', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 3 (h3)', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 3 (s3)', value: (s3/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 4s (h4s)', value: (h4s/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 4r (h4r)', value: (h4r/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 5 (h5)', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 5 (s5)', value: (s5/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 6s (h6s)', value: (h6s/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 6r (h6r)', value: (h6r/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv1', value: (sv1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sl4', value: (sl4s/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv4', value: (sv4s/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Vazão mássica do fluido de trabalho', value: massFlowRate.toFixed(4), unit: 'kg/s'},
          {property: 'Potência produzida pela primeira turbina', value: (wb1/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento da primeira turbina', value: (ηt1*100).toFixed(4), unit: '%'},
          {property: 'Potência produzida pela segunda turbina', value: (wb2/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência produzida pelo ciclo', value: (wsai/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência entregue pela bomba', value: (WB/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que entra na caldeira', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor de reaquecimento', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor total fornecido para o ciclo', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor rejeitado pelo ciclo', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'Eficiência térmica do ciclo', value: (ηt*100).toFixed(4), unit: '%'},
          {property: 'Vazão mássica do fluido de resfriamento', value: (ma).toFixed(4), unit: 'kg/s'},
          {property: 'Temperatura de saída do fluido de resfriamento', value: (ts).toFixed(4), unit: '°C'},
          {property: 'Temperatura do vapor na saída do segundo estágio da turbina', value: (t6r).toFixed(4), unit: '°C'}
        ]
        if (propListFinal.length == 22) {
          return res.status(200).json(propListFinal);
        }  
      });

      childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        console.log('erro2');
        if (error_count == 0) {
          error_count = 1;
          return res.status(400).json('error');
        }
      });
    
      childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

    } else if (cycleProperties == 'RRR_2') {
      let input5 = parcel[3][4].input;
      let value5 = parcel[3][4].value;
      let unit5 = parcel[3][4].unit;
      let input6 = parcel[3][5].input;
      let value6 = parcel[3][5].value;
      let unit6 = parcel[3][5].unit;
      let input7 = parcel[3][6].input;
      let value7 = parcel[3][6].value;
      let unit7 = parcel[3][6].unit;
      let input8 = parcel[3][7].input;
      let value8 = parcel[3][7].value;


      const { spawn } = require('child_process');
      const childPython = spawn('python', ['coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3, input4, value4, input5, value5, input7, value7]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        //console.log(outputArray);

        let wt2 = parseFloat(value6);
        let massFlowRate = parseFloat(value8);
        let p1 = parseFloat(outputArray[0]);
        let specificVolume1 = parseFloat(1/outputArray[1]);
        let h1 = parseFloat(outputArray[2]);
        let hv1 = parseFloat(outputArray[3]);
        let sl1 = parseFloat(outputArray[4]);
        let sv1 = parseFloat(outputArray[5]);
        let wb = specificVolume1*(value1-p1);
        let h2 = parseFloat(h1) + parseFloat(wb);
        let h3 = parseFloat(outputArray[6]);
        let s3 = parseFloat(outputArray[7]);
        let h4s = '';
        let hl4s = parseFloat(outputArray[8]);
        let hv4s = parseFloat(outputArray[9]);
        let h4s3s = parseFloat(outputArray[10]);
        let sl4s = parseFloat(outputArray[11]);
        let sv4s = parseFloat(outputArray[12]);
        let h4r = parseFloat(outputArray[16]);
        if (s3 > sv4s) {
          h4s = h4s3s;
        } else {
          let x4s = (s3 - sl4s)/(sv4s-sl4s);
          h4s=hl4s+(x4s*(hv4s-hl4s));
        }
        let h5 = parseFloat(outputArray[13]);
        let s5 = parseFloat(outputArray[14]);
        let h6s = parseFloat(outputArray[15]); 
        //console.log(wt2)
        let h6r = h5-(wt2/massFlowRate);
        let ηt1 = (h3 - h4r)/(h3 - h4s);
        let ηt2 = (h5 - h6r)/(h5 - h6s);
        let wt1 = massFlowRate*(h3-h4r);
        let wsai = wt1 + wt2;
        let WB = massFlowRate * wb;
        let qs = massFlowRate * (h6r - h1);
        let qe = massFlowRate * (h3-h2);
        let qr = massFlowRate * (h5-h4r);
        let qt = qe + qr;
        let wliq = wt1 + wt2 - wb;
        let ηt = wliq/qt;
        
        propListFinal = [
          {property: 'Entalpia do estado 1 (h1)', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 2 (h2)', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 3 (h3)', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 3 (s3)', value: (s3/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 4s (h4s)', value: (h4s/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 4r (h4r)', value: (h4r/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 5 (h5)', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Entropia do estado 5 (s5)', value: (s5/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Entalpia do estado 6s (h6s)', value: (h6s/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Entalpia do estado 6r (h6r)', value: (h6r/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv1', value: (sv1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sl4', value: (sl4s/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 'sv4', value: (sv4s/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Potência produzida pela primeira turbina', value: (wt1/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento da primeira turbina', value: (ηt1*100).toFixed(4), unit: '%'},
          {property: 'Rendimento da segunda turbina', value: (ηt2*100).toFixed(4), unit: '%'},
          {property: 'Potência produzida pelo ciclo', value: (wsai/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência entregue pela bomba', value: (WB/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor que entra na caldeira', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor de reaquecimento', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor total fornecido para o ciclo', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'Taxa de calor rejeitado pelo ciclo', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'Potência líquida do ciclo', value: (wliq/1000).toFixed(4), unit: 'kW'},
          {property: 'Eficiência térmica do ciclo', value: (ηt*100).toFixed(4), unit: '%'},
        ]
        if (propListFinal.length == 19) {
          return res.status(200).json(propListFinal);
        }  
      });

      childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        console.log('erro2');
        if (error_count == 0) {
          error_count = 1;
          return res.status(400).json('error');
        }
      });
    
      childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

    }
   
});

module.exports= Router;