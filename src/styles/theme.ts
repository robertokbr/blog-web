import { extendTheme } from '@chakra-ui/react';

export const dracula = {
  BackgroundPrimary: '#1d1e26',
  BackgroundSecondary:	'#282a36',	
  CurrentLine: '#44475a',	
  Comment:	'#6272a4',	
  Foreground:	'#f8f8f2',	
  Cyan:	'#8be9fd',	
  Green:	'#50fa7b',	
  Orange:	'#ffb86c',	
  Pink:	'#ff79c6',	
  Purple:	'#bd93f9',	
  Red:	'#ff5555',	
  Yellow:	'#f1fa8c',	
};

export const randomDraculaBackground = () => {
  const { Cyan, Green, Orange, Pink, Purple, Red, Yellow } = dracula;
  const colors = [Cyan, Green, Orange, Pink, Purple, Red, Yellow];
  const index = Math.floor(Math.random() * colors.length + 1);
  return colors[index];
}

export const simpleHover = {
  filter: 'brightness(0.65)',
  transition: '0.3s',
  cursor: 'pointer'
}

export const textGradiant = {
  bgGradient: "linear(to-b, gray.50, transparent)", 
  bgClip: "text",
}

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: dracula.BackgroundPrimary,
        color: dracula.Foreground,
      }
    }
  },
  fonts: {
    body: 'Roboto',
    heading: 'Roboto',
  },
  colors: {
    gray: {
      900: dracula.BackgroundPrimary,
      800: dracula.BackgroundSecondary,
      700: dracula.CurrentLine,
      600: dracula.Comment,
      50: dracula.Foreground,
    },
    pink: {
      400: dracula.Pink
    },
    purple: {
      400: dracula.Purple,
    },
    green: {
      400: dracula.Green,
    },
    red: {
      400: dracula.Red
    }
  }
});