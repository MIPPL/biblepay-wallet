import React, { Component } from 'react'

import { SafeAreaView, Text, FlatList, View,TextInput, Clipboard, StatusBar, Image, BackHandler, Platform } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/ReceiveScreenStyle'


import { AccountSelectors } from '../Redux/AccountRedux'
import QRCode from 'react-native-qrcode-svg';
import Button from '../Components/Button';
import Header from '../Components/TitleHeader';
import RequestMoney from '../Images/request-money.svg';
import RequestMoneyLight from '../Images/request-money-light.svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {Navigation} from 'react-native-navigation';
import {GlobalSelectors} from '../Redux/GlobalRedux';
import { NetworkSelectors } from '../Redux/NetworkRedux'

import AppConfig from '../Config/AppConfig'

const weekday = new Array(7);
weekday[0] = I18n.t('sunday');
weekday[1] = I18n.t('monday');
weekday[2] = I18n.t('tuesday');
weekday[3] = I18n.t('wednesday');
weekday[4] = I18n.t('thursday');
weekday[5] = I18n.t('friday');
weekday[6] = I18n.t('saturday');

import I18n from '../I18n'


class ReceiveScreen extends Component {

  state = {
    qrValue : 'sin:'+this.props.addresses[0].address,
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
      this.setState({qrValue : 'sin:'+this.props.addresses[0].address+'?amount='+parseFloat(amount)})
    }else{
      this.setState({qrValue : 'sin:'+this.props.addresses[0].address})
    }
  }

  copyAddress = () => {
    Clipboard.setString(this.props.addresses[0].address)
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
            <View style={{alignItems:'center', marginTop: hp(-3), marginBottom: hp(2)}}>
              {this.props.lightTheme&&<RequestMoneyLight width={wp(12)} height={wp(12)} style={{marginLeft: wp(2)}}/>}
              {!this.props.lightTheme&&<RequestMoney width={wp(12)} height={wp(12)} style={{marginLeft: wp(2)}}/>}
            </View>
            <QRCode
                value={this.state.qrValue}
                size={wp(40)}
                quietZone={5}
                color={this.props.lightTheme?'white':'black'}
                backgroundColor={this.props.lightTheme?'#000000':'white'}/>
            
            <View style={styles.textInputContainer}>
              <Text style={this.props.lightTheme?styles.labelTextLight:styles.labelText}>{I18n.t('myAddress')}:</Text>
              <Text style={[this.props.lightTheme?styles.addressTextLight:styles.addressText]}>{this.props.addresses[0].address}</Text>

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
                    <Text style={this.props.lightTheme?styles.labelTextLight2:styles.labelText2}>{this.props.stats.usdPrice&&!isNaN(this.state.amount)?(this.props.stats.usdPrice*this.state.amount).toFixed(2):Number.parseFloat(0.0).toFixed(2)} USD</Text>
                    <Text style={this.props.lightTheme?styles.labelTextLight2:styles.labelText2}>{this.props.stats.lastPrice&&!isNaN(this.state.amount)?(this.props.stats.lastPrice*this.state.amount).toFixed(8):Number.parseFloat(0.0).toFixed(8)} BTC</Text>                              
                </View>
            </View>
            <View style={styles.dateContainer}>
              <View>
                <Text style={this.props.lightTheme?styles.dateTextTitleLight:styles.dateTextTitle}>
                  {weekday[new Date().getDay()].toUpperCase()}
                </Text>
                <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={this.props.lightTheme?styles.dateTextTitleLight:styles.dateTextTitle}>
                  {I18n.t('time').toUpperCase()}
                </Text>
                <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>
                  {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2})$/, "")}
                </Text>
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
    lightTheme: GlobalSelectors.getUseLightTheme(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveScreen)
