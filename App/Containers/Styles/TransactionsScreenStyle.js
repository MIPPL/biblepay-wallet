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
  balanceContainer: {
    width: wp(100),
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  balanceText: {
    fontSize: wp(5)
  },
  icon: {
    height: hp(20),
    width: wp(20),
    marginHorizontal: wp(2),
    marginVertical: hp(2)
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginBottom: hp(3),
    borderWidth: 1,
    borderColor: '#971B20',
    borderRadius: 10
  },
  listHeaderInner: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },
  listHeaderInnerSelected: {
    backgroundColor: '#971B20',
    borderRadius: 10
  },
  listHeaderInnerSelectedLight: {
    backgroundColor: '#971B20',
    borderRadius: 10
  },
  listHeaderInnerText: {
    fontFamily: 'MADETOMMY-Bold',
    color: '#a2a5b7',
    fontSize: wp(5)
  },
  listHeaderInnerTextSelected: {
    color: 'white'
  },
  flatList: {
    marginTop: hp(2.5)
  },
  settingsIconContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10),
  },
  settingsIconContainerLight: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: wp(20),
    width: wp(20),
    left: wp(93)/2 - wp(10)
  },
})
