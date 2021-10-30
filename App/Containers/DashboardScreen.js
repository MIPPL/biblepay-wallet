import React, { Component } from 'react'

import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    RefreshControl,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    AppState,
    Platform, BackHandler,
} from 'react-native';

import { connect } from 'react-redux'

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

        // pre-load recent node list 
        var nodeAddresses = this.props.addresses
                .filter( addObj => addObj.transactions.length>0 && addObj.address!=this.props.addresses[0].address )
                .map( addObj => addObj.address );

        this.props.getNodeInfo( nodeAddresses , ( success, strmessage ) => {
        });

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
        this.props.fetchAddressInfo()
        this.props.getStats()
  }

  navToSend = () => {
    /*
    Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
            currentTabIndex: 0
        }
    })
    */
    
    Navigation.showModal( {component: {
        name: 'SendScreen',
            options: defaultOptions(this.props.lightTheme)
        }})
  }
  
  navToReceive = () => {
    /*Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
          currentTabIndex: 1
      }
  })
      */
  
    Navigation.showModal( {component: {
        name: 'ReceiveScreen',
            options: defaultOptions(this.props.lightTheme)
        }})

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
        <View style={styles.balanceContainer}>
            <View style={styles.balanceContainerItem}>
              <Text style={[this.props.lightTheme?styles.balanceTextLight:styles.balanceText, {textAlign: 'left'}]}>{I18n.t('yourBalanceStr')}</Text>
            </View>
            <View style={styles.balanceContainerItem}>
              <Text style={this.props.lightTheme?styles.balanceTextBigLight:styles.balanceTextBig}>{normalRepresentation(this.props.balance).toFixed(2)} {AppConfig.coinTicker}</Text>
              <Text style={this.props.lightTheme?styles.balanceTextLight:styles.balanceText}>{this.props.stats.usdPrice?(this.props.stats.usdPrice*this.props.balance/100000000).toFixed(2):null} USD</Text>
              <Text style={this.props.lightTheme?styles.balanceTextLight:styles.balanceText}>{this.props.stats.lastPrice?(this.props.stats.lastPrice*this.props.balance/100000000).toFixed(8):null} BTC</Text>
            </View>
          </View>
          <View style={styles.balanceContainer}>
            <View style={this.props.lightTheme?styles.sendReceiveContainerLight:styles.sendReceiveContainer}>
              <TouchableOpacity style={styles.sendReceiveInnerContainer} onPress={this.navToSend}>
              <SendMoney width={wp(12)} height={wp(12)}/>
                  <Text style={styles.sendReceiveText}>{I18n.t('send').toUpperCase()}</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.seperator}/>
            <View style={this.props.lightTheme?styles.sendReceiveContainerLight:styles.sendReceiveContainer}>
              <TouchableOpacity style={styles.sendReceiveInnerContainer} onPress={this.navToReceive}>
              <RequestMoney width={wp(12)} height={wp(12)}/>
                  <Text style={styles.sendReceiveText}>{I18n.t('receive').toUpperCase()}</Text>
              </TouchableOpacity>
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
}

const mapStateToProps = (state) => {
  return {
    transactions: AccountSelectors.getTransactions(state),
    addresses: AccountSelectors.getAddresses(state),
    balance: AccountSelectors.getBalance(state),
    stats: NetworkSelectors.getStats(state),
    lightTheme: GlobalSelectors.getUseLightTheme(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAddressInfo: ()=>dispatch(AccountActions.fetchAddressInfo()),
      getStats: () => dispatch(NetworkActions.fetchNetworkStats())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
