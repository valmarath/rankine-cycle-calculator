const express= require("express");
const Router= express.Router();

Router.post('/RankineCycle', (req, res) => {
    var {parcel} = req.body
    console.log(parcel)
    if(!parcel){
      return res.status(400).send({status:'failed'})
    }
    
    let cycleType = parcel[0];
    let cycleProperties = parcel[1];
    let fluido = parcel[2];
    let input1 = parcel[3].input;
    let valor1 = parcel[3].value;
    let input2 = parcel[4].input;
    let valor2 = parcel[4].value;
    let input3 = parcel[5].input;
    let valor3 = parcel[5].value;
    let trabalho = parcel[6].value;
  
    console.log(cycleType, cycleProperties, fluido, input1, valor1, input2, valor2, input3, valor3)
    // Utilizando script python para obter propriedades
  
    const { spawn } = require('child_process');
    const childPython = spawn('python', ['venv/coolprop.py', fluido, input1, valor1, input2, valor2, input3, valor3]);
  
    childPython.stdout.on('data', (data) => {
      let output = data.toString();
      let outputArray = output.split(" ")
      console.log(outputArray);
      console.log(`stdout: ${outputArray[0]}`);
      let h1 = parseFloat(outputArray[2]);
      let wb = (1/outputArray[1])*(outputArray[4]-outputArray[0]);
      let h2 = parseFloat(outputArray[2]) + parseFloat(wb);
      let h3 = parseFloat(outputArray[5]);
      let s4 = outputArray[6];
      let x4 = (s4 - outputArray[3])/ (outputArray[8] - outputArray[3]);
      let h4 = h1 + (x4*(outputArray[7] - outputArray[2]));
      let vazaoMassica = trabalho / (h3 - h4);
      let qe = vazaoMassica * (h3 - h2);
      let qs = vazaoMassica * (h4 - h1);
      let wLiq = qe - qs;
      let rendimento = wLiq/qe;
    
      let propListFinal = [h1, h2, h3, h4, x4, vazaoMassica, qe, qs, wLiq, rendimento]
      console.log(propListFinal);
      
      res.status(200).json(propListFinal);
    });
  
    childPython.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    childPython.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    });
  
});

module.exports= Router;