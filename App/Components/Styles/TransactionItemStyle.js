import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(8),
    backgroundColor: '#330000',
    marginHorizontal: wp(2.5),
    borderRadius: 5,
    marginBottom: hp(0.5),
    paddingHorizontal: wp(4)
  },
  containerLight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(8),
    backgroundColor: 'white',
    marginHorizontal: wp(2.5),
    borderRadius: 5,
    marginBottom: hp(0.5),
    paddingHorizontal: wp(4)
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addressText: {
    fontFamily: 'MADETOMMY-Bold',
    color: 'white',
    fontSize: wp(3.2),
  },
  addressTextLight: {
    fontFamily: 'MADETOMMY-Bold',
    color: 'black',
    fontSize: wp(3.2),
  },
  dateText: {
    fontFamily: 'MADETOMMY',
    color: '#9D9FBE',
    fontSize: wp(3.2),
  },
  dateTextLight: {
    fontFamily: 'MADETOMMY',
    color: '#333333',
    fontSize: wp(3.2),
  },
  icon: {
    marginRight: wp(4)
  },
  amountText: {
    fontFamily: 'MADETOMMY',
    fontSize: wp(4),
    color: 'white'
  },
  textLightSent: {
    color: 'red'
  },
  textLightReceived: {
    color: '#00CC10'
  },
  tickerText: {
    fontFamily: 'MADETOMMY',
    color: '#9D9FBE',
  }
})
