import { StyleSheet } from 'react-native'

export const GlobalStyles = StyleSheet.create({
  text: {
    color: 'black',
  },
  whiteText: {
    color: 'white'
  },
  hugeText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  veryBigText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  bigText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  mediumText: {
    fontSize: 17,
  },
  smallText: {
    fontSize: 15
  },
  tinyText: {
    fontSize: 12
  },
  row: {
    flexDirection: 'row'
  },
  textCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: 'bold'
  },
  /* COLORS */
  // dark blue
  mainBg: {
    backgroundColor: '#0C0A3E'
  },
  mainColor: {
   color: '#0C0A3E',
  },
  mainTintColor: {
    tintColor: '#0C0A3E',
   },
  // light blue
  secondBg: {
    backgroundColor: 'hsl(242, 72%, 44%)'
  },
  secondColor: {
   color: 'hsl(242, 72%, 44%)',
  },
  // very dark blue (almost black)
  thirdBg: {
    backgroundColor: 'hsl(242, 72%, 6%)',
  },
  thirdColor: {
    color: 'hsl(242, 72%, 6%)',
  },
  // light grey
  fourthBg: {
    backgroundColor: '#ddd',
  },
  fourthColor: {
    color: '#ddd',
  },
  // deep emerald
  fifthBg: {
    backgroundColor: 'hsl(134, 64%, 29%)',
  },
  fifthColor: {
    color: 'hsl(134, 64%, 29%)',
  },
  fithTintColor: {
    tintColor: 'hsl(134, 64%, 29%)',
  }
})