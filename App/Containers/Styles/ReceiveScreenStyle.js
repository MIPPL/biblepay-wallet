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
    position: 'absolute',
    top: -wp(8),
    right: 0,
    left: wp(93)/2 - wp(10)
  },
  sendMoneyIconContainerLight: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    position: 'absolute',
    top: -wp(8),
    right: 0,
    left: wp(93)/2 - wp(10)
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
  textBold: {
    fontFamily: 'OpenSans-Bold'
  },
  text: {
    fontFamily: 'OpenSans-Regular'
  },
  seperatorTop: {
    width: wp(85),
    height: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: 'black',
    marginBottom: hp(5),
    marginTop: hp(2.5),
  },
  seperatorBottom: {
    width: wp(85),
    height: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: 'black',
    marginTop: hp(0),
    marginBottom: hp(2.5)
  },
  borderLight:  {
    borderColor: 'white',
  },
  firstText: {
    marginTop: hp(5.5),
    marginBottom: hp(1),
    fontSize: wp(4),
    color: 'white'
  },
  firstTextLight: {
    marginTop: hp(5.5),
    marginBottom: hp(1),
    fontSize: wp(4),
    color: 'black'
  },
  balanceText: {
    marginBottom: hp(2),
    fontSize: wp(6.5)
  },
  balanceTextLight: {
    marginBottom: hp(2),
    fontSize: wp(6.5),
    color: 'black'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#971B20',
    width: wp(83),
    paddingBottom: hp(1),
    paddingTop: hp(1.2),
    paddingRight: wp(2),
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    borderRadius: 10,
    textAlign: 'right',
    fontSize: wp(6),
  },
  textInputLight: {
    borderWidth: 1,
    borderColor: '#971B20',
    width: wp(83),
    paddingBottom: hp(1),
    paddingTop: hp(1.2),    
    paddingRight: wp(2),
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    borderRadius: 10,
    textAlign: 'right',
    fontSize: wp(6),
  },
  textInputContainer: {
    marginBottom: hp(4),
  },
  iconWithinInput: {
    position: 'absolute',
    right: 0,
    bottom: 1,
  },
  addressText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(4),
    marginTop: hp(1),
    color: 'white'
  },
  addressTextLight: {
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(4),
    marginTop: hp(1),
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
    color: '#971B20'
  },
  dateText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(5),
    color: 'white'
  },
  dateTextLight: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(5),
    color: 'black'
  },
  button: {
    width: wp(60),
    height: hp(6),
    marginTop: hp(4)
  },
  textAmountHint: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(4),
    color: '#a2a5b7',
    marginTop: hp(1)
  },
  textAmountHintLight: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(4),
    color: 'black',
    marginTop: hp(1)
  },
  labelText: {
    marginTop: hp(2),
    marginBottom: hp(1),
    fontSize: wp(4),
    fontFamily: 'OpenSans-Regular',
    color: '#a2a5b7',
    textAlign: 'left'
  },
  labelTextLight: {
    marginBottom: hp(1),
    fontSize: wp(4),
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    textAlign: 'left'
  },
  labelText2: {
    marginBottom: wp(2),
    fontSize: wp(5),
    fontFamily: 'OpenSans-Regular',
    color: '#a2a5b7',
    textAlign: 'left'
  },
  labelTextLight2: {
    marginBottom: wp(2),
    fontSize: wp(5),
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    textAlign: 'left'
  },
})
