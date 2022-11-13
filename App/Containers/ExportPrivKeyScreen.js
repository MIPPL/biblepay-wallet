import React, { Component } from 'react'

import { SafeAreaView, Text, FlatList, View,TextInput, Clipboard, StatusBar, Image, BackHandler, Platform } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/ExportPrivKeyScreenStyle'


import { AccountSelectors } from '../Redux/AccountRedux'
import QRCode from 'react-native-qrcode-svg';
import Button from '../Components/Button';
import Header from '../Components/TitleHeader';
import Export from '../Images/export-white.svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {Navigation} from 'react-native-navigation';
import {GlobalSelectors} from '../Redux/GlobalRedux';
import I18n from '../I18n'

const weekday = new Array(7);
weekday[0] = I18n.t('sunday');
weekday[1] = I18n.t('monday');
weekday[2] = I18n.t('tuesday');
weekday[3] = I18n.t('wednesday');
weekday[4] = I18n.t('thursday');
weekday[5] = I18n.t('friday');
weekday[6] = I18n.t('saturday');
import * as Keychain from "react-native-keychain";
import '../../shim.js'
import AppConfig from '../Config/AppConfig'
import decrypt from '../Helpers/decrypt';

const crypto = require('crypto');
class ReceiveScreen extends Component {

  state = {
    qrValue : AppConfig.coinTicker.toLowerCase()+':'+this.props.addresses[0].address,
    copyText: I18n.t('copy'),
    privateKey: ''
  }

  componentDidMount () {
    Navigation.events().bindComponent(this);

    Keychain.getInternetCredentials(this.props.addresses[0].encryptedPrivKey).then((creds)=>{
      var decryptedPrivateKey = decrypt({encryptedData:this.props.addresses[0].encryptedPrivKey, iv: creds.username, key: creds.password})
      this.setState({privateKey: decryptedPrivateKey})
    })
  }

  componentDidAppear() {
    if(Platform.OS==='android')
      this.backhandler=BackHandler.addEventListener('hardwareBackPress', () => {
        Navigation.mergeOptions(this.props.componentId, {
          bottomTabs: {
            currentTabIndex: 2
          }
        })
        return true;
      });
  }

  componentDidDisappear() {
    if(this.backhandler)
      this.backhandler.remove()
  }

  changeQrValue = (amount) => {
    if(parseFloat(amount)){
      this.setState({qrValue : this.props.addresses[0].address+'?amount='+parseFloat(amount)})
    }else{
      this.setState({qrValue : this.props.addresses[0].address})
    }
  }

  copyAddress = () => {
    Clipboard.setString(this.state.privateKey)
    this.setState({copyText: I18n.t('copied')})
    setTimeout(()=>{
      this.setState({copyText: I18n.t('copy')})
    },3000)
  }


  render () {
    return (
      <SafeAreaView style={styles.container} >
          <Header title={I18n.t('export')} parentComponentId={this.props.componentId}/>
        <View style={{flex:1,justifyContent: 'center'}}>
        <View style={styles.innerContainerWrapper}>

          <View style={this.props.lightTheme?styles.innerContainerLight:styles.innerContainer}>
            <View style={[styles.sendMoneyIconContainer,this.props.lightTheme?styles.lightContainer:null]}>
              <Export width={wp(15)} height={wp(15)}/>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp(3.5)}}>
              <Text style={[styles.textBold, this.props.lightTheme?styles.firstTextLight:styles.firstText]}>{AppConfig.coinName.toUpperCase()} </Text><Text
                style={[styles.text, this.props.lightTheme?styles.firstTextLight:styles.firstText]}>{I18n.t('address').toUpperCase()}</Text>
            </View>
            <Text style={[this.props.lightTheme?styles.addressTextLight:styles.addressText]}>{this.props.addresses[0].address}</Text>
            <View style={styles.textInputContainer}>
              <Text style={this.props.lightTheme?styles.textAmountHintLight:styles.textAmountHint}>{I18n.t('yourPrivKey').toUpperCase()}</Text>

            </View>
            <View style={styles.seperatorTop}/>
            <View style={styles.textInputContainer}>
              <Text style={this.props.lightTheme?styles.privKeyTextLight:styles.privKeyText}>{this.state.privateKey}</Text>

            </View>

          </View>
          
          <Button label={this.state.copyText} onPress={this.copyAddress} style={styles.button}/>
        </View>
        </View>
          </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: AccountSelectors.getTransactions(state),
    balance: AccountSelectors.getBalance(state),
    addresses: AccountSelectors.getAddresses(state),
    lightTheme: GlobalSelectors.getUseLightTheme(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveScreen)
