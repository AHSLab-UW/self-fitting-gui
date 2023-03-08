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
  glast: math.Matrix
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

  console.log("g:", g);
  sendCommand("mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og);
  return gSelect;
};

// send server the time, the name, a, coordinate, gainDelta, and glast
export const storeInformation = (
  a: math.Matrix,
  coordinate: Coordinates,
  gainDelta: number,
  glast: math.Matrix,
  step: number
) => {
  // get the current time
  let date = new Date();
  let time = date.getTime();
  let name = localStorage.getItem("name");

  // send command to server at endpoint /store
  return fetch(
    `/store?time=${time}&name=${name}&a=${a}&coordinate=${coordinate}&gainDelta=${gainDelta}&glast=${glast}&step=${step}`
  );
};
