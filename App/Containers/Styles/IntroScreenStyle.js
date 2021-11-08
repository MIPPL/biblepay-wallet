import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  },
  containerWithGray: {
    backgroundColor: '#f2f4fa'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    flex: 0,
    backgroundColor: 'white'
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  logoContainer: {
    flex:0, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  wordContainer: {
    flex: 0,
    padding: wp(1),
    marginHorizontal: wp(0.5),
    marginVertical: wp(1),
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CCCCCC',
    backgroundColor: '#111111'
  },
  wordContainerSelected: {
    borderColor: '#000000',
    backgroundColor: '#000000'
  },
  wordsContainer: {
    flexDirection: 'row',
    width: wp(90),
    flexWrap: 'wrap',
    padding: wp(3)
  },
  word: {
    fontSize: wp(4),
    color: '#CCCCCC'
  },
  wordSelected: {
    color: '#000000'
  },
  logo: {
    height: wp(80),
    width: wp(80)
  },
  accountIcon: {
    height: wp(50),
    width: wp(55),
    marginVertical: hp(6)
  },
  accountSetupPage: {
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center'
  },
  accountSubTitle: {
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(4.5),
    marginTop: hp(1),
    marginBottom: hp(4),
    paddingHorizontal: wp(10),
    textAlign: 'center'
  },
  accountTitle: {
    fontFamily: 'MADETOMMY-Bold',
    color: 'white',
    fontSize: wp(5)
  },
  accountButton: {
    marginBottom: hp(3)
  },
  securityIcon: {
    height: wp(60),
    width: wp(60),
    marginTop: hp(6),
    marginBottom: hp(4)
  },
  mnemonicBold: {
    fontFamily: 'MADETOMMY',
    width: wp(20),
    height: hp(6),
    color: 'white',
    paddingBottom: 2,
    paddingTop: 2,
    fontSize: wp(4),
    fontWeight: '900'
  },
  mnemonic: {
    backgroundColor: '#111111',
    fontFamily: 'MADETOMMY',
    width: wp(20),
    height: hp(6),
    color: 'white',
    paddingBottom: 2,
    paddingTop: 2,
    fontSize: wp(4),
  },
  mnemonicError: {
    backgroundColor: '#111111',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    height: hp(6),
    width: wp(20),
    paddingBottom: 2,
    paddingTop: 2,
    fontFamily: 'MADETOMMY',
    color: 'red',
    fontSize: wp(4),
  },
  mnemonicFocus: {
    backgroundColor: '#111111',
    borderBottomWidth: 2,
    borderBottomColor: '#07299E',
    width: wp(20),
    height: hp(6),
    paddingBottom: 2,
    paddingTop: 2,
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(4),
  },
  mnemonicContainer: {
    width: wp(85),
    marginBottom: hp(2),
  },
  mnemonicContainerInner: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: hp(1),
    width: wp(85),
  },
  newMnemonicSubTitle: {
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(4.5),
    marginTop: hp(1),
    marginBottom: hp(3),
    paddingHorizontal: wp(10),
    textAlign: 'center'
  },
  mnemonicCheckSubTitle: {
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(4.5),
    marginTop: hp(1),
    marginBottom: hp(2.5),
    paddingHorizontal: wp(15),
    textAlign: 'center'
  },
  securityIconCheck: {
    height: wp(50),
    width: wp(50),
    marginTop: hp(4),
    marginBottom: hp(4)
  },
  securityIconCheckSmall: {
    height: wp(25),
    width: wp(25),
    marginTop: hp(4),
    marginBottom: hp(4)
  },
  textInputCheck: {
    width: wp(17),
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontFamily: 'MADETOMMY',
    fontSize: wp(4),
    textAlign: 'center',
    paddingBottom: 0,
    height: hp(4)
  },
  mnemonicCheckContainer: {
    width: wp(80)
  },
  mnemonicCheckInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1)

  },
  buttonCheck: {
    marginTop: hp(3)
  },
  textInputLong: {
    width: wp(80),
    borderBottomColor: '#f2f4fa',
    borderBottomWidth: 1,
    color: '#f2f4fa',
    fontSize: wp(4),
    paddingBottom: wp(1),
    fontFamily: 'MADETOMMY'
  },
  privateKeyPageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  privateKeyPageInnerContainer: {
    alignItems: 'center',
  },
  securityIconPrivKey: {
    height: wp(60),
    width: wp(60),
    marginBottom: hp(4)
  },
  sinFileImportText: {
    fontFamily: 'MADETOMMY',
    color: '#a2a5b7',
    fontSize: wp(5),
    marginTop: hp(2),
    marginBottom: hp(-2),
  },
  importSinKeyFileContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  importSinKeyFileInnerContainer: {
    alignItems: 'center',
  },
  securityIconSinFile: {
    height: wp(60),
    width: wp(60),
    marginBottom: hp(2)
  },
  sinFileSubTitle: {
    fontFamily: 'MADETOMMY',
    color: 'white',
    fontSize: wp(4.5),
    marginTop: hp(1),
    marginBottom: hp(1),
    paddingHorizontal: wp(15),
    textAlign: 'center'
  },
  textBold: {
    color: 'white',
    fontSize: wp(10),
    fontWeight : '900',
    marginLeft: wp(4),
    fontFamily: 'MADETOMMY-Bold'
  },
  textBoldLight: {
    fontSize: wp(10),
    color: '#000000',
    fontWeight : '900',
    marginLeft: wp(4),
    fontFamily: 'MADETOMMY-Bold'
  },
  textBold2: {
    color: 'white',
    fontSize: wp(7),
    fontWeight : '900',
    marginLeft: wp(4),
    marginBottom: wp(5),
    fontFamily: 'MADETOMMY-Bold'
  },
  textBoldLight2: {
    fontSize: wp(7),
    color: '#000000',
    fontWeight : '900',
    marginLeft: wp(4),
    marginBottom: wp(5),
    fontFamily: 'MADETOMMY-Bold'
  }
})
