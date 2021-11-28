import React, { Component } from 'react'

import { SafeAreaView, Text, FlatList, View,TextInput, Clipboard, StatusBar, Image, BackHandler, Platform, TouchableHighlight } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/ReceiveScreenStyle'


import { AccountSelectors } from '../Redux/AccountRedux'
import QRCode from 'react-native-qrcode-svg';
import Button from '../Components/Button';
import Header from '../Components/TitleHeader';
import RequestMoney from '../Images/request-money.svg';
import RequestMoneyLight from '../Images/request-money-light.svg';
import Copy from '../Images/copy.svg'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {Navigation} from 'react-native-navigation';
import {GlobalSelectors} from '../Redux/GlobalRedux';
import { NetworkSelectors } from '../Redux/NetworkRedux'

import AppConfig from '../Config/AppConfig'

import I18n from '../I18n'


class ReceiveScreen extends Component {

  state = {
    qrValue : AppConfig.coinPrefixQR + ':' + this.props.accountAddress.address,
    copyText: I18n.t('copy'),
    amount: null
  }

  componentDidMount () {
    Navigation.events().bindComponent(this);

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
      this.setState({qrValue : AppConfig.coinPrefixQR + ':'+this.props.accountAddress.address+'?amount='+parseFloat(amount)})
    }else{
      this.setState({qrValue : AppConfig.coinPrefixQR + ':'+this.props.accountAddress.address})
    }
  }

  copyAddress = () => {    
    Clipboard.setString(this.props.accountAddress.address)
    this.setState({copyText: I18n.t('copied')})
    setTimeout(()=>{
      this.setState({copyText: I18n.t('copy')})
    },3000)
  }


  render () {
    return (
      <SafeAreaView style={styles.container} >
        <KeyboardAwareScrollView bounces={false} automaticallyAdjustContentInsets={false}>
          <Header title={I18n.t('receive')} parentComponentId={this.props.componentId}/>
        <View style={styles.innerContainerWrapper}>

          <View style={this.props.lightTheme?styles.innerContainerLight:styles.innerContainer}>
            <QRCode
                value={this.state.qrValue}
                size={wp(40)}
                quietZone={5}
                color={this.props.lightTheme?'white':'black'}
                backgroundColor={this.props.lightTheme?'#000000':'white'}/>
            
            <View style={styles.textInputContainer}>
              <Text style={[this.props.lightTheme?styles.addressTextLight:styles.addressText]}>{this.props.accountAddress.address}
                <TouchableHighlight underlayColor="#99d9ea" onPress={this.copyAddress} style={{width: wp(9), height: wp(9)}}>
                    <Copy width={wp(8)} height={wp(8)} style={[styles.icon]}/>
                </TouchableHighlight>
              </Text>
              <Text></Text>
              <Text style={this.props.lightTheme?styles.labelTextLight:styles.labelText}>{I18n.t('amount')}:</Text>
              <TextInput editable placeholder={''} style={this.props.lightTheme?styles.textInputLight:styles.textInput}
                         onChangeText={(amount)=>{
                           this.changeQrValue(amount); 
                           this.setState({amount});}} 
                         keyboardType={'decimal-pad'} textAlign={'right'}
                         placeholderTextColor={this.props.lightTheme?'black':'white'}
                         />
            </View>
            <View style={styles.dateContainer}>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={this.props.lightTheme?styles.labelTextLight2:styles.labelText2}>{this.props.priceData&&this.props.priceData.BBPUSD&&!isNaN(this.state.amount)?(this.props.priceData.BBPUSD*this.state.amount).toFixed(2):Number.parseFloat(0.0).toFixed(2)} USD</Text>
                  <Text style={this.props.lightTheme?styles.labelTextLight2:styles.labelText2}>{this.props.priceData&&this.props.priceData.BTCUSD&&!isNaN(this.state.amount)?((this.props.priceData.BBPUSD*this.state.amount)/this.props.priceData.BTCUSD).toFixed(8):Number.parseFloat(0.0).toFixed(8)} BTC</Text>                                            
                </View>
            </View>
          </View>
        
          <Button label={this.state.copyText} onPress={this.copyAddress} style={styles.button}/>
        </View>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: AccountSelectors.getTransactions(state),
    balance: AccountSelectors.getBalance(state),
    addresses: AccountSelectors.getAddresses(state),
    stats: NetworkSelectors.getStats(state),
    lightTheme: GlobalSelectors.getUseLightTheme(state),
    accountAddress: AccountSelectors.getAccountAddress(state),
    changeAddress: AccountSelectors.getChangeAddress(state),
    priceData: NetworkSelectors.getPriceData(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveScreen)
