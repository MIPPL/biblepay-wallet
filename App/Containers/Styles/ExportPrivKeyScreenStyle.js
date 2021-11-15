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
    backgroundColor: '#971B20',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    position: 'absolute',
    top: -wp(12),
    right: 0,
    left: wp(93)/2 - wp(10),
  },
  lightContainer:   {
    backgroundColor: '#58A2DC'
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
    backgroundColor: '#F2F7FD'
  },
  innerContainerWrapper: {
    marginTop: hp(5),
    alignItems: 'center'
  },
  textBold: {
    fontFamily: 'OpenSans-Bold'
  },
  text: {
    fontFamily: 'OpenSans'
  },
  seperatorTop: {
    width: wp(85),
    height: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: '#a2a5b7',
    marginBottom: hp(2),
    marginTop: hp(0),
  },
  seperatorBottom: {
    width: wp(85),
    height: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: '#a2a5b7',
    marginTop: hp(0),
    marginBottom: hp(2.5)
  },
  firstText: {
    marginTop: hp(5.5),
    marginBottom: hp(1),
    fontSize: wp(4),
    color: '#971B20'
  },
  firstTextLight: {
    marginTop: hp(5.5),
    marginBottom: hp(1),
    fontSize: wp(4),
    color: 'white'
  },
  balanceText: {
    marginBottom: hp(2),
    fontSize: wp(6.5)
  },
  balanceTextLight: {
    marginBottom: hp(2),
    fontSize: wp(6.5),
    color: 'white'
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#a2a5b7',
    width: wp(83),
    paddingBottom: hp(0.7),
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(6),
    color: '#971B20'
  },
  textInputLight: {
    borderBottomWidth: 1,
    borderColor: '#a2a5b7',
    width: wp(83),
    paddingBottom: hp(0.7),
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(6),
    color: 'white'
  },
  textInputContainer: {
    marginBottom: hp(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWithinInput: {
    position: 'absolute',
    right: 0,
    bottom: 1,
  },
  addressText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(3.3),
    marginTop: hp(0.5),
    marginBottom: hp(4),
    color: 'white'
  },
  addressTextLight: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(3.3),
    marginTop: hp(0.5),
    marginBottom: hp(4)
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(5.5),
    marginBottom: hp(1)
  },
  dateTextTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(3.5),
    color: '#971B20'
  },
  dateTextTitleLight: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(3.5),
    color: 'white'
  },
  dateText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(5),
    color: 'white'
  },
  button: {
    width: wp(60),
    height: hp(6),
    marginTop: hp(4)
  },
  textAmountHint: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4),
    color: '#971B20',
    marginTop: hp(1)
  },
  textAmountHintLight: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4),
    color: 'black',
    marginTop: hp(1)
  },
  privKeyText: {
    fontFamily: 'OpenSans',
    fontSize: wp(4),
    color: '#971B20',
    marginTop: hp(1),
    marginBottom: hp(1),
    textAlign:'center',
    marginHorizontal: wp(5)

  },
  privKeyTextLight: {
    fontFamily: 'OpenSans',
    fontSize: wp(4),
    color: 'black',
    marginTop: hp(1),
    marginBottom: hp(1),
    textAlign:'center',
    marginHorizontal: wp(5)
  }
})
