import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  settingContainer: {
    width: wp(95),
    height: hp(8),
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingContainerDark1: {
    backgroundColor: '#971B20'
  },
  settingContainerDark2: {
    backgroundColor: '#660000'
  },
  settingContainerLight1: {
    backgroundColor: 'white',
    borderColor: '#971B20',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  settingContainerLight2: {
    backgroundColor: 'white',
  },
  settingsWrapper: {
    alignItems: 'center',
    marginTop: hp(12)
  },
  settingsWrapperAPI: {
    alignItems: 'center',
    marginTop: hp(10)
  },
  settingInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: hp(10),
    width: wp(10),
    marginHorizontal: wp(2),
    marginVertical: hp(2)
  },
  iconHeader: {
    height: hp(14),
    width: wp(14),
    marginTop: hp(-11)
  },
  titleBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4),
    color: 'white'
  },
  titleBoldLight: {
    color: 'white'
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(4),
    color: 'white'
  },
  titleLight: {
    color: 'black'
  },
  subTitle: {
    fontFamily: 'OpenSans-Regular',
    color: '#a2a5b7',
    fontSize: wp(3),
    marginTop: hp(0.5)
  },
  subTitleLight: {
    color: '#a2a5b7'
  },
  arrow: {
    fontFamily: 'OpenSans-Regular',
    fontSize: wp(5),
    marginRight: wp(3),
    color: 'white'
  },
  arrowLight: {
    color: 'white'
  },
  titleWrapper: {
    flexDirection: 'row'
  },
  settingsIconContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10),
    marginBottom: hp(6)
  },
  settingsIconContainerLight: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10),
    marginBottom: hp(6)
  },
  
})
