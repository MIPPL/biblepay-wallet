import React, { PureComponent } from 'react'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from './Styles/NodeItemStyle'

import normalRepresentation from '../Helpers/normalRepresentation';

import AppConfig from '../Config/AppConfig'
import NetworkActions, { NetworkSelectors } from '../Redux/NetworkRedux'

import I18n from '../I18n'

import MiniNode from '../Images/minilogo.svg'
import MidNode from '../Images/midlogo.svg'
import BigNode from '../Images/biglogo.svg'
import MiniNodeLight from '../Images/minilogo-light.svg'
import MidNodeLight from '../Images/midlogo-light.svg'
import BigNodeLight from '../Images/biglogo-light.svg'

import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {GlobalSelectors} from '../Redux/GlobalRedux';
import {connect} from 'react-redux';

class NodeItem extends PureComponent {

    renderIcon = () => {
        switch (this.props.item.tier)   {
            case "100000":
                // opposite LIGHT = icon for DARK theme
                if (this.props.lightTheme)  return (<MiniNodeLight width={wp(9)} height={wp(9)} style={styles.icon}/>)
                else                        return (<MiniNode width={wp(9)} height={wp(9)} style={styles.icon}/>)
            case "500000":
                if (this.props.lightTheme)  return (<MidNodeLight width={wp(9)} height={wp(9)} style={styles.icon}/>)
                else                        return (<MidNode width={wp(9)} height={wp(9)} style={styles.icon}/>)
            case "1000000":
                if (this.props.lightTheme)  return (<BigNodeLight width={wp(9)} height={wp(9)} style={styles.icon}/>)
                else                        return (<BigNode width={wp(9)} height={wp(9)} style={styles.icon}/>)
    
        }
    }

    getDaysLeft = () => {
        return Number.parseInt((this.props.item.end-this.props.stats.explorerHeight)*AppConfig.BLOCK_TARGET/(60*24));
    }

    getExpirationDate = () => {
        var today = new Date();
        var ret = new Date(today.getTime()+(this.getDaysLeft()*24*3600*1000)).toLocaleDateString();
        return ret;
    }
    
  render () {

      return (
        <View style={[this.props.lightTheme?styles.containerLight:styles.container]}>
            {this.renderIcon()}
            <View style={{flex:1}}>
          <Text style={this.props.lightTheme?styles.addressTextLight:styles.addressText}>{this.props.item._address}</Text>
             <View style={styles.innerContainer}>
                <Text style={this.props.lightTheme?styles.labelTextLight:styles.labelText}>{I18n.t('nodeEnd') +':'} </Text>
                <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>{this.getExpirationDate()}</Text> 
                <Text style={this.props.lightTheme?styles.labelTextLight:styles.labelText}>{I18n.t('remainingDays')+':'}</Text> 
                <Text style={this.props.lightTheme?styles.dateTextLight:styles.dateText}>{this.getDaysLeft() + ' ' + I18n.t('dayAbbreviation') }</Text>
             </View>
            </View>
        </View>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeItem)
