import React, { Component } from 'react'

import {
  SafeAreaView,
  Text,
  View,
  Image,
} from 'react-native';

import { connect } from 'react-redux'

// Styles
import styles from './Styles/ViewMnemonicStyle'

import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'
import { GlobalSelectors } from '../Redux/GlobalRedux';

import Swiper from 'react-native-swiper'

import {Navigation} from 'react-native-navigation';
import I18n from '../I18n'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons'
import SecurityIcon from '../Images/security-icon.png'
import BackgroundIntro from '../Images/background_welcome.svg'

import decrypt from '../Helpers/decrypt';
import * as Keychain from "react-native-keychain";

class ViewMnemonic extends Component {
    state = {
      mnemonic: '',
    }
  
    componentDidMount () {
      console.log('@@mount get mnemonic: '+this.props.addresses[0].encryptedPrivKey)
        Keychain.getInternetCredentials(this.props.addresses[0].encryptedPrivKey).then((creds)=>{
          console.log('@@mount1 '+creds.username)
            decryptedMnemonic = decrypt({encryptedData:this.props.addresses[0].encryptedPrivKey, iv: creds.username, key: creds.password})
            console.log('@@mount2 '+decryptedMnemonic)
            this.setState({mnemonic: decryptedMnemonic})
        })
    }

    renderBackIcon = () =>  {
        return (  <Icon name="md-arrow-back" size={wp(10)} color={this.props.lightTheme?'black':'white'} style={{height: wp(10), position: 'absolute', top: hp(2), left: hp(2)}} onPress={()=>Navigation.dismissModal(this.props.componentId)}/>)
    }

    render () {
        return (
        <View style={{flex:1}}>
          <SafeAreaView style={styles.header} />
          <SafeAreaView style={styles.container} >
            <Swiper ref={'swiper'} showsPagination={false} autoplay={false} loop={false} scrollEnabled={false} showsButtons={false}>
              <View style={{flex:1,alignItems:'center'}}>
                {this.renderBackIcon()}
                <Image source={SecurityIcon} style={styles.securityIconCheck} resizeMode={'stretch'}/>
                <Text style={this.props.lightTheme?styles.accountTitleLight:styles.accountTitle}>{I18n.t('protectYourWallet')}</Text>
                <Text  style={this.props.lightTheme?styles.newMnemonicSubTitleLight:styles.newMnemonicSubTitle}>{I18n.t('protectLongText')}</Text>
                <View style={styles.mnemonicContainer}>
                  <View style={styles.mnemonicContainerInner}>{this.state.mnemonic.split(' ').slice(0,4).map(word=>(<Text style={this.props.lightTheme?styles.mnemonicBoldLight:styles.mnemonicBold}>{word}</Text>))}</View>
                  <View style={styles.mnemonicContainerInner}>{this.state.mnemonic.split(' ').slice(4,8).map(word=>(<Text style={this.props.lightTheme?styles.mnemonicBoldLight:styles.mnemonicBold}>{word}</Text>))}</View>
                  <View style={styles.mnemonicContainerInner}>{this.state.mnemonic.split(' ').slice(8).map(word=>(<Text style={this.props.lightTheme?styles.mnemonicBoldLight:styles.mnemonicBold}>{word}</Text>))}</View>
                </View>
              </View>
            </Swiper>
          </SafeAreaView>
        </View>
        )
    }       
}

const mapStateToProps = (state) => {
    return {
      addresses: AccountSelectors.getAddresses(state),
      lightTheme: GlobalSelectors.getUseLightTheme(state)
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      generateAddressFromMnemonic: (mnemonic, callback) => dispatch(AccountActions.generateAddressFromMnemonic(mnemonic, callback)),
      migrateFromMnemonic: (mnemonic, creds, callback) => dispatch(AccountActions.migrateFromMnemonic(mnemonic, creds, callback)),
      getAddressFromPrivKey: (privateKey, callback) => dispatch(AccountActions.getAddressFromPrivKey(privateKey, callback)),
      getAddressFromSinFile: (cipherTxt, vSalt, rounds, passphrase, callback) => dispatch(AccountActions.getAddressFromSinFile(cipherTxt, vSalt, rounds, passphrase, callback)),
      startup: () => dispatch(StartupActions.startup()),
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewMnemonic)
  