import React, { PureComponent } from 'react'

import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/PinCodeStyle'
import PINCode from '@haskkor/react-native-pincode'

import Icon from '../Images/biblepay.svg'
import IconLight from '../Images/biblepay-dark.svg'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackIcon from 'react-native-vector-icons/Ionicons'
import I18n from '../I18n'

export default class PinCode extends PureComponent {


    renderDeleteButton = (cb) => {
        return (<TouchableHighlight style={this.props.lightTheme?styles.deleteButtonContainerLight:styles.deleteButtonContainer} onPress={cb}>
            <BackIcon name="ios-backspace" size={wp(8)} color={this.props.lightTheme?'#971B20':'white'} style={{height: wp(8)}}/>
        </TouchableHighlight>)
    }

  render () {

      return (
          <View style={[styles.headerContainer,this.props.lightTheme?styles.containerLight:null]}>
            <View style={{alignItems:'center',justifyContent: 'center', marginTop: hp(5)}}>
            {!this.props.lightTheme && <Icon width={wp(20)} height={wp(20)}/>}
            {this.props.lightTheme && <IconLight width={wp(20)} height={wp(20)}/>}                
            </View>
            <View style={[styles.pinpadContainer,this.props.lightTheme?styles.containerLight:null]}/>
          <PINCode status={this.props.status} finishProcess={this.props.finishProcess} 
                   stylePinCodeButtonCircle={this.props.lightTheme?styles.stylePinCodeButtonCircleLight:styles.stylePinCodeButtonCircle}
                   stylePinCodeColumnButtons={styles.stylePinCodeColumnButtons}
                   stylePinCodeMainContainer={styles.stylePinCodeMainContainer}
                   stylePinCodeRowButtons={[styles.stylePinCodeRowButtons,this.props.lightTheme?styles.containerLight:null]}
                   stylePinCodeColumnDeleteButton={styles.stylePinCodeColumnDeleteButton}
                   stylePinCodeEmptyColumn={styles.stylePinCodeEmptyColumn}
                   stylePinCodeTextButtonCircle={styles.stylePinCodeTextButtonCircle}
                   colorCircleButtons={this.props.lightTheme?'#F2F7Fd':'#971B20'}
                   stylePinCodeButtonNumber={this.props.lightTheme?'#000000':'#ffffff'}
                   stylePinCodeColorTitle={this.props.lightTheme?'black':'white'}
                   stylePinCodeEnterContainer={this.props.lightTheme?styles.stylePinCodeEnterContainerLight:styles.stylePinCodeEnterContainer}
                   stylePinCodeTextTitle={this.props.lightTheme?styles.stylePinCodeTextTitleLight:styles.stylePinCodeTextTitle}
                   stylePinCodeTextSubtitle={this.props.lightTheme?styles.stylePinCodeTextSubTitleLight:styles.stylePinCodeTextSubTitle}
                   stylePinCodeCircle={this.props.lightTheme?styles.stylePinCodeCircleLight:styles.stylePinCodeCircle}
                   styleLockScreenTitle={styles.styleLockScreenTitle}
                   stylePinCodeButtonNumberPressed={this.props.lightTheme?'black':'white'}
                   styleLockScreenButton={styles.styleLockScreenButton}
                   buttonDeleteComponent={this.renderDeleteButton}
                   disableLockScreen={this.props.disableLockScreen}
                   subtitleChoose={I18n.t('aPINWillAllow')}
                   subtitleConfirm={I18n.t('enterSecondTime')}
                   subtitleError={I18n.t('tryAgain')}
                   textButtonLockedPage={I18n.t('quit')}
                   textCancelButtonTouchID={I18n.t('cancel')}
                   textDescriptionLockedPage={I18n.t('lockerFor')}
                   textSubDescriptionLockedPage={I18n.t('comeBackLater')}
                   textTitleLockedPage={I18n.t('maxAttemp')}
                   titleAttemptFailed={I18n.t('incorrectPin')}
                   titleChoose={I18n.t('welcome')}
                   titleConfirm={I18n.t('verification')}
                   titleConfirmFailed={I18n.t('entriesDidNotMatch')}
                   titleEnter={I18n.t('enterPin')}
                   touchIDSentence={I18n.t('unlockApp')}
                   touchIDTitle={I18n.t('authRequired')}

          />
          </View>
      )

  }
}
