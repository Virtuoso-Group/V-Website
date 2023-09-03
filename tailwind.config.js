/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens:
    {
      //  Standard
      'SD': '640px',

      // HD
      'HD': '720px',
      'FHD': '1080px',
      '2K': '2560px',

      // Ultra HD
      '4K': '3840px',
      '8K': '7680px'
    },

    
    extend: {
      fontFamily:
      {
        'holyScript': ['Holy Script']
      },
      dropShadow:
      {
        '5xl': [
          '0.5px 0.5px 0 #000', 
          '-0.5px -0.5px 0 #000', 
          '0.5px -0.5px 0 #000',
          '-0.5px 0.5px 0 #000',
          '0.5px 0.5px 0 #000'
        ]
      }
    },
  },
  plugins: [],
}

