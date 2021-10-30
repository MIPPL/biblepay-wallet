import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  sendMoneyIconContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10),
    marginBottom: hp(2)
  },
  sendMoneyIconContainerLight: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10),
    marginBottom: hp(2)
  },
  slipImgTop: {
    width: wp(93),
    height: hp(1.5),
  },
  slipImgBottom: {
    width: wp(93),
    height: hp(1.5),
  },
  innerContainer: {
    width: wp(93),
    marginTop: -1,
    marginBottom: -1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  innerContainerLight: {
    width: wp(93),
    marginTop: -1,
    marginBottom: -1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  innerContainerWrapper: {
    marginTop: hp(5),
    alignItems: 'center'
  },
  balanceContainer: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: wp(8)
  },
  balanceContainerItem1: {
    width: '35%'
  },
  balanceContainerItem2: {
    width: '65%'
  },
  balanceText: {
    fontSize: wp(4),
    color: '#a2a5b7',
    fontFamily: 'MADETOMMY',
    textAlign: 'center',
    marginTop: hp(2)
  },
  balanceTextBold: {
    fontFamily: 'MADETOMMY-Bold'
  },
  balanceTextBig: {
    fontFamily: 'MADETOMMY-Bold',
    color: 'white',
    fontSize: wp(5),
    textAlign: 'center',
    marginTop: hp(2),
    marginBottom: hp(2)
  },
  balanceTextLight: {
    fontSize: wp(5),
    color: '#000000',
    fontFamily: 'MADETOMMY',
    textAlign: 'center',
    marginTop: hp(2),
  },
  balanceTextBigLight: {
    fontFamily: 'MADETOMMY-Bold',
    color: '#000000',
    fontSize: wp(9),
    textAlign: 'center',
    marginTop: hp(2),
    marginBottom: hp(2)
  },
  textBold: {
    fontFamily: 'MADETOMMY-Bold'
  },
  text: {
    fontFamily: 'MADETOMMY'
  },
  seperatorTop: {
    width: wp(85),
    height: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: 'black',
    marginBottom: hp(5),
    marginTop: hp(4),
  },
  seperatorBottom: {
    width: wp(85),
    height: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: 'black',
    marginTop: hp(2.5),
    marginBottom: hp(2.5)
  },
  borderLight:  {
    borderColor: 'white',
  },
  firstText: {
    marginTop: hp(7.5),
    marginBottom: hp(2),
    fontSize: wp(5),
    color: 'white'
  },
  firstTextLight: {
    marginTop: hp(7.5),
    marginBottom: hp(2),
    fontSize: wp(5),
    color: 'black'
  }, 
  labelText: {
    marginBottom: hp(1),
    fontSize: wp(4),
    fontFamily: 'MADETOMMY',
    color: '#a2a5b7',
    textAlign: 'left'
  },
  labelTextLight: {
    marginBottom: hp(2),
    fontSize: wp(4),
    fontFamily: 'MADETOMMY',
    color: 'black',
    textAlign: 'left'
  },
  labelText2: {
    marginBottom: hp(3),
    marginTop: hp(-2),
    fontSize: wp(5),
    fontFamily: 'MADETOMMY',
    color: '#a2a5b7',
    textAlign: 'left'
  },
  labelTextLight2: {
    marginBottom: hp(2),
    marginTop: hp(-2),
    fontSize: wp(5),
    fontFamily: 'MADETOMMY',
    color: 'black',
    textAlign: 'left'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#971B20',
    width: wp(82),
    paddingBottom: hp(1),
    paddingTop: hp(1.2),
    paddingLeft: hp(2),
    fontFamily: 'MADETOMMY',
    color: 'white',
    borderRadius: 10,
    textAlign: 'right',
    fontSize: wp(6),
  },
  textInputLight: {
    borderWidth: 1,
    borderColor: '#971B20',
    width: wp(82),
    paddingBottom: hp(1),
    paddingTop: hp(1.2),    
    paddingLeft: hp(2),
    fontFamily: 'MADETOMMY',
    color: 'black',
    borderRadius: 10,
    textAlign: 'right',
    fontSize: wp(6),
  },
  textInput2: {
    borderBottomWidth: 1,
    borderColor: '#971B20',
    width: wp(73),
    paddingBottom: hp(1),
    paddingTop: hp(1.2),
    paddingLeft: wp(2),
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'flex-start'
  },
  textInputLight2: {
    borderBottomWidth: 1,
    borderColor: '#971B20',
    width: wp(73),
    paddingBottom: hp(1),
    paddingTop: hp(1.2),    
    paddingLeft: hp(2),
    fontFamily: 'MADETOMMY',
    color: 'black',
    fontSize: wp(4),
  },
  textInputContainer: {
    marginBottom: hp(2)
  },
  iconWithinInput: {
    paddingBottom: hp(1),
    paddingRight: hp(1),
    marginLeft: wp(2),
    position: 'absolute',
    right: 0,
    bottom: 1,
  },
  maxButton: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#971B20',
    alignSelf: 'flex-end'
  },
  maxButtonLight: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#971B20',
    alignSelf: 'flex-end'
  },
  maxText: {
    borderColor: '#971B20',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: wp(8),
    paddingRight: wp(8),
    paddingTop: hp(1),
    paddingBottom: hp(1),
    fontFamily: 'MADETOMMY-Bold',
    fontSize: wp(4),
    color: 'white',
  },
  maxTextLight: {
    borderColor: '#971B20',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: wp(8),
    paddingRight: wp(8),
    paddingTop: hp(1),
    paddingBottom: hp(1),
    fontFamily: 'MADETOMMY-Bold',
    fontSize: wp(4),
    color: 'black'
  },
  addressText: {
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(3.5)
  },
  addressTextLight: {
    fontFamily: 'MADETOMMY',
    color: 'black',
    fontSize: wp(3.5)
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(5.5),
    marginVertical: hp(2)
  },
  dateTextTitle: {
    fontFamily: 'MADETOMMY-Bold',
    fontSize: wp(3.5),
    color: '#971B20'
  },
  dateTextTitleLight: {
    fontFamily: 'MADETOMMY-Bold',
    fontSize: wp(3.5),
    color: '#971B20'
  },
  dateText: {
    fontFamily: 'MADETOMMY-Bold',
    fontSize: wp(5),
    color: 'white'
  },
  dateTextLight: {
    fontFamily: 'MADETOMMY-Bold',
    fontSize: wp(5),
    color: 'black'
  },
  button: {
    width: wp(60),
    height: hp(6),
    marginTop: hp(4)
  }
})
