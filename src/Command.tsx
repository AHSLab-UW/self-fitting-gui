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

  let gaintable_og = "";
  for (let i = 0; i < g.size()[0]; i++) {
    gaintable_og += `[${g.get([i])} ${g.get([i])} ${g.get([i])}];`;
  }
  gaintable_og += gaintable_og;
  gaintable_og = gaintable_og.substring(0, gaintable_og.length - 1);
  gaintable_og = "[" + gaintable_og + "]";

  // get the current time
  let date = new Date();
  let time = date.getTime();
  let name = localStorage.getItem("name");

  // send command to server at endpoint /store
  sendCommand("mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og);
  fetch(
    `/store?time=${time}&name=${name}&a=${a}&coordinate=[${coordinate.x},${coordinate.y}]&gainDelta=${gainDelta}&g=${g}&glast=${glast}&step=${step}`
  );
  return gSelect;
};

export const sendStep = (
  g: math.Matrix,
  step: number
) => {
  let name = localStorage.getItem("name");
  fetch(
    `/storestep?name=${name}&step=${step}&g=${g}`
  );
};
