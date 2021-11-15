import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

  headerContainer: {
    flex:1, 
    backgroundColor: '#000000' 
  },
  pinpadContainer : {
    width:wp(100), 
    height:hp(30),
    position:'absolute', 
    bottom:0, 
    backgroundColor: '#000000'
  },
  containerLight : {
    backgroundColor: '#F2F7FD' 
  },
  textLight : {
    color: '#971B20' 
  },
  stylePinCodeButtonCircle: {
    width: wp(16),
    height: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#971B20"
  },
  stylePinCodeButtonCircleLight: {
    width: wp(16),
    height: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#971B20"
  },
  stylePinCodeRowButtons: {
    width: wp(100),
    height: hp(12),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#971B20',
  },
  stylePinCodeMainContainer: {
  },
  stylePinCodeEnterContainer: {
    backgroundColor: '#000000'
  },
  stylePinCodeEnterContainerLight: {
    backgroundColor: '#F2F7FD'
  },
  stylePinCodeColumnButtons: {
    width: wp(16),
  },
  stylePinCodeColumnDeleteButton: {
    width: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#971B20'
  },
  stylePinCodeEmptyColumn: {
    width: wp(16),
  },
  stylePinCodeTextButtonCircle: {
    fontSize: wp(8),
    fontFamily: 'OpenSans',
    color: '#ffffff'
  },
  stylePinCodeTextTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(5),
    color: 'white',
    marginBottom: wp(3)
  },
  stylePinCodeTextTitleLight: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(5),
    color: '#971B20',
    marginBottom: wp(3)
  },
  stylePinCodeTextSubTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4),
    color: 'white',
    textAlign: 'center'
  },
  stylePinCodeTextSubTitleLight: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4),
    color: '#971B20',
    textAlign: 'center'
  },
  stylePinCodeCircle: {
    backgroundColor: 'white',
    height: wp(6),
    borderRadius: 12,
    width: wp(6)
  },
  stylePinCodeCircleLight: {
    backgroundColor: '#971B20',
    height: wp(5),
    borderRadius: 10,
    width: wp(5)
  },
  styleLockScreenButton: {
    height: 0,
    width: 0
  },
  styleLockScreenTitle: {
    color: '#ffffff',
  },
  stylePinCodeButtonNumberPressed: {
    backgroundColor: '#0045DF',
    color: '#0045DF',
  },
  stylePinCodeButtonNumberPressedLight: {
    backgroundColor: '#971B20',
    color: '#971B20',
  },
  deleteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(16),
    marginRight: wp(5),
    backgroundColor: '#971B20',
    height: hp(7),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#971B20',
  },
  deleteButtonContainerLight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(16),
    marginRight: wp(5),
    backgroundColor: '#F2F7FD',
    height: hp(7),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#971B20',
  }


})
