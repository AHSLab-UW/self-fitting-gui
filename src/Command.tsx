import * as math from "mathjs";
import { Coordinates} from "./components/Grid";
// import { gainToString } from "./components/Grid";

var overallGain = new math.Matrix();

export const sendCommand = (command: string) => {
  // console.log("sending command: ", command);
  return fetch(`/device?command=${command}`)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const sendGridCommand = (
  a: math.Matrix,
  coordinate: Coordinates,
  gainDelta: number,
  glast: math.Matrix,
  step: number
) => {
  if (localStorage.getItem("name") === "admin") return new math.Matrix();

  // multiply a by coordinate
  const coord = [coordinate.x, coordinate.y];
  const b = math.multiply(a, math.matrix(coord));
  const gSelect = math.add(b, glast);

  let g = math.add(gSelect, gainDelta) as math.Matrix;

  g = g.map((value) => {
    if (value > 20) {
      return 20;
    } else if (value < -15) {
      return -15;
    } else {
      return value;
    }
  });

  sendG(g);
  // get the current time
  let date = new Date();
  let time = date.getTime();

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const grid = localStorage.getItem("grid");

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (grid ? grid : "null");

  fetch(
    `/store?time=${time}&name=${file_name}&a=${a}&coordinate=[${coordinate.x},${coordinate.y}]&gainDelta=${gainDelta}&g=${g}&glast=${glast}&step=${step}`
  );
  return gSelect;
};

export const sendG = (g_clipped: math.Matrix) => {
  // to do
  // g_clipped = math.concat(g_clipped, g_clipped, 0) as math.Matrix;
  // g_clipped.forEach((value, index, m) => {
  //   if (value > 20) {
  //     m.set(index, 20);
  //   }
  // });

  // g_clipped.forEach((value, index, m) => {
  //   if (value < -15) {
  //     m.set(index, -15);
  //   }
  // });
  // let newMatrix = overallGain;
  // for(let i = 0; i < 6; i++){
  //   for(let j = 0; j < 19; j++){
  //     let side = 0;
  //     if(j > 10){
  //       side = 1;
  //     }
  //     if(j > 14){
  //       side = 2;
  //     }
  //     newMatrix.set([i, j], g_clipped.get([i, side]));
  //     newMatrix.set([i+6, j], g_clipped.get([i, side]));

  //   }
  // }

  // console.log("this is new matrix!!: " + newMatrix)

  overallGain = g_clipped;

  
  // const arrayMatrix: number[][] = g_unclipped.toArray() as number[][];
  // const duplicatedArrayMatrix: number[][] = arrayMatrix.flatMap(row => [row, row]);
  // const duplicatedMatrix: math.Matrix = math.matrix(duplicatedArrayMatrix);  
  if (localStorage.getItem("name") === "admin") return;
  let gaintable_og = "[" + g_clipped
  .toArray()
  .map(row => "[" + (row as unknown as string[]).join(" ") + "]")
  .join(";") + "]";

    // Data which will write in a file.
  let data = gaintable_og;
    
  // Write data in 'Output.txt' .
  console.log("Sending this matrix to the device: "+data);
  // send command to server at endpoint /store
  sendCommand("mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og);
};

export const sendFirstUpdateG = (leftG: number, rightG: number, index: number) => {
  // to do
  console.log("hi")
  let initialMatrix = math.matrix([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]]);

  overallGain = initialMatrix;

  for(let i = 0; i < 12; i++){
    let left = overallGain.get([i, 0]) + leftG;
    let right = overallGain.get([i, 18]) + rightG;
    if(right > 25){
      right = 25;
    }
    if(right < -25){
      right = -25;
    }
    if(left > 25){
      left = 25;
    }
    if(left < -25){
      left = -25;
    }
    let avg = 0.5*(right + left)
    if(avg > 25){
      avg = 25;
    }
    if(avg < -25){
      avg = -25;
    }
    for(let j = 0; j < 11; j++){
      initialMatrix.set([i, j], left);
    }
    for(let j = 11; j < 15; j++){
      initialMatrix.set([i, j], avg);
    }
    for(let j = 15; j < 19; j++){
      initialMatrix.set([i, j], right);
    }
  }
  overallGain = initialMatrix;
  console.log(initialMatrix)
  if (localStorage.getItem("name") === "admin") return;
  let gaintable_og = "[" + initialMatrix
  .toArray()
  .map(row => "[" + (row as unknown as string[]).join(" ") + "]")
  .join(";") + "]";

    // Data which will write in a file.
  let data = gaintable_og;

  let stringRep = [[leftG, (leftG + rightG)/2, rightG], 
  [leftG, (leftG + rightG)/2, rightG],
  [leftG, (leftG + rightG)/2, rightG],
  [leftG, (leftG + rightG)/2, rightG], 
  [6 + leftG, 6 + (leftG + rightG)/2, rightG + 6], 
  [10 + leftG, 10 + (leftG + rightG)/2, 10 + rightG]]
  // gainToString(stringRep)
    
  // Write data in 'Output.txt' .
  console.log(data);
  // send command to server at endpoint /store
  sendCommand("mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og);
};


export const sendLastUpdateG = (leftG: number, rightG: number, index: number) => {
  // to do
  let finalMatrix = math.matrix([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [10, 10, 10, 10,10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [10, 10, 10, 10,10, 10, 10, 10, 10, 10, 10, 10]]);
  for(let i = 0; i < 12; i++){
    let left = overallGain.get([i, 0]) + leftG;
    let right = overallGain.get([i, 18]) + rightG;
    if(right > 25){
      right = 25;
    }
    if(right < -25){
      right = -25;
    }
    if(left > 25){
      left = 25;
    }
    if(left < -25){
      left = -25;
    }
    let avg = 0.5*(right + left)
    if(avg > 25){
      avg = 25;
    }
    if(avg < -25){
      avg = -25;
    }
    for(let j = 0; j < 11; j++){
      finalMatrix.set([i, j], left);
    }
    for(let j = 11; j < 15; j++){
      finalMatrix.set([i, j], avg);
    }
    for(let j = 15; j < 19; j++){
      finalMatrix.set([i, j], right);
    }
  }
  console.log(finalMatrix)
  if (localStorage.getItem("name") === "admin") return;
  let gaintable_og = "[" + finalMatrix
  .toArray()
  .map(row => "[" + (row as unknown as string[]).join(" ") + "]")
  .join(";") + "]";

    // Data which will write in a file.
  let data = gaintable_og;
    
  // Write data in 'Output.txt' .
  console.log(data);
  // send command to server at endpoint /store
  sendCommand("mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og);
};


export const sendStep = (g: math.Matrix, step: number) => {
  if (localStorage.getItem("name") === "admin") return;

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const grid = localStorage.getItem("grid");

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (grid ? grid : "null");

    const g_clipped = g.map((value) => {
      if (value > 20) {
        return 20;
      } else if (value < -15) {
        return -15;
      } else {
        return value;
      }
    });

  fetch(`/storestep?name=${file_name}&step=${step}&g=${g_clipped}`);
};

export const sendFinalG = (g: math.Matrix) => {
  sendStep(g, 100);
};

export const resetG = () => {
  sendG(math.zeros(6) as math.Matrix);
}