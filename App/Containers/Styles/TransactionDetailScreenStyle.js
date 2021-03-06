import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  txTitle: {
    marginTop: hp(3),
    marginLeft: hp(3),
    marginRight: hp(3),
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: wp(4.5),
    color: 'white'
  },
  txTitleLight: {
    color: 'black'
  },
  txLabel:  {
    color: '#a2a5b7'
  },
  txLabelSmall:  {
    color: '#a2a5b7',
    fontFamily: 'OpenSans-Regular',
    textAlign: 'left',
    fontSize: wp(3),
    paddingHorizontal: wp(4)
  },
  txLabelSmallLight:  {
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    textAlign: 'left',
    fontSize: wp(3),
    paddingHorizontal: wp(4)
  },
  tickerText: {
    fontFamily: 'OpenSans-Regular',
    color: '#9D9FBE',
  },
  copyLabel: {
    fontFamily: 'OpenSans-Regular',
    color: '#9D9FBE',
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
    marginTop: wp(2)
  },
  iconContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    position: 'relative',
    top: -wp(0),
    right: 0,
    left: wp(93)/2 - wp(10)
  },
  iconContainerLight: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    position: 'relative',
    top: -wp(0),
    right: 0,
    left: wp(93)/2 - wp(10)
  },
  seperator: {
    width: wp(85),
    height: 1,
    borderStyle: 'solid',
    borderRadius: 1,
    borderWidth: 0.8,
    borderColor: '#971B20',
    marginBottom: hp(2.5),
    marginTop: hp(2),
  },
  textInlineContainer: {
    flexDirection: 'row',
    marginBottom: hp(1.5),
    width: wp(85)
  },
  textTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4),
    marginRight: wp(4),
    color: '#971B20'
  },
  textTitleLight: {
    color: 'black'
  },
  textSubTitle: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: wp(4),
  },
  textSubTitleLight: {
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    fontSize: wp(4),
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: hp(2)
  },
  containerBorder: {
    borderColor: '#971B20',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: hp(4),
    marginHorizontal: wp(5)
  },
  containerBorderLight: {
    borderColor: '#971B20',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: hp(4),
    marginHorizontal: wp(5)
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: hp(8)
  },
  extraMarginTop: {
    marginTop: hp(8)
  },
  innerContainerRow: {
    flexDirection: 'row',
    width: wp(85)
  },
  innerContainerRow30: {
    flexDirection: 'row',
    width: '33%'
  },
  innerContainerRow50: {
    flexDirection: 'row',
    width: '65%'
  },
  extraMarginBottomText: {
    marginBottom: hp(1.5),
  },
  extraLabelMargin: {
    marginTop: hp(1.5),
    paddingHorizontal: wp(3)
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
})
