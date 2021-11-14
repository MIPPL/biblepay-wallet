import React, { PureComponent } from 'react'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from './Styles/TitleHeaderStyle'

import Logo from '../Images/biblepay.svg';
import LogoDark from '../Images/biblepay-dark.svg';

import Settings from '../Images/setting.svg';
import SettingsLight from '../Images/setting-light.svg';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {Navigation} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons'
import {GlobalSelectors} from '../Redux/GlobalRedux';
import GlobalActions from '../Redux/GlobalRedux';
import {connect} from 'react-redux';
import I18n from '../I18n'
import AppConfig from '../Config/AppConfig'

import {defaultOptions} from '../Navigation';

class TitleHeader extends PureComponent {


    navToSettings = () => {
        Navigation.showModal( {component: {
            name: 'SettingsScreen',
                options: defaultOptions(this.props.lightTheme)
            }})
    }

    closeSettings = () => {
            Navigation.dismissModal(this.props.parentComponentId).then(()=>{

            })

    }

    renderIcon = () => {
        if(this.props.title===I18n.t('settings')||this.props.title===I18n.t('export')
        || this.props.title===I18n.t('transaction')){
            return (<Icon name="ios-close" size={wp(12)} color={this.props.lightTheme?'#000000':'white'} style={{height: wp(12)}} onPress={this.closeSettings}/>
            )
        }
        return (<TouchableOpacity onPress={this.navToSettings}>
            {this.props.lightTheme&&<SettingsLight width={wp(6)} height={wp(6)}/>}
            {!this.props.lightTheme&&<Settings width={wp(6)} height={wp(6)}/>}
        </TouchableOpacity>)
    }

    renderLogo = () => {
            if(this.props.lightTheme){
                return(<LogoDark width={wp(10)} height={wp(10)}/>)
            }else{
                return(<Logo width={wp(10)} height={wp(10)}/>)
            }
    }

  render () {

      return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
              {this.renderLogo()}
              <Text style={this.props.lightTheme?styles.textBoldLight:styles.textBold}>{AppConfig.coinName.toUpperCase()}</Text><Text style={this.props.lightTheme?styles.textLight:styles.text}> {this.props.title.toUpperCase()}</Text>
          </View>
            {this.renderIcon()}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleHeader)
