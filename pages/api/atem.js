import { resolve } from "path";
import sharp from "sharp";
import satori from "satori";
import Overlay from "../../components/Overlay";

const { Atem } = require("atem-connection");
const fs = require("fs");

let atem = new Atem();
atem.on("info", console.log);
atem.on("error", console.error);
let connected = false;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function showGraphic(name) {
  try {
    const svg = await satori(<Overlay name={name} />, {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Fjalla One",
          data: fs.readFileSync("./assets/FjallaOne-Regular.ttf"),
          style: "normal",
          weight: 400,
        },
      ],
    });

    const buffer = await sharp(Buffer.from(svg))
      .png()
      .resize(1920, 1080, { fit: "contain" })
      .ensureAlpha()
      .raw({ channels: 4 })
      .toBuffer();

    await atem.autoDownstreamKey(1, false);
    await atem.setUpstreamKeyerOnAir(false, 1, 3);
    await delay(1000);
    await atem.uploadStill(1, buffer, "test", "test desc");
    await atem.autoDownstreamKey(1, true);
    await atem.setUpstreamKeyerOnAir(true, 1, 3);
  } catch (error) {
    console.error("Unable to set graphic", error);
  }
}

async function clear() {
  await atem.autoDownstreamKey(1, false);
  await atem.setUpstreamKeyerOnAir(false, 1, 3);
}

export default function handler(req, res) {
  return Promise.resolve()
    .then(() => {
      if (!connected) {
        connected = true;
        return atem.connect("192.168.2.24");
      }
    })
    .then(() => {
      if (req.body.clear) {
        return clear();
      } else {
        return showGraphic(req.body.name);
      }
    })
    .then(() => res.status(200).json({ message: "Hello from Next.js!" }))
    .catch((e) => console.error(e));
}
