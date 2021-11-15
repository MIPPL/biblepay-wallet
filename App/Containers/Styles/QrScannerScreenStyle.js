import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white'
  },
  camera: {
    height: hp(100)
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5)
  },
  notAuthContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAuthText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(5),
    color: 'white'
  },
  notAuthTextLight: {
    color: '#000080'
  },
})
