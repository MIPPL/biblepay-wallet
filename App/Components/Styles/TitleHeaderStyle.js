import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(8)
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'OpenSans'
  },
  textBold: {
    color: 'white',
    fontSize: wp(6),
    marginLeft: wp(4),
    fontFamily: 'OpenSans-Bold'
  },
  textLight: {
    color: '#000000',
    fontFamily: 'OpenSans'
  },
  textBoldLight: {
    fontSize: wp(6),
    color: '#000000',
    marginLeft: wp(4),
    fontFamily: 'OpenSans-Bold'
  }
})
