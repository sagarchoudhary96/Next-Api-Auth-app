import localFont from "next/font/local";

const neutraText = localFont({
  src: [
    {
      path: "./neutraFont/Neutraface-Text-Light-Italic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "./neutraFont/Neutraface-Text-Light.woff",
      weight: "300",
      style: "normal",
    },

    {
      path: "./neutraFont/Neutraface-Text-Book-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./neutraFont/Neutraface-Text-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./neutraFont/Neutraface-Text-Demi-Italic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "./neutraFont/Neutraface-Text-Demi.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./neutraFont/Neutraface-Text-Bold-Italic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "./neutraFont/Neutraface-Text-Bold.woff",
      weight: "700",
      style: "bold",
    },
  ],
});
export { neutraText };
