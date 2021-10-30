import React, { Component } from 'react'

import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    TextInput,
    Clipboard,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Platform, BackHandler,
} from 'react-native';

import { connect } from 'react-redux'

// Styles
import styles from './Styles/NetworkScreenStyle'

import longRepresentation from '../Helpers/longRepresentation';
import NetworkActions, { NetworkSelectors } from '../Redux/NetworkRedux'

import Header from '../Components/TitleHeader';
import {Navigation} from 'react-native-navigation';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import NetworkIcon from '../Images/network-white.svg'
import NetworkIconLight from '../Images/network.svg'
import Network from '../Images/stats-network-white.svg'
import NetworkLight from '../Images/stats-network.svg'
import Addresses from '../Images/stats-addresses-white.svg'
import AddressesLight from '../Images/stats-addresses.svg'
import {GlobalSelectors} from '../Redux/GlobalRedux';
import I18n from '../I18n'
import AppConfig from '../Config/AppConfig'
import { hasPinCode } from '@haskkor/react-native-pincode/dist/src/utils';

class NetworkScreen extends Component {

    // stats refresh
    timerInterval;

    componentDidMount () {
        Navigation.events().bindComponent(this);
        this.timerInterval = setInterval(this.getData.bind(this), 60*1000);
    }

    getData()   {
        this.props.getStats()
    }

    componentDidAppear() {
        this.props.getStats()
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

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    numberWithCommas(x) {
        return this.chunkSubstr(x.toString(), 3, ',');
    }

    reverse(s) {
	return s.split("").reverse().join("");
    }

    chunkSubstr(s, size, separator) {
        var str = this.reverse(s);
	const numChunks = Math.ceil(str.length / size)
        const chunks = new Array(numChunks)
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
          chunks[i] = this.reverse(str.substr(o, size))
        }
        return chunks.reverse().join(separator)
    }

    renderInner = () => {
        if(this.props.stats.lastPrice){
            return(<ScrollView contentContainerStyle={styles.scrollView}>
                <View style={[styles.statsContainer, this.props.lightTheme?styles.statsContainerLight:null]}>
                    <View style={{alignItems:'center', marginTop: hp(-6)}}>
                        {this.props.lightTheme&&<NetworkIconLight width={wp(10)} height={wp(10)} style={{align:'center'}}/>}
                        {!this.props.lightTheme&&<NetworkIcon width={wp(10)} height={wp(10)} style={{align:'center'}}/>}
                    </View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={[styles.statsTitle,this.props.lightTheme?styles.statsTitleLight:null]}>{I18n.t('network')}</Text>
                        {this.props.lightTheme&&<NetworkLight style={{marginTop:hp(4), marginRight:wp(4)}} width={wp(10)} height={wp(10)}/>}
                        {!this.props.lightTheme&&<Network style={{marginTop:hp(4), marginRight:wp(4)}} width={wp(10)} height={wp(10)}/>}
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={styles.seperator}/>
                        <View style={styles.innerContainerRow}>
                        <View style={{width:wp(60)}}>
                            <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('hashrate')}</Text>
                            <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('difficulty')}</Text>                        
                            <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('lastPrice')}</Text>
                            <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('height')}</Text>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.props.stats.hashrate} (GH/s)</Text>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.props.stats.difficulty.toFixed(4)}</Text>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{longRepresentation(this.props.stats.lastPrice)} SAT</Text>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.props.stats.explorerHeight}</Text>
                        </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.statsContainer, this.props.lightTheme?styles.statsContainerLight:null]}>
                    <View style={{flex:1,flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={[styles.statsTitle,this.props.lightTheme?styles.statsTitleLight:null]}>{I18n.t('addresses')}</Text>
                        {this.props.lightTheme&&<AddressesLight style={{marginTop:hp(3), marginRight:wp(4)}} width={wp(10)} height={wp(10)}/>}
                        {!this.props.lightTheme&&<Addresses style={{marginTop:hp(4), marginRight:wp(4)}} width={wp(10)} height={wp(10)}/>}
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={styles.seperator}/>
                            <View style={styles.innerContainerRow}>
                            <View style={{width:wp(55)}}>
                                <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('addresses')}</Text>
                                <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('active')}</Text>
                                <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('top').toUpperCase()} 10 </Text>
                                <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('top').toUpperCase()} 50 </Text>
                            </View>
                            <View style={{alignItems:'flex-end', marginRight: wp(2)}}>
                                <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.numberWithCommas(this.props.stats.explorerAddresses)}</Text>
                                <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.numberWithCommas(this.props.stats.explorerActiveAddresses)}</Text>
                                <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.numberWithCommas(this.props.stats.explorerTop10.toFixed(0))} {AppConfig.coinTicker}</Text>
                                <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.numberWithCommas(this.props.stats.explorerTop50.toFixed(0))} {AppConfig.coinTicker}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                </ScrollView>
            )
        }

        return null
    }

    getROIBIG() {
        return (1000000/((720/this.props.stats.inf_online_big)*1725));
    }

    getROIMID() {
        return (500000/((720/this.props.stats.inf_online_mid)*838));
    }

    getROIMINI() {
        return (100000/((720/this.props.stats.inf_online_lil)*560));
    }

    getROIPercent( roi )    {
        return (365/roi)*100-100;
    }

  render () {
    return (
      <SafeAreaView style={styles.container}>
          <Header title={I18n.t('stats')} parentComponentId={this.props.componentId}/>

              {this.renderInner()}

      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      stats: NetworkSelectors.getStats(state),
      lightTheme: GlobalSelectors.getUseLightTheme(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getStats: () => dispatch(NetworkActions.fetchNetworkStats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkScreen)
