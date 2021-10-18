module.exports = {
  purge: {
    enabled: false,
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
        'violet': {
          'button': '#A156FF',
          'hover': '#753DBA',
          'sheet': '#340D64',
          'header': '#7B3BCB',
          'pill': '#B77BFF',
          'link': '#AD00FF',
          'page': '#C244FF',
          'bubble': '#E6B0FF',
          'bubbleHover': '#E7B7FF',
          'bubbleText': '#7A44BE',
          'bg': '#F8F2FF'
        },
        'green': {
          'button': '#2DCD86',
          'hover': '#21A66B'
        },
        'purple': {
          'button': '#966ACD',
          'hover': '#704E9A',
          'form': '#A78BFA',
          'formHover': '#8B5CF6'
        },
        'orange': {
          'button': '#FFB26B',
          'hover': '#FF912C'
        },
        'blue': {
          'body': '#265FB2',
          'form': '#60A5FA',
          'formHover': '#3B82F6',
          'page': '#79A4E3',
          'dark':'#163969',
          'button': '#79A4E3',
          'hover': '#4E7CBF'
        },
        'lightblue': {
          'button': '#D9F8FF',
          'hover': '#5BA4B4',
          'light': '#ABC2E4',
          'lighter': '#BBD8FF',
          'bg': '#DEEBFF'
        },
        'yellow': {
          'button': '#FFE298',
          'hover': '#FFD66C'
        }, 
        'red': {
          'button': '#FF6B6B',
          'hover': '#D05D5D'
        },
        'gray': {
          'form': '#E5E7EB',
          'formHover': '#D1D5DB',
          'emptymail': '#9E9E9E',
          'mailbox': '#4E4E4E',
          'disabled': '#DBDBDB',
          'header': '#696969',
          'subheader': '#545454',
          'footer':'#F2F2F2'
        },
        'white': '#FFF',
        'black': '#000'
    },
    gradientColorStops: theme => ({
      ...theme('colors'),
      'dark': '#0D0D0D69',
      'light': '#E0EDFFA6',
     }),
    extend: {
      scale: {
        '15': '0.15'
      },
      width: {
        '27': '6.75rem',
        '18': '4.5rem',
        '8/10': '80%',
      },
      height: {
        '27': '6.75rem',
        '18': '4.5rem',
        '46.313':'46.313rem',
        '2.5/4':'63.5%',
        '1.5/4':'37.5%'
      },
      lineHeight: {
        '11': '2.625rem'
      },
      fontSize: {
        'popup': '2.625rem',
        'primary': '5rem'
      },
      borderRadius: {
        'button': '0.625rem'
      },
      padding: {
        '22.5': '5.625rem'
      },
      boxShadow: {
        'halo': '0 0 25px rgba(0,0,0,0.15)'
      },
      backdropBlur: {
        'glass': '50px'
      },
      margin:{
        '1/3': '33.333333%',
        '1.3/2':'58.888888%'
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'active'],
      ringColor: ['hover', 'active'],
      ringOffsetWidth: ['hover', 'active'],

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
