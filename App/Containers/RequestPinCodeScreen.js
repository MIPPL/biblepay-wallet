import React, { Component } from 'react'

import { SafeAreaView, View } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/BootUpScreenStyle'

import { startApp } from '../Navigation/index';

import PINCode from '../Components/PinCode'
import Icon from 'react-native-vector-icons/Ionicons'
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Navigation} from 'react-native-navigation';
import {GlobalSelectors} from '../Redux/GlobalRedux';

class RequestPinCodeScreen extends Component {


  componentDidMount () {

  }

  render () {
    return (
        <View style={{flex:1}}>
          <SafeAreaView style={styles.header} />
      <SafeAreaView style={styles.container} >
        <PINCode status={'enter'}
                 finishProcess={() => {this.props.onFinish?this.props.onFinish(this.props.componentId):startApp(this.props.lightTheme)}}
                 disableLockScreen={this.props.onFinish?true:false}
                 lightTheme={this.props.lightTheme}
        />
        {this.props.onFinish&&<View style={styles.closeContainer}><Icon name="ios-close" size={wp(12)} color={'white'} style={{height: wp(12)}} onPress={()=>Navigation.dismissModal(this.props.componentId)}/></View>}
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestPinCodeScreen)
