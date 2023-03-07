const express= require("express");
const Router= express.Router();

Router.post('/RankineCycle', (req, res) => {
    var {parcel} = req.body
    console.log(parcel)
    if(!parcel){
      return res.status(400).send({status:'failed'})
    }

    // Setting Variables received from the front-end
    let cycleType = parcel[0];
    let cycleProperties = parcel[1];
    let fluid = parcel[2];

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
          case 'Celsius':
            property.value = parseInt(property.value) + 273.15;
          break;
          case 'Kelvin':
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
      }
    })

    let input1 = parcel[3][0].input;
    let value1 = parcel[3][0].value;
    let unit1 = parcel[3][0].unit;
    let input2 = parcel[3][1].input;
    let value2 = parcel[3][1].value;
    let unit2 = parcel[3][1].unit;
    let input3 = parcel[3][2].input;
    let value3 = parcel[3][2].value;
    let unit3 = parcel[3][2].unit;
    let input4 = parcel[3][3].input;
    let value4 = parcel[3][3].value;
    let unit4 = parcel[3][3].unit;
  
    // Using pyhton script to get properties

    if (cycleProperties == 'RSI_1') {
      const { spawn } = require('child_process');
      const childPython = spawn('python', ['venv/coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        console.log(outputArray);
        console.log(`stdout: ${outputArray[0]}`);
        let h1 = parseFloat(outputArray[2]);
        let specificVolume1 = parseFloat(1/outputArray[1]);
        let wb = specificVolume1*(outputArray[4]-outputArray[0]);
        let h2 = parseFloat(outputArray[2]) + parseFloat(wb);
        let h3 = parseFloat(outputArray[5]);
        let sl1 = parseFloat(outputArray[3]);
        let s4 = parseFloat(outputArray[6]);
        let x4 = (s4 - outputArray[3])/ (outputArray[8] - outputArray[3]);
        let h4 = h1 + (x4*(outputArray[7] - outputArray[2]));
        let vazaoMassica = value4 / (h3 - h4);
        let qe = vazaoMassica * (h3 - h2);
        let qs = vazaoMassica * (h4 - h1);
        let wLiq = qe - qs;
        let rendimento = (wLiq/qe) * 100;
      
        propListFinal = [
          {property: 'h1', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h2', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h3', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h4', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Título estado 4', value: x4.toFixed(4), unit: ''},
          {property: 'Vazão Mássica', value: vazaoMassica.toFixed(4), unit: 'kg/s'},
          {property: 'qe', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'qs', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'wLiq', value: (wLiq/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento', value: rendimento.toFixed(4), unit: '%'},
          {property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 's4', value: (s4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Volume Específico (estado 1)', value: specificVolume1.toFixed(6), unit: 'm3/kg'},
        ]
        if (propListFinal.length == 13 ) {
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
      const childPython = spawn('python', ['venv/coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        console.log(outputArray);
        console.log(`stdoutRSI2: ${outputArray[0]}`);
        let h1 = parseFloat(outputArray[1]);
        let specificVolume1 = parseFloat(1/outputArray[0]);
        let wb = specificVolume1*(value1-value3);
        let h2 = parseFloat(outputArray[1]) + parseFloat(wb);
        let h3 = parseFloat(outputArray[4]);
        let sl1 = parseFloat(outputArray[2]);
        let s4 = parseFloat(outputArray[5]);
        let x4 = (s4 - outputArray[2])/ (outputArray[7] - outputArray[2]);
        let h4 = h1 + (x4*(outputArray[6] - outputArray[1]));
        let vazaoMassica = value4 / ((h3 - h4) - (h2 - h1));
        let qe = vazaoMassica * (h3 - h2);
        let qs = vazaoMassica * (h4 - h1);
        let wLiq = qe - qs;
        let rendimento = (wLiq/qe) * 100;
      
        propListFinal = [
          {property: 'h1', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h2', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h3', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h4', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Título estado 4', value: x4.toFixed(4), unit: ''},
          {property: 'Vazão Mássica', value: vazaoMassica.toFixed(4), unit: 'kg/s'},
          {property: 'qe', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'qs', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'wLiq', value: (wLiq/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento', value: rendimento.toFixed(4), unit: '%'},
          {property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 's4', value: (s4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Volume Específico (estado 1)', value: specificVolume1.toFixed(6), unit: 'm3/kg'},
        ]
        if (propListFinal.length == 13 ) {
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
      const childPython = spawn('python', ['venv/coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3, input4, value4, input5, value5]);
    
      let propListFinal = '';
      let error_count = 0;

      childPython.stdout.on('data', (data) => {
        let output = data.toString();
        let outputArray = output.split(" ")
        console.log(outputArray);

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
        let sl4 = parseFloat(outputArray[10]);
        let sv4 = parseFloat(outputArray[11]);
        if (s3 > sv4) {
          h4 = hv4
        } else {
          console.log('Ajustar, o que fazer neste caso?')
        }
        let h5 = parseFloat(outputArray[12]);
        let s5 = parseFloat(outputArray[13]);
        let h6 = ''; 
        if (sv1 > s5) {
          let x6 = (s5 - sl1)/(sv1-sl1);
          h6=h1+(x6*(hv1-h1));
        } else {
          console.log('Ajustar, o que fazer neste caso?')
        }
        let vazaoMassica = value6 / ((h5 - h6));
        let qe = vazaoMassica * (h3 - h2);
        let qr = vazaoMassica * (h5 - h4);
        let qt = qe + qr;
        let WB = wb*vazaoMassica;
        let wb1 = vazaoMassica * (h3 - h4);
        let wLiq = wb1 + value6 - WB;
        let rendimento = (wLiq/qt) * 100;
      
        propListFinal = [
          {property: 'h1', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h2', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h3', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h4', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h5', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h6', value: (h6/1000).toFixed(4), unit: 'kJ/kg'},
          //{property: 'Título estado 4', value: x4.toFixed(4), unit: ''},
          {property: 'Vazão Mássica', value: vazaoMassica.toFixed(4), unit: 'kg/s'},
          {property: 'qe', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'qr', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'qt', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'wLiq', value: (wLiq/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento', value: rendimento.toFixed(4), unit: '%'},
          {property: 'sl1', value: (sl1/1000).toFixed(4), unit: 'kJ/kgK'},
          //{property: 's4', value: (s4/1000).toFixed(4), unit: 'kJ/kgK'},
          {property: 'Volume Específico (estado 1)', value: specificVolume1.toFixed(6), unit: 'm3/kg'},
        ]
        if (propListFinal.length == 14 ) {
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