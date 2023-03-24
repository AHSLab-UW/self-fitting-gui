import { Coordinates } from "./components/Grid";
import * as math from "mathjs";

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
  // multiply a by coordinate
  const coord = [coordinate.x, coordinate.y];
  const b = math.multiply(a, math.matrix(coord));
  const gSelect = math.add(b, glast);

  const g = math.add(gSelect, gainDelta) as math.Matrix;

  sendG(g);
  // get the current time
  let date = new Date();
  let time = date.getTime();

  const name = localStorage.getItem("name");
  const grid = localStorage.getItem("grid");

  const file_name = name ? name : "null" + "-" + grid ? grid : "empty";

  fetch(
    `/store?time=${time}&name=${file_name}&a=${a}&coordinate=[${coordinate.x},${coordinate.y}]&gainDelta=${gainDelta}&g=${g}&glast=${glast}&step=${step}`
  );
  return gSelect;
};

export const sendG = (g: math.Matrix) => {
  let gaintable_og = "";
  for (let i = 0; i < g.size()[0]; i++) {
    gaintable_og += `[${g.get([i])} ${g.get([i])} ${g.get([i])}];`;
  }
  gaintable_og += gaintable_og;
  gaintable_og = gaintable_og.substring(0, gaintable_og.length - 1);
  gaintable_og = "[" + gaintable_og + "]";

  // send command to server at endpoint /store
  sendCommand("mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og);
};

export const sendStep = (g: math.Matrix, step: number) => {
  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const grid = localStorage.getItem("grid");

  const file_name = name
    ? name
    : "null" + "-" + scene
    ? scene
    : "null" + grid
    ? grid
    : "null";

  fetch(`/storestep?name=${file_name}&step=${step}&g=${g}`);
};

export const sendFinalG = (g: math.Matrix) => {
  sendStep(g, 100);
};
