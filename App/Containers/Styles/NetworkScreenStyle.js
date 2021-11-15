import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    width: wp(95),
    backgroundColor: 'black',
    borderRadius: 3
  },
  statsContainerLight: {
    backgroundColor: 'white'
  },
  statsIconContainer: {
    backgroundColor: '#971B20',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10)
  },
  statsIconContainerLight: {
    backgroundColor: '#4F9FDE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10)
  },
  statsTitle: {
    marginTop: hp(6),
    marginLeft: wp(5),
    fontFamily: 'OpenSans',
    textAlign: 'left',
    fontSize: wp(4.5),
    color: 'white'
  },
  statsTitleLight: {
    color: 'black'
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
    fontFamily: 'OpenSans',
    fontSize: wp(4),
    marginRight: wp(4),
    color: '#a2a5b7'
  },
  textTitleLight: {
    color: 'black'
  },
  textSubTitle: {
    fontFamily: 'OpenSans',
    color: 'white',
    fontSize: wp(4),
  },
  textSubTitleLight: {
    fontFamily: 'OpenSans',
    color: 'black',
    fontSize: wp(4),
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: hp(2)
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
  extraMarginBottomText: {
    marginBottom: hp(1.5),
  },
  gold: {
    color: '#bc8f3a'
  },
  silver: {
    color: '#82829c'
  },
  red: {
    color: '#ab1f29'
  }

})
