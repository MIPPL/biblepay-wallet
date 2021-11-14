import React, { Component } from 'react'

import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    RefreshControl,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    AppState,
    Platform, BackHandler,
} from 'react-native';

import ProgressBar from 'react-native-progress/Bar';
import { connect } from 'react-redux'
import * as Keychain from "react-native-keychain";

// Styles
import styles from './Styles/DashboardScreenStyle'

import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'

import { NetworkSelectors } from '../Redux/NetworkRedux'

import AppConfig from '../Config/AppConfig'

import normalRepresentation from '../Helpers/normalRepresentation'

import TransactionItem from '../Components/TransactionItem'

import { Navigation } from 'react-native-navigation';

import Header from '../Components/TitleHeader'

import SendMoney from '../Images/send-money.svg'

import RequestMoney from '../Images/request-money.svg'
import WalletImage from '../Images/wallet.svg'
import WalletImageLight from '../Images/wallet-light.svg'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ItemStyle from '../Components/Styles/TransactionItemStyle'
import NetworkActions from '../Redux/NetworkRedux';
import {preStartApp2} from '../Navigation';
import {GlobalSelectors} from '../Redux/GlobalRedux';
import {defaultOptions} from '../Navigation';

const ITEM_HEIGHT = ItemStyle.container.height + ItemStyle.container.marginBottom

import I18n from '../I18n'
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';


class DashboardScreen extends Component {

  appState = null
  componentDidMount () {
      Navigation.events().bindComponent(this);
      AppState.addEventListener('change', this.handleAppState);
  }

  handleAppState = (nextAppState) => {
    if(this.appState==='background'&&nextAppState==='active'){
        AppState.removeEventListener('change', this.handleAppState);
        preStartApp2()
    }
    this.appState=nextAppState

  }

  didPressOnce=false

    componentDidAppear() {
        this.refresh()

        if(Platform.OS==='android')
            this.backhandler=BackHandler.addEventListener('hardwareBackPress', () => {
                if(!this.didPressOnce){
                    this.didPressOnce=true
                    setTimeout(()=>{
                        this.didPressOnce=false
                    },200)
                    return true;
                }else{
                    return false
                }

            });
        
        // check if enough account/change addresses are available. If not, create new ones.
        //console.log('@@ addresses: ' + JSON.stringify(this.props.accountAddress) + ',' + JSON.stringify(this.props.changeAddress));
        if (  typeof this.props.accountAddress === 'undefined'
        ||    typeof this.props.changeAddress === 'undefined'
        ||    this.props.isAddressPoolEmpty) {
          console.log("!! new addresses needed " + this.props.addresses.length);
          Keychain.getInternetCredentials(this.props.addresses[0].encryptedPrivKey).then(  (creds) => {
            this.props.generateNewAddresses( creds.username, creds.password, (error) => {
              if (error)  {
                  console.log('!! error ' + error); 
              }
              else    {
                  console.log('!! success ' + this.props.addresses.length);
                  this.props.fetchAddressInfo();
                  this.props.fetchAddressUtxo()
              }
            })  
          })  
        }
    }

    componentDidDisappear() {
        if(this.backhandler)
            this.backhandler.remove()
    }

  renderItem = ({item, index, separators}) => {
    return(
      <TransactionItem
        item={item}
        />)
  }

  refresh = () => {
    console.log('@@refresh')
      if (this.props.loadingAddressInfo==1) {
        this.props.fetchAddressInfo()
      } 
      this.props.getPrice();  
  }

  navToSend = () => {
    Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
            currentTabIndex: 1
        }
    })    
  }
  
  navToReceive = () => {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
          currentTabIndex: 2
      }
    })
  }

  render () {
    return (
      <SafeAreaView style={styles.container} >
        <ScrollView
                    contentContainerStyle={styles.container} bounces={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={this.refresh}/>} >
        <Header title={I18n.t('wallet')} parentComponentId={this.props.componentId}/>
        <View style={{alignItems:'center', marginTop: hp(1)}}>
          {this.props.lightTheme&&<WalletImageLight width={wp(14)} height={wp(14)} style={{align:'center'}}/>}
          {!this.props.lightTheme&&<WalletImage width={wp(14)} height={wp(14)} style={{align:'center'}}/>}
        </View>
        {this.renderLoadingIndicator()}
        <View style={styles.balanceContainer}>
            <View style={styles.balanceContainerItem}>
              <Text style={[this.props.lightTheme?styles.balanceTextLight:styles.balanceText, {textAlign: 'left'}]}>{I18n.t('yourBalanceStr')}</Text>
            </View>
            <View style={styles.balanceContainerItem}>
              <Text style={this.props.lightTheme?styles.balanceTextBigLight:styles.balanceTextBig}>{normalRepresentation(this.props.balance).toFixed(2)} {AppConfig.coinTicker}</Text>
              <Text style={this.props.lightTheme?styles.balanceTextLight:styles.balanceText}>{this.props.priceData.BBPUSD?(this.props.priceData.BBPUSD*this.props.balance/100000000).toFixed(2):null} USD</Text>
              <Text style={this.props.lightTheme?styles.balanceTextLight:styles.balanceText}>{this.props.priceData.BTCUSD?((this.props.priceData.BBPUSD*this.props.balance/100000000)/this.props.priceData.BTCUSD).toFixed(8):null} BTC</Text>
            </View>
          </View>
        <View style={styles.latestTxContainer}>
            <Text style={[this.props.lightTheme?styles.latestTxTextLight:styles.latestTxText, {textAlign: 'left'}]}>{I18n.t('latestTransactions')}</Text>
        </View>
        <FlatList
            data={this.props.transactions.slice(0,5)}
            renderItem={this.renderItem}
            bounces={false}
        />
        </ScrollView>
      </SafeAreaView>
    )
  }

  renderLoadingIndicator = () => {
    if ( this.props.loadingAddressInfo<1 ) {
        return (
          <View style={{alignItems:'center'}}>
            <ProgressBar progress={this.props.loadingAddressInfo} 
                width={wp(80)} 
                color='#971B20'
                />
          </View>
        );
    }
    return null;
  };
}

const mapStateToProps = (state) => {
  return {
    transactions: AccountSelectors.getTransactions(state),
    addresses: AccountSelectors.getAddresses(state),
    balance: AccountSelectors.getBalance(state),
    stats: NetworkSelectors.getStats(state),
    priceData: NetworkSelectors.getPriceData(state),
    lightTheme: GlobalSelectors.getUseLightTheme(state),
    accountAddress: AccountSelectors.getAccountAddress(state),
    changeAddress: AccountSelectors.getChangeAddress(state),
    isAddressPoolEmpty: AccountSelectors.isAddressPoolEmpty(state),
    loadingAddressInfo: AccountSelectors.getLoadingAddressInfo(state),
    loadingUtxoInfo: AccountSelectors.getLoadingUtxoInfo(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAddressInfo: ()=>dispatch(AccountActions.fetchAddressInfo()),
      fetchAddressUtxo: ()=>dispatch(AccountActions.fetchAddressUtxo()),
      getStats: () => dispatch(NetworkActions.fetchNetworkStats()),
      getPrice: (currency, reference) => dispatch(NetworkActions.fetchPriceData(currency, reference)),
      generateNewAddresses: ( username, password, callback) => dispatch(AccountActions.generateNewAddresses(username, password, callback)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
