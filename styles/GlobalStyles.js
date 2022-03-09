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
  mainBgLight: {
    backgroundColor: 'white'
  },
  mainBgDark: {
    backgroundColor: '#252627'
  },
  mainColorDark: {
    color: '#252627'
  },

  secondBg: {
      // backgroundColor: '#168d3a' // green spotify bis
    // backgroundColor: '#00a86b' // jade
    // backgroundColor: '#F9564F' // very nice red orange CURRENT
    // backgroundColor: '#F55943' // orange from Jow
    // backgroundColor: '#ffc30b'
    backgroundColor: '#e6ac00'
  },
  secondColor: {
    color: '#ffc30b'
    // color: '#168d3a'
    // color: '#00a86b' // jade
    // color: '#F9564F' // very nice red orange CURRENT
  },
  // very dark blue (almost black)
  thirdBg: {
    // backgroundColor: 'hsl(242, 72%, 6%)',
    // backgroundColor: 'hsl(158, 100%, 9%)'  // dark jade
    // backgroundColor: 'hsl(2, 93%, 30%)'
    backgroundColor: '#70877F'
  },
  thirdColor: {
    // color: 'hsl(242, 72%, 6%)',
    // color: 'hsl(158, 100%, 13%)' // dark jade
    // color: '#F9564F' // very nice red orange
    color: '#70877F'
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
    backgroundColor: 'hsl(45, 100%, 92%)',
  },
  fifthColor: {
    color: 'hsl(45, 100%, 92%)',
  },
  sixthTintColor: {
    tintColor: 'hsl(134, 64%, 35%)',
  }
})