import React, {Component} from 'react';

import {
    Clipboard,
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Platform, BackHandler, Linking,
} from 'react-native';

import AppConfig from '../Config/AppConfig'
import {connect} from 'react-redux';

// Styles
import styles from './Styles/TransactionDetailScreenStyle';

import parseParams from '../Helpers/ParseParamsFromQueryString';

import TxIn from '../Images/tx-in.svg'
import TxInLight from '../Images/tx-in-light.svg'
import TxOut from '../Images/tx-out.svg'
import NotBroadcasted from '../Images/unbroadcast.svg'
import Copy from '../Images/copy.svg'

import {Navigation} from 'react-native-navigation';

import Button from '../Components/Button';
import Header from '../Components/TitleHeader';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import normalRepresentation from '../Helpers/normalRepresentation';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {GlobalSelectors} from '../Redux/GlobalRedux';

import I18n from '../I18n'
import { hasPinCode } from '@haskkor/react-native-pincode/dist/src/utils';

const weekday = new Array(7);
weekday[0] = I18n.t('sunday');
weekday[1] = I18n.t('monday');
weekday[2] = I18n.t('tuesday');
weekday[3] = I18n.t('wednesday');
weekday[4] = I18n.t('thursday');
weekday[5] = I18n.t('friday');
weekday[6] = I18n.t('saturday');

class TransactionDetailScreen extends Component {

    URL_EXPLORER = 'https://blockbook.biblepay.org/';

    state = {
        copyText: I18n.t('pressToCopy')      
    };

    componentDidMount() {
        Navigation.events().bindComponent(this);
    }

    componentDidAppear() {
        this.refresh();
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

    copyTxid = () => {
        Clipboard.setString(this.props.transaction.txid)
        this.showCopiedLabel();
    };

    showCopiedLabel = () => {
        this.setState({copyText: I18n.t('copied')})
        setTimeout(()=>{
          this.setState({copyText: I18n.t('pressToCopy')})
        },3000)
    };

    refresh = () => {
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView bounces={false} automaticallyAdjustContentInsets={false}>
                <Header title={I18n.t('transaction')} parentComponentId={this.props.componentId}/>
                <View style={styles.innerContainerWrapper}>
                <View style={{alignItems:'center', marginTop: hp(1)}}>
                    {this.renderIcon()}
                </View>
                <Text style={[styles.txTitle,styles.txLabel,this.props.lightTheme?styles.txTitleLight:null]}>{I18n.t('transactionDetail')+' '}
                    <TouchableHighlight underlayColor="#99d9ea" onPress={this.copyTxid} style={{width: wp(9), height: wp(9)}}>
                        <Copy width={wp(8)} height={wp(8)} style={[styles.icon]}/>
                    </TouchableHighlight>
                </Text>
                <TouchableHighlight 
                    underlayColor="#99d9ea"
                    onPress={this.copyTxid}>
                    <Text style={[styles.txTitle,this.props.lightTheme?styles.txTitleLight:null]}>{this.props.transaction.txid}</Text>
                </TouchableHighlight>
                <View style={[styles.innerContainer, this.props.lightTheme?styles.containerBorderLight:styles.containerBorder, {flexDirection:'row'}]}>
                    <View style={styles.innerContainerRow30}>
                        <View>
                            <Text style={[this.props.lightTheme?styles.txLabelSmallLight:styles.txLabelSmall, styles.extraLabelMargin]}>{I18n.t('amount')}</Text>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraLabelMargin]}>{normalRepresentation(this.props.transaction.amount)} {AppConfig.coinTicker}</Text>
                        </View>
                    </View>
                    <View style={styles.innerContainerRow30}>
                        <View>
                            <Text style={[this.props.lightTheme?styles.txLabelSmallLight:styles.txLabelSmall, styles.extraLabelMargin]}>{I18n.t('confirmations')}</Text>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraLabelMargin]}>{this.props.transaction.confirmations}</Text>
                        </View>
                    </View>
                    <View style={styles.innerContainerRow30}>
                        <View>
                           <Text style={[this.props.lightTheme?styles.txLabelSmallLight:styles.txLabelSmall, styles.extraLabelMargin]}>{I18n.t('broadcasted')}</Text>
                            <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraLabelMargin]}>{this.props.transaction.broadcasted?I18n.t('yes'):I18n.t('no')}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.innerContainer, {flexDirection:'row', marginHorizontal: wp(6), marginTop: hp(2)}]}>
                    <View style={styles.innerContainerRow50}>
                        <View>
                            <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null]}>{I18n.t('date')}: </Text>
                            <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>
                                {new Date().toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.innerContainerRow50]}>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={[styles.textTitle, styles.extraMarginBottomText,this.props.lightTheme?styles.textTitleLight:null, { marginRight: wp(-4)}]}>{I18n.t('time')}: </Text>
                            <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>
                                {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2})$/, "")}
                            </Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.innerContainer}>
                    <View style={styles.seperator}/>
                    <View style={styles.innerContainerRow}>
                        <View>
                            {this.renderFrom()}
                            <Text style={[this.props.lightTheme?styles.txLabelSmallLight:styles.txLabelSmall, styles.extraMarginBottomText, {marginLeft: wp(-4)}]}>{I18n.t('to')}:</Text>
                            <TouchableHighlight 
                                underlayColor="#99d9ea"
                                onPress={this.copyTxid}>
                                <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.props.transaction.to}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Button label={I18n.t('showInExplorer')} onPress={()=>Linking.openURL(this.URL_EXPLORER+'tx/'+this.props.transaction.txid)} style={styles.button}/>
                </View>
                </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    renderIcon = () => {
        if(!this.props.transaction.broadcasted) {
            return (<NotBroadcasted width={wp(12)} height={wp(12)} style={styles.icon}/>)
        } else if (this.props.transaction.amount<0) {
            return (<TxOut width={wp(12)} height={wp(12)} style={styles.icon}/>)
        } else {
            if (this.props.lightTheme)
                    return (<TxInLight width={wp(12)} height={wp(12)} style={styles.icon}/>)
            else    return (<TxIn width={wp(12)} height={wp(12)} style={styles.icon}/>)
        }
    }

    renderFrom = () => {
        if (this.props.transaction.from!='')    
            return ( 
                <View>
                <Text style={[this.props.lightTheme?styles.txLabelSmallLight:styles.txLabelSmall, styles.extraMarginBottomText, {marginLeft: wp(-4)}]}>{I18n.t('from')}:</Text>
            <TouchableHighlight 
                underlayColor="#99d9ea"
                onPress={this.copyTxid}>
                <Text style={[this.props.lightTheme?styles.textSubTitleLight:styles.textSubTitle, styles.extraMarginBottomText]}>{this.props.transaction.from}</Text>
            </TouchableHighlight>
            </View> )

    }

}

const mapStateToProps = (state) => {
    return {
        lightTheme: GlobalSelectors.getUseLightTheme(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailScreen);
