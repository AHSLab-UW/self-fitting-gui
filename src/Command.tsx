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

export const sendG = (g_unclipped: math.Matrix) => {
  const g = g_unclipped.map((value) => {
    if (value > 20) {
      return 20;
    } else if (value < -15) {
      return -15;
    } else {
      return value;
    }
  });

  if (localStorage.getItem("name") === "admin") return;

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
