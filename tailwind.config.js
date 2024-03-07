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

      
      'XGA': '1024px',
      'HD': '1280px',
      'FHD': '1920px',
      '2K': '2560px',

      // Ultra HD
      '4K': '3840px',
      '8K': '7680px'
    },

    
    extend: {

      colors:
      {
        "primary": "#11B4D4",
        "secondary": "#dc143c",
        "background": "#1e293b"
      },
      
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
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
  ],
}

