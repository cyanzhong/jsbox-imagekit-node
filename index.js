const ui = require("ui");
const imagekit = require("imagekit");
const quicklook = require("quicklook");
const share = require("share");

const sample = "assets/sample.jpg";
const mask = "assets/mask.png";
const gif = "assets/sample.gif";

async function open(file) {
  await quicklook.file(file);
  const {index} = await ui.menu(["Continue"]);
  if (index == 0) {
    run();
  }
}

const options = [
  {
    title: "original image",
    handler: () => {
      open(sample);
    }
  },
  {
    title: "info",
    handler: () => {
      const info = imagekit.info(sample);
      quicklook.json(info);
    }
  },
  {
    title: "grayscale",
    handler: () => {
      open(imagekit.grayscale(sample));
    }
  },
  {
    title: "invert",
    handler: () => {
      open(imagekit.invert(sample));
    }
  },
  {
    title: "sepia",
    handler: () => {
      open(imagekit.sepia(sample));
    }
  },
  {
    title: "adjustEnhance",
    handler: () => {
      open(imagekit.adjustEnhance(sample));
    }
  },
  {
    title: "adjustRedEye",
    handler: () => {
      open(imagekit.adjustRedEye(sample));
    }
  },
  {
    title: "adjustBrightness",
    handler: () => {
      open(imagekit.adjustBrightness(sample, 100));
    }
  },
  {
    title: "adjustContrast",
    handler: () => {
      open(imagekit.adjustContrast(sample, 100));
    }
  },
  {
    title: "adjustGamma",
    handler: () => {
      open(imagekit.adjustGamma(sample, 4));
    }
  },
  {
    title: "adjustOpacity",
    handler: () => {
      open(imagekit.adjustOpacity(sample, 0.5));
    }
  },
  {
    title: "blur",
    handler: () => {
      open(imagekit.blur(sample, 0));
    }
  },
  {
    title: "emboss",
    handler: () => {
      open(imagekit.emboss(sample, 0));
    }
  },
  {
    title: "sharpen",
    handler: () => {
      open(imagekit.sharpen(sample, 0));
    }
  },
  {
    title: "unsharpen",
    handler: () => {
      open(imagekit.unsharpen(sample, 0));
    }
  },
  {
    title: "detectEdge",
    handler: () => {
      open(imagekit.detectEdge(sample, 0));
    }
  },
  {
    title: "mask",
    handler: () => {
      open(imagekit.mask(sample, mask));
    }
  },
  {
    title: "reflect",
    handler: () => {
      open(imagekit.reflect(sample, 512, 0, 1));
    }
  },
  {
    title: "cropTo",
    handler: () => {
      const size = {
        width: 256,
        height: 256
      };
      open(imagekit.cropTo(sample, size));
    }
  },
  {
    title: "scaleBy",
    handler: () => {
      open(imagekit.scaleBy(sample, 0.2));
    }
  },
  {
    title: "scaleTo",
    handler: () => {
      const size = {
        width: 100,
        height: 100
      };
      open(imagekit.scaleTo(sample, size));
    }
  },
  {
    title: "scaleAspectFit",
    handler: () => {
      const size = {
        width: 256,
        height: 100
      };
      open(imagekit.scaleAspectFit(sample, size));
    }
  },
  {
    title: "scaleAspectFill",
    handler: () => {
      const size = {
        width: 256,
        height: 100
      };
      open(imagekit.scaleAspectFill(sample, size));
    }
  },
  {
    title: "rotate",
    handler: () => {
      open(imagekit.rotate(sample, Math.PI * 0.25));
    }
  },
  {
    title: "rotatePixels",
    handler: () => {
      open(imagekit.rotatePixels(sample, Math.PI * 0.25));
    }
  },
  {
    title: "flip",
    handler: () => {
      open(imagekit.flip(sample));
    }
  },
  {
    title: "concatenate",
    handler: () => {
      const images = [sample, mask, sample];
      open(imagekit.concatenate(images, 10));
    }
  },
  {
    title: "combine",
    handler: () => {
      open(imagekit.combine(sample, mask));
    }
  },
  {
    title: "rounded",
    handler: () => {
      open(imagekit.rounded(sample, 20));
    }
  },
  {
    title: "original GIF",
    handler: () => {
      open(gif)
    }
  },
  {
    title: "extractGIF",
    handler: async() => {
      const {images} = await imagekit.extractGIF(gif);
      quicklook.files(images);
    }
  },
  {
    title: "makeGIF",
    handler: async() => {
      const images = [sample, mask];
      const durations = [0.5, 0.5];
      const data = await imagekit.makeGIF(images, {
        durations: durations
      });
      open(data);
    }
  },
  {
    title: "makeVideo",
    handler: async() => {
      const data = await imagekit.makeVideo(gif);
      share.file({
        name: "video.mp4",
        data: data
      });
    }
  }
];

async function run() {
  const {index} = await ui.menu(options.map(x => x.title));
  const handler = options[index]["handler"];
  handler();
}

run();