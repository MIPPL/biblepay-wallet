import React, { Component } from 'react'

import { SafeAreaView, View } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/BootUpScreenStyle'

import { startApp } from '../Navigation/index';

import PINCode from '../Components/PinCode'

import Swiper from 'react-native-swiper'

import {Navigation} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons'
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {GlobalSelectors} from '../Redux/GlobalRedux';

class ChangePinCodeScreen extends Component {


  componentDidMount () {

  }

  render () {
    return (
        <View style={{flex:1}}>
          <SafeAreaView style={styles.header} />
      <SafeAreaView style={styles.container} >
        <Swiper ref={'swiper'} showsPagination={false} autoplay={false} loop={false} scrollEnabled={false} showsButtons={false}>

        <PINCode status={'enter'}
                 finishProcess={() => this.refs.swiper.scrollBy(1, true)}
                 disableLockScreen={true}
                 lightTheme={this.props.lightTheme}
        />
          <PINCode status={'choose'}
                   finishProcess={() => Navigation.dismissModal(this.props.componentId)}
                   lightTheme={this.props.lightTheme}
          />
        </Swiper>
        <View style={styles.closeContainer}><Icon name="ios-close" size={wp(12)} color={'white'} style={{height: wp(12)}} onPress={()=>Navigation.dismissModal(this.props.componentId)}/></View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePinCodeScreen)
