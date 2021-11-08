import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#971B20',
    justifyContent: 'center',
    minWidth: wp(80),
    maxWidth: wp(90),
    paddingHorizontal: wp(3),
    height: hp(6),
    borderRadius: 20
  },
  filled: {
    backgroundColor: '#971B20',
  },
  containerLight: {
    flex: 0,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp(80),
    maxWidth: wp(90),
    paddingHorizontal: wp(3),
    height: hp(6),
    backgroundColor: '#971B20',
    borderRadius: 20
  },
  filledLight: {
    backgroundColor: '#971B20',
  },
  label: {
    fontSize: wp(4.5),
    fontWeight: '900',
    fontFamily: 'MADETOMMY-Bold',
    color: 'white'
  },
  notFilled: {
    backgroundColor: 'black',
  },
  notFilledLight: {
    backgroundColor: 'white',
  }
})
