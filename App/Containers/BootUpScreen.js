import React, { Component } from 'react'

import { SafeAreaView } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/BootUpScreenStyle'

import { AccountSelectors } from '../Redux/AccountRedux'

import ScreenLoadingIndicator from '../Components/ScreenLoadingIndicator'

import { preStartApp, preStartApp2, startApp } from '../Navigation/index';

import StartupActions from '../Redux/StartupRedux'
import {GlobalSelectors} from '../Redux/GlobalRedux';

import {hasUserSetPinCode} from '@haskkor/react-native-pincode'
import I18n from '../I18n'

class BootUpScreen extends Component {


  componentDidMount () {
    if (typeof this.props.language !== 'undefined' && this.props.language!='')  {
      I18n.locale = this.props.language;
    }
    //console.log('@@@ start = ' +this.props.addresses.length);
  
      if (!this.props.addresses.length) {
        preStartApp()
      } else {
        this.props.startup()
        preStartApp2()
      }


  }

  render () {
    return (
      <SafeAreaView style={styles.container} >
        <ScreenLoadingIndicator style={styles.loadingIndicator} />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addresses: AccountSelectors.getAddresses(state),
    language: GlobalSelectors.getLanguage(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BootUpScreen)
