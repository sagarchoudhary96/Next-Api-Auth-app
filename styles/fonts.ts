import localFont from "next/font/local";

/**
 * Neutraface Text font
 */
const neutraText = localFont({
  src: [
    {
      path: "./neutraface/Neutraface-Text-Light-Italic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "./neutraface/Neutraface-Text-Light.woff",
      weight: "300",
      style: "normal",
    },

    {
      path: "./neutraface/Neutraface-Text-Book-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./neutraface/Neutraface-Text-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./neutraface/Neutraface-Text-Demi-Italic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "./neutraface/Neutraface-Text-Demi.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./neutraface/Neutraface-Text-Bold-Italic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "./neutraface/Neutraface-Text-Bold.woff",
      weight: "700",
      style: "bold",
    },
  ],
});
export { neutraText };
