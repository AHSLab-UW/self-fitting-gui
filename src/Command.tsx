import * as math from "mathjs";
import { Coordinates} from "./components/ButtonLayout";
// import { gainToString } from "./components/Grid";

export const sendDeviceCommand = (command: string) => {
  // console.log("sending command: ", command);
  return fetch(`/device?command=${command}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const sendStoreLogCommand = (
  a: math.Matrix,
  coordinate: { x: number; y: number },
  gainDelta: number,
  g: math.Matrix,
  glast: math.Matrix,
  step: number
) => {
  if (localStorage.getItem("name") === "admin") return new math.Matrix();

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
};

export const sendSetDeviceGainCommand = (g: math.Matrix) => {
  if (localStorage.getItem("name") === "admin") return;
  let gaintable_og = "[" + g_clipped
  .toArray()
  .map(row => "[" + (row as unknown as string[]).join(" ") + "]")
  .join(";") + "]";

  let gaintable_og = "";
  for (let i = 0; i < g.size()[0]; i++) {
    const curr_g = g.get([i]);
    gaintable_og += `[${curr_g} ${curr_g} ${curr_g}];`;
  }
  gaintable_og += gaintable_og;
  gaintable_og = gaintable_og.substring(0, gaintable_og.length - 1);
  gaintable_og = "[" + gaintable_og + "]";

  sendDeviceCommand(
    "mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og
  );
};

export const sendStoreStepCommand = (g: math.Matrix, step: number) => {
  if (localStorage.getItem("name") === "admin") return;

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const grid = localStorage.getItem("grid");
  let date = new Date();
  let time = date.getTime();

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (grid ? grid : "null");

  fetch(`/storestep?name=${file_name}&step=${step}&g=${g}`);
};

export const sendStoreFinalStepCommand = (g: math.Matrix) => {
  sendStoreStepCommand(g, 100);
};

export const sendResetDeviceGainCommand = () => {
  sendSetDeviceGainCommand(math.zeros(6) as math.Matrix);
};

export const sendClick = (g: math.Matrix, step: number, index: number) => {
  if (localStorage.getItem("name") === "admin") return;

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const grid = localStorage.getItem("grid");
  let date = new Date();
  let time = date.getTime();

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (grid ? grid : "null");

    const g_clipped = g;

  fetch(`/storestep?name=${file_name}&step=${step + '.' + index}&g=${g_clipped}`);
};
