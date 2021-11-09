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
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: wp(8),
    marginTop: hp(2),
    marginBottom: wp(2),
  },
  balanceContainerItem: {
    width: '50%',
    height: wp(18),
  },
  balanceText: {
    fontSize: wp(4),
    color: '#a2a5b7',
    fontFamily: 'MADETOMMY',
    textAlign: 'right'
  },
  balanceTextBold: {
    fontFamily: 'MADETOMMY-Bold'
  },
  balanceTextBig: {
    fontFamily: 'MADETOMMY-Bold',
    color: 'white',
    fontSize: wp(5),
    textAlign: 'right'
  },
  balanceTextLight: {
    fontSize: wp(4),
    color: '#000000',
    fontFamily: 'MADETOMMY',
    textAlign: 'right'
  },
  balanceTextBigLight: {
    fontFamily: 'MADETOMMY-Bold',
    color: '#000000',
    fontSize: wp(5),
    textAlign: 'right'
  },
  sendReceiveContainer: {
    height: wp(32),
    backgroundColor: '#971B20',
    borderRadius: 10,
    padding: wp(6),
    width: '46%'
  },
  sendReceiveContainerLight: {
    height: wp(32),
    backgroundColor: '#971B20',
    borderRadius: 10,
    padding: wp(6),
    width: '46%'
  },
  sendReceiveInnerContainer: {
    alignItems: 'center'
  },
  seperator: {
    height: hp(11),
    width: '8%',
    borderRadius: 5,
  },
  sendReceiveText: {
    marginTop: hp(1),
    color: 'white',
    fontFamily: 'MADETOMMY'
  },
  latestTxContainer: {
    marginLeft: wp(6),
    marginTop: hp(0),
    marginBottom: hp(1),
  },
  latestTxText: {
    fontSize: wp(5),
    color: 'white',
    fontFamily: 'MADETOMMY',
  },
  latestTxTextLight: {
    fontSize: wp(5),
    color: 'black',
    fontFamily: 'MADETOMMY',
  }
})
