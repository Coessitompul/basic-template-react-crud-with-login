/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Tambahkan font Poppins sebagai default menggunakan nama sans yang tadinya poppins
      },
      colors: {
        primary: {
          DEFAULT: '#3E8F9F', // The base color (e.g., teal)
          light: '#3B82F6',   // Lighter shade of primary
          dark: '#174B56',    // Darker shade of primary
        },
      },

    },
  },
  daisyui: {
    themes: [
      // {
      //   mytheme: {
          // "primary": "#1D4ED8", // contoh warna
          // "secondary": "#9333EA", // contoh warna
          // "accent": "#F59E0B",    // contoh warna
          // "neutral": "#F5F5F5",   // contoh warna netral
          // "base-100": "#ffffff",  // ini untuk background menjadi putih
      //   },
      // },
      "light",  // tema default DaisyUI yang terang
    ],
  },
  plugins: [
    daisyui,
  ],
}
