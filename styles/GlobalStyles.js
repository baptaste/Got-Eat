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
    // backgroundColor: '#0C0A3E'
    // backgroundColor: 'hsl(158, 100%, 13%)'

  },
  mainColor: {
   color: '#0C0A3E',
  },
  // light blue
  secondBg: {
    // backgroundColor: 'hsl(242, 72%, 44%)'
    // backgroundColor: '#00a86b' // jade
    backgroundColor: '#F9564F' // very nice red orange
  },
  secondColor: {
  //  color: 'hsl(242, 72%, 44%)',
    // color: '#00a86b' // jade
    color: '#F9564F' // very nice red orange
  },
  // very dark blue (almost black)
  thirdBg: {
    // backgroundColor: 'hsl(242, 72%, 6%)',
    // backgroundColor: 'hsl(158, 100%, 9%)'  // dark jade
    backgroundColor: 'hsl(2, 93%, 30%)'
  },
  thirdColor: {
    // color: 'hsl(242, 72%, 6%)',
    // color: 'hsl(158, 100%, 13%)' // dark jade
    color: '#F9564F' // very nice red orange
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
    tintColor: 'hsl(134, 64%, 35%)',
  }
})