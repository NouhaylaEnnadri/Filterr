import {
  lala,
  lola,
  book,
  bwf,
  gaussianF,
  originalF,
  Fsepia,
  sharp,
  contrast,
  staruration,
  vignette,
  warmth,
  water,
  lens,
} from "../assets";
export const cardData = [
  {
    id: 1,
    title: "Original",
    description: "Convert image to Original",
    imgUrl: originalF, // Black and white filter image
  },
  {
    id: 2,
    title: "Black & White",
    description: "Convert image to black and white",
    imgUrl: bwf, // Black and white filter image
  },
  {
    id: 3,
    title: "Blur",
    description: "Apply Gaussian blur filter",
    imgUrl: gaussianF, // Gaussian blur filter image
  },

  {
    id: 4,
    title: "Sepia",
    description: "Apply sepia tone filter",
    imgUrl: Fsepia, // Sepia filter image
  },
  {
    id: 5,
    title: "Sharpen",
    description: "Apply Sharpen Filter",
    imgUrl: sharp, // Sepia filter image
  },
  {
    id: 6,
    title: "reverse saturation ",
    description: " Apply reverse saturation filter ",
    imgUrl: staruration, // Sepia filter image
  },
  {
    id: 7,
    title: "contrast filter",
    description: "Apply contrast filter ",
    imgUrl: contrast, // Sepia filter image
  },
  {
    id: 8,
    title: "vignette filter",
    description: "Apply vignette filter",
    imgUrl: vignette, // Sepia filter image
  },
  {
    id: 9,
    title: "warmth filter",
    description: "Apply warmth filter",
    imgUrl: warmth, // Sepia filter image
  },
  {
    id: 10,
    title: "watercolor filter",
    description: "Apply watercolor filter",
    imgUrl: water, // Sepia filter image
  },

  {
    id: 11,
    title: "lens falre filter",
    description: "lens falre filter",
    imgUrl: lens, // Sepia filter image
  },
];
