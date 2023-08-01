import * as math from "mathjs";
import { Coordinates } from "./components/ButtonLayout";
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
  const fitType = localStorage.getItem("fitType");

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (fitType ? fitType : "null");

  fetch(
    `/store?time=${time}&name=${file_name}&a=${a}&coordinate=[${coordinate.x},${coordinate.y}]&gainDelta=${gainDelta}&g=${g}&glast=${glast}&step=${step}`
  );
};

export const sendSetDeviceGainCommand = (g: math.Matrix) => {
  if (localStorage.getItem("name") === "admin") return;

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

export const sendSetDeviceGainButtonCommand = (g: math.Matrix) => {
  if (localStorage.getItem("name") === "admin") return;
  let gaintable_og =
    "[" +
    g
      .toArray()
      .map((row) => "[" + (row as unknown as string[]).join(" ") + "]")
      .join(";") +
    "]";

  // Data which will write in a file.
  let data = gaintable_og;

  // Write data in 'Output.txt' .
  console.log("Sending this matrix to the device: " + data);
  // send command to server at endpoint /store
  sendDeviceCommand(
    "mha.mhachain.overlapadd.mhachain.dc.gtdata=" + gaintable_og
  );
};

export const sendStoreButtonClickCommand = (g: math.Matrix, step: number, index: number) => {
  if (localStorage.getItem("name") === "admin") return;

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const fitType = localStorage.getItem("fitType");
  let date = new Date();
  let time = date.getTime();

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (fitType ? fitType : "null");

  const g_clipped = g;

  fetch(
    // todo: FIX THIS
    // might want different functionalities so maybe add new api if necessary
    `/storestep?name=${file_name}&step=${step + "." + index}&g=${g_clipped}`
  );
};

export const sendStoreButtonStepCommand = (g: math.Matrix, step: number) => {
  if (localStorage.getItem("name") === "admin") return;

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const fitType = localStorage.getItem("fitType");
  let date = new Date();
  let time = date.getTime();

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (fitType ? fitType : "null");

    const g_clipped = g;

  fetch(`/storestep?name=${file_name}&step=${step}&g=${g_clipped}`);
};


export const sendStoreStepCommand = (g: math.Matrix, step: number) => {
  if (localStorage.getItem("name") === "admin") return;

  const name = localStorage.getItem("name");
  const scene = localStorage.getItem("scene");
  const fitType = localStorage.getItem("fitType");
  let date = new Date();
  let time = date.getTime();

  const file_name =
    (name ? name : "null") +
    "-" +
    (scene ? scene : "null") +
    "-" +
    (fitType ? fitType : "null");

  fetch(`/storestep?name=${file_name}&step=${step}&g=${g}`);
};

export const sendStoreFinalStepCommand = (g: math.Matrix) => {
  sendStoreStepCommand(g, 100);
};

export const sendResetDeviceGainCommand = () => {
  sendSetDeviceGainCommand(math.zeros(6) as math.Matrix);
};
