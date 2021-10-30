import React, { Component } from 'react'

import { SafeAreaView, Text, FlatList, View,TextInput } from 'react-native'

import { connect } from 'react-redux'

// Styles
import styles from './Styles/QrScannerScreenStyle'

import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../Components/Button';
import {GlobalSelectors} from '../Redux/GlobalRedux';
import I18n from '../I18n'

class QrScannerScreen extends Component {


  componentDidMount () {

  }


  render () {
    return (
      <View style={this.props.lightTheme?styles.containerLight:styles.container} >
        <QRCodeScanner
            onRead={(result)=>this.props.onFinish(this.props.componentId, result)}
            cameraStyle={styles.camera}
            notAuthorizedView={<View style={styles.notAuthContainer}><Text style={[styles.notAuthText, this.props.lightTheme?styles.notAuthTextLight:null]}>Camera not authorized</Text></View>}
        />
          <SafeAreaView style={styles.bottomContainer}>
        <Button label={I18n.t('close')} onPress={()=>this.props.onFinish(this.props.componentId)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(QrScannerScreen)
