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
  
    console.log(cycleType, cycleProperties, fluid, input1, value1, input2, value2, input3, value3, value4)
    // Utilizando script python para obter propriedades
  
    const { spawn } = require('child_process');
    const childPython = spawn('python', ['venv/coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3]);
  
    let propListFinal = '';
    let error_count = 0;

    if (cycleProperties == 'RSI_1') {
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
    }
  
});

module.exports= Router;