import React, { PureComponent } from 'react'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from './Styles/TransactionItemStyle'

import shortRepresentation from '../Helpers/shortRepresentation';

import AppConfig from '../Config/AppConfig'

import TxIn from '../Images/tx-in.svg'
import TxInLight from '../Images/tx-in-light.svg'
import TxOut from '../Images/tx-out.svg'
import NotBroadcasted from '../Images/unbroadcast.svg'

import { Navigation } from 'react-native-navigation';
import {defaultOptions} from '../Navigation';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {GlobalSelectors} from '../Redux/GlobalRedux';
import {connect} from 'react-redux';

class TransactionItem extends PureComponent {

    renderIcon = () => {
        if(!this.props.item.broadcasted) {
            return (<NotBroadcasted width={wp(9)} height={wp(9)} style={styles.icon}/>)
        } else if (this.props.item.amount<0) {
            return (<TxOut width={wp(9)} height={wp(9)} style={styles.icon}/>)
        } else {
            if (this.props.lightTheme)
                    return (<TxInLight width={wp(9)} height={wp(9)} style={styles.icon}/>)
            else    return (<TxIn width={wp(9)} height={wp(9)} style={styles.icon}/>)
        }
    }

    navToDetail = () => {
        Navigation.showModal( {component: {
            name: 'TransactionDetailScreen',
                options: defaultOptions(this.props.lightTheme),
                passProps: { transaction: this.props.item }
            }});
    }

  render () {
      return (
        <TouchableOpacity onPress={this.navToDetail}>
            <View style={this.props.lightTheme?styles.containerLight:styles.container}>
                {this.renderIcon()}
                <View style={{flex:1}}>
            <Text style={this.props.lightTheme?styles.addressTextLight:styles.addressText}>{this.props.item.to}</Text>
                <View style={styles.innerContainer}>
            <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>{new Date(this.props.item.blockTime*1000).toLocaleDateString()+' '+new Date(this.props.item.blockTime*1000).toLocaleTimeString()}</Text>
                    <Text style={[styles.amountText,(this.props.item.amount>0)?styles.textLightReceived:styles.textLightSent]}>{shortRepresentation(this.props.item.amount)} <Text style={styles.tickerText}>{AppConfig.coinTicker}</Text></Text>
                </View>
                </View>
            </View>
        </TouchableOpacity>
      )    
  }
}

const mapStateToProps = (state) => {
    return {
        lightTheme: GlobalSelectors.getUseLightTheme(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionItem)
