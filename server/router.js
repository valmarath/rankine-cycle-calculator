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
          case 'm³/min':
            property.value = property.value;
          break;
          case 'L/min':
            property.value = property.value * 0.001;
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
        let vazaoMassica = value6 / ((h5 - h6));
        let qe = vazaoMassica * (h3 - h2);
        let qr = vazaoMassica * (h5 - h4);
        let qt = qe + qr;
        let qs = vazaoMassica * (h6 - h1);
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
          {property: 'Vazão Mássica', value: vazaoMassica.toFixed(4), unit: 'kg/s'},
          {property: 'qe', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'qr', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'qt', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'qs', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'wLiq', value: (wLiq/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento', value: rendimento.toFixed(4), unit: '%'},
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

    } else if (cycleProperties == 'RRI_2') {
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
        let vazaoMassica = value6 / ((h3 - h4)+(h5 - h6)-wb);
        let qe = vazaoMassica * (h3 - h2);
        let qr = vazaoMassica * (h5 - h4);
        let qt = qe + qr;
        let qs = vazaoMassica * (h6 - h1);
        let wb1 = vazaoMassica * (h3 - h4);
        let rendimento = (value6/qt) * 100;
      
        propListFinal = [
          {property: 'h1', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h2', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h3', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h4', value: (h4/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h5', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h6', value: (h6/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Vazão Mássica', value: vazaoMassica.toFixed(4), unit: 'kg/s'},
          {property: 'qe', value: (qe/1000).toFixed(4), unit: 'kW'},
          {property: 'qr', value: (qr/1000).toFixed(4), unit: 'kW'},
          {property: 'qt', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'qs', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'wb1', value: (wb1/1000).toFixed(4), unit: 'kW'},
          {property: 'Rendimento', value: rendimento.toFixed(4), unit: '%'},
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
      const childPython = spawn('python', ['venv/coolprop.py', cycleProperties, fluid, input1, value1, input2, value2, input3, value3, input4, value4, input5, value5, input7, value7, value8]);
    
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
        console.log(t6r)
        let vazaoMassica = value6 / ((h3-h4r) + (h5 - h6r) - (h2-h1));
        let ηt1 = (h3 - h4r)/(h3 - h4s);
        let qt = vazaoMassica * ((h3-h2)+(h5-h4r));
        let ηt = value6 / qt;
        let qs = vazaoMassica * (h6r - h1);
        ma = (value12/60)*value10;
        ts = ((qs/1000)/(ma*4.18)) + (value11-273.15);
        
        propListFinal = [
          {property: 'h1', value: (h1/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h2', value: (h2/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h3', value: (h3/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h4s', value: (h4s/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h4r', value: (h4r/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h5', value: (h5/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h6s', value: (h6s/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'h6r', value: (h6r/1000).toFixed(4), unit: 'kJ/kg'},
          {property: 'Vazão Mássica', value: vazaoMassica.toFixed(4), unit: 'kg/s'},
          {property: 'ηt1', value: (ηt1*100).toFixed(4), unit: '%'},
          {property: 'ηt', value: (ηt*100).toFixed(4), unit: '%'},
          {property: 'qt', value: (qt/1000).toFixed(4), unit: 'kW'},
          {property: 'qs', value: (qs/1000).toFixed(4), unit: 'kW'},
          {property: 'ma', value: (ma).toFixed(4), unit: 'kg/s'},
          {property: 'ts', value: (ts).toFixed(4), unit: 'Celsius'},
          {property: 't6r', value: (t6r).toFixed(4), unit: 'Celsius'},

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

    }
  
});

module.exports= Router;