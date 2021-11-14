import React, { Component } from 'react'

import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  StatusBar,
  BackHandler,
  ImageBackground,
    ScrollView,
    Keyboard
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { connect } from 'react-redux'

// Styles
import styles from './Styles/IntroScreenStyle'

import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'

import PINCode from '../Components/PinCode'

import Swiper from 'react-native-swiper'

import Button from '../Components/Button'

import bip39 from 'react-native-bip39'
import Bip39Tools from '../Bip39Tools'
import { startApp } from '../Navigation/index';

import Logo from '../Images/biblepay.svg';
import LogoDark from '../Images/biblepay-dark.svg';

import AccountOptions from '../Images/account-option-icon.png'

import SecurityIcon from '../Images/security-icon.png'
import BackgroundIntro from '../Images/background_welcome.svg'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import StartupActions from '../Redux/StartupRedux';
import Icon from 'react-native-vector-icons/Ionicons'
import {Navigation} from 'react-native-navigation';
import I18n from '../I18n'
import {GlobalSelectors} from '../Redux/GlobalRedux';
import * as Keychain from "react-native-keychain";
import AppConfig from '../Config/AppConfig';
import { normalize } from 'path-browserify';

class IntroScreen extends Component {

  BIP32_DERIVATION_PATH = "m/0'/";
  BIP44_DERIVATION_PATH = "m/44'/"+AppConfig.BIP44Code+"'/0'/";

  state = {
    mnemonic: '',
    mnemonicWords: ['','','','','','','','','','','',''],
    mnemonicState: [0,0,0,0,0,0,0,0,0,0,0,0],
    mnemonicFocusedIndex: -1,
    mnemonicCheck: '',
    mnemonicSelection: '',
    importMnemonic: '',
    privateKey: '',
    page: 0,
    cipherTxt: '',
    vSalt: '',
    rounds: '',
    passphrase: '',
    mnemonicLang : ''
  }

  canGoBack=false
  _mnemonicInputRef= [null,null,null,null,null,null,null,null,null,null,null,null,null]

  componentDidMount () {

    if(Platform.OS==='android')
      this.backhandler=BackHandler.addEventListener('hardwareBackPress', () => {
        if(this.canGoBack){
            this.goBack()

        }
        return true;
      });

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    this.generateMnemonic(128).then(res=>{
      if(res.split(' ').length===12){
        this.setState({mnemonic:res})

        this.generateMnemonic(128).then(resp=>{
          if(resp.split(' ').length===12){
            let shuffeledArr = shuffle([...res.split(' '), ...resp.split(' ')])
            this.setState({mnemonicSelection:shuffeledArr.join(' ')})
          }
        })

      }
    })
  }

  next = () => {
    this.refs.swiper.scrollBy(1, true)
  }

  generateMnemonic = async (strength) => {
    try {
      const locales = RNLocalize.getLocales();
      var languageCode = 'EN';
      if (Array.isArray(locales)) {
        languageCode = locales[0].languageCode.toUpperCase();
      }
      wordlist = Bip39Tools.getWordListForLocale( languageCode );
      return await bip39.generateMnemonic(strength, null, wordlist) // 128 means 12 words
    } catch(e) {
      return null
    }
  }

  checkMnemonic = () => {
    if(this.state.mnemonic===this.state.mnemonicCheck) {
      this.props.generateAddressFromMnemonic(this.state.mnemonic, (error)=>{
        if(!error){
          setTimeout(()=>{
            this.props.startup()
          },200)
          if(this.backhandler)
            this.backhandler.remove()
          startApp()

        }
      })


    }else{
      this.refs.swiper.scrollBy(-1, true)
    }

  }

  importMnemonic = () => {
    var normalizedMnemonic = Bip39Tools.normalize(this.state.importMnemonic);
    if(this.state.importMnemonic && bip39.validateMnemonic( normalizedMnemonic, Bip39Tools.getWordList( this.state.mnemonicLang ))) {
        // new wallet
      this.props.generateAddressFromMnemonic(normalizedMnemonic, (error) => {
        if(error){
          Alert.alert(
              I18n.t('error'),
              I18n.t('mnemonicInvalid'),
              [
                {
                  text: I18n.t('dismiss'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
          )
        }else{
          setTimeout(()=>{
            this.props.startup()
          },200)
          if(this.backhandler)
            this.backhandler.remove()
          startApp()
        }
      })
    }
    else  {
      Alert.alert(
        I18n.t('error'),
        I18n.t('mnemonicInvalid'),
        [
          {
            text: I18n.t('dismiss'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      )
    }
  }

  addedWords = []

  addWord = (word, index) => {

    let foundIndex = this.addedWords.findIndex(aw => {return aw === null})
    if(foundIndex>=0){
      this.addedWords[foundIndex]=index
    }else if(this.addedWords.length<12){
      this.addedWords.push(index)
    }

      if(this.state.mnemonicCheck.includes('-')){
        this.setState({mnemonicCheck:this.state.mnemonicCheck.replace('-',word)})
      }else if(this.state.mnemonicCheck.split(' ').length!==12){
        this.setState({mnemonicCheck:this.state.mnemonicCheck+(this.state.mnemonicCheck.length?' ':'')+word})
      }
  }

  removeWord = (index) => {
      this.addedWords.splice(index,1,null)

      if(this.state.mnemonicCheck.includes(this.state.mnemonicCheck.split(' ')[index])) {
        let tempCheck = this.state.mnemonicCheck.split(' ')
        tempCheck[index] = '-'
        this.setState({mnemonicCheck: tempCheck.join(' ')})
      }
  }

  renderMnemonicWordInput = (n) => {
    return ( <TextInput editable placeholder={I18n.t('word')+' #'+n} 
                       style={(this.state.mnemonicState[n-1]==1)?styles.mnemonicError:(this.state.mnemonicFocusedIndex==(n-1))?styles.mnemonicFocus:styles.mnemonic} 
                       onChangeText={(text)=>{this.setBIP39Word(n-1, text)}} 
                       onFocus={ () => this.setState({ mnemonicFocusedIndex: n-1 }) }
                       onBlur={ () => {if (n==12) Keyboard.dismiss();this.setState({ mnemonicFocusedIndex: -1 }) } }
                       placeholderTextColor = "#a2a5b7"
                       autoCapitalize = 'none'
                       value={ this.state.mnemonicWords[n-1] }
                       ref={(r) => { this._textInputRef = r; }}
                       />
          );
  }

  setBIP39Word = (n, word) =>  {
    var last = word.substr(word.length-1,1);
    if (last==' ') {
      word = word.trim();
      if (n<11) {
        if (this._mnemonicInputRef[n+1]) {
          this._mnemonicInputRef[n+1].focus();
        }
      }
      else {
        Keyboard.dismiss();
      }
    }

    var wordsArray = this.state.mnemonicWords;
    wordsArray[n] = word;
    var wordsStatus = this.state.mnemonicState;
    wordsStatus[n] = (this.checkBIP39Word(word))?0:1;
    var mnemonic = wordsArray.join(' ');
    this.setState( {mnemonicWords: wordsArray, 
                    mnemonicState: wordsStatus,
                    importMnemonic: mnemonic } );
  }

  checkBIP39Word = (word) =>  {
    wordLang = Bip39Tools.isWordInWordlist(word);

    //console.log('checkBIP39Word: ' + word + ',' + wordLang + ',' + this.state.mnemonicLang)
    if (wordLang!=='')  {
      if (this.state.mnemonicLang!=='')   {
        if (this.state.mnemonicLang!=wordLang)     // language must be the same for all words
              return false;
        else  return true;
      }
      else  {
        this.setState( { mnemonicLang: wordLang } );
        return true;
      }
    }
    else  {
      if ( this.state.mnemonicWords.every( word => word=='' ) ) {
        this.setState( { mnemonicLang: '' } );
      }
      return (word=='')?true:false;
    }
  }

  renderBackIcon = () =>  {
      return (  <Icon name="md-arrow-back" size={wp(10)} color="black" style={{height: wp(10), position: 'absolute', top: hp(2), left: hp(2)}} onPress={this.goBack}/>)
  }


  goBack = () => {
    this.canGoBack=false
    this.refs.swiper.scrollBy(-1, true)
  }

  renderLogo = () => {
    if(this.props.lightTheme){
        return(<LogoDark width={wp(40)} height={wp(40)}/>)
    }else{
        return(<Logo width={wp(40)} height={wp(40)}/>)
    }
  }

  render () {
    return (
        <View style={{flex:1}}>
          <SafeAreaView style={styles.header} />
      <SafeAreaView style={[styles.container, this.state.page===1?styles.containerWithGray:null]} >
        <Swiper ref={'swiper'} showsPagination={false} autoplay={false} loop={false} scrollEnabled={false} showsButtons={false}>
          <View style={{flex:1, justifyContent:'space-around',alignItems:'center', backgroundColor: 'rgba(255, 255, 255, 0.0)'}}>
        
            <View style={styles.logoContainer}>
              {this.renderLogo()}
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.textBoldLight}>{AppConfig.coinName.toUpperCase()}</Text>
              <Text style={styles.textBoldLight2}>{I18n.t('unchained').toUpperCase()}</Text>
            </View>
            <Button label={I18n.t('open')} arrow onPress={()=>{this.setState({page: 1});this.next()}}/>
          </View>
          <PINCode status={'choose'}
                 finishProcess={()=>{this.setState({page: 2});this.next()}}
                 lightTheme={this.props.lightTheme}
        />
          <View style={styles.accountSetupPage}>
            <Image source={AccountOptions} style={styles.accountIcon} width={wp(40)} height={wp(20)} resizeMode={'contain'}/>
            <Text style={styles.accountTitle}>{I18n.t('welcomeAboard')}</Text>
            <Text style={styles.accountSubTitle}>{I18n.t('firstStartWallet')}</Text>
            <Button label={I18n.t('importMnemonic')+ " BIP32 ("+I18n.t('oldFormat')+")"} notfilled onPress={()=>{this.canGoBack=true;this.setState({page: 3});this.props.setDerivationPath(this.BIP32_DERIVATION_PATH);this.next()}} style={styles.accountButton}/>
            <Button label={I18n.t('importMnemonic')+ " BIP44 ("+I18n.t('newFormat')+")"} notfilled onPress={()=>{this.canGoBack=true;this.setState({page: 3});this.props.setDerivationPath(this.BIP44_DERIVATION_PATH);this.next()}} style={styles.accountButton}/>
            <Button label={I18n.t('newWallet')} onPress={()=>{this.canGoBack=true;this.setState({page: 2 });this.props.setDerivationPath(this.BIP44_DERIVATION_PATH);this.next()}} style={styles.accountButton}/>
          </View>
          {this.state.page===2&&<View style={{flex:1,alignItems:'center'}}>
            {this.renderBackIcon()}
            <Image source={SecurityIcon} style={styles.securityIconCheck} resizeMode={'stretch'}/>
            <Text style={styles.accountTitle}>{I18n.t('protectYourWallet')}</Text>
            <Text  style={styles.newMnemonicSubTitle}>{I18n.t('protectLongText')}</Text>
            <View style={styles.mnemonicContainer}>
              <View style={styles.mnemonicContainerInner}>{this.state.mnemonic.split(' ').slice(0,4).map(word=>(<Text style={styles.mnemonicBold}>{word}</Text>))}</View>
              <View style={styles.mnemonicContainerInner}>{this.state.mnemonic.split(' ').slice(4,8).map(word=>(<Text style={styles.mnemonicBold}>{word}</Text>))}</View>
              <View style={styles.mnemonicContainerInner}>{this.state.mnemonic.split(' ').slice(8).map(word=>(<Text style={styles.mnemonicBold}>{word}</Text>))}</View>
            </View>

            <Button label={I18n.t('next')} arrow onPress={this.next}/>
          </View>}
          {this.state.page===3&&<KeyboardAwareScrollView bounces={false} automaticallyAdjustContentInsets={false} contentContainerStyle={{flexGrow: 1}} getTextInputRefs={() => { return [this._textInputRef];}}>
            <View style={[styles.privateKeyPageContainer, Platform.OS!=='ios'?{height:Dimensions.get('window').height-StatusBar.currentHeight}:null]}>
              <View style={styles.privateKeyPageInnerContainer}>
              {this.renderBackIcon()}
                <Image source={SecurityIcon} style={styles.securityIconPrivKey} resizeMode={'stretch'}/>
                <Text style={styles.accountTitle}>{I18n.t('importYourMnemonics')}</Text>
                <Text style={styles.mnemonicCheckSubTitle}>{I18n.t('ifYouHaveMnemonic')}</Text>
              </View>
              <View style={styles.mnemonicContainer}>
                <View style={styles.mnemonicContainerInner}>{this.renderMnemonicWordInput(1)}{this.renderMnemonicWordInput(2)}{this.renderMnemonicWordInput(3)}</View>
                <View style={styles.mnemonicContainerInner}>{this.renderMnemonicWordInput(4)}{this.renderMnemonicWordInput(5)}{this.renderMnemonicWordInput(6)}</View>
                <View style={styles.mnemonicContainerInner}>{this.renderMnemonicWordInput(7)}{this.renderMnemonicWordInput(8)}{this.renderMnemonicWordInput(9)}</View>
                <View style={styles.mnemonicContainerInner}>{this.renderMnemonicWordInput(10)}{this.renderMnemonicWordInput(11)}{this.renderMnemonicWordInput(12)}</View>
              </View>
              <Button label={I18n.t('next')} arrow onPress={this.importMnemonic}/>
            </View>
          </KeyboardAwareScrollView>
          }
          
          <ScrollView bounces={false}>
          <View style={{flex:1,alignItems:'center'}}>
            <Image source={SecurityIcon} style={styles.securityIconCheckSmall} resizeMode={'stretch'}/>
            <Text style={styles.accountTitle}>{I18n.t('oneLastStep')}</Text>
            <Text style={styles.mnemonicCheckSubTitle}>{I18n.t('pleaseEnterMnemonic')}</Text>
            <View style={styles.wordsContainer}>
            {this.state.mnemonicSelection.split(' ').map((value, index)=>{

              return (<TouchableOpacity onPress={()=>{!this.addedWords.find(aw=>{return aw===index})>=0?this.addWord(value, index):null}} style={[styles.wordContainer,this.addedWords.find(aw=>{return aw===index})>=0?styles.wordContainerSelected:null]}><Text style={[styles.word,this.addedWords.find(aw=>{return aw===index})>=0?styles.wordSelected:null]}>{value}</Text></TouchableOpacity>)
            })}
            </View>
            <View style={styles.mnemonicCheckContainer}>
              <View style={styles.mnemonicCheckInnerContainer}>
              {this.state.mnemonic.split(' ').slice(0,4).map((word,index)=>(
                  <TouchableWithoutFeedback onPress={()=>this.removeWord(index)}>
                    <View pointerEvents='box-only'>
                  <TextInput editable={false} style={styles.textInputCheck}
                             value={this.state.mnemonicCheck.split(' ')[index]==='-'?'':this.state.mnemonicCheck.split(' ')[index]}/>
                    </View>
                  </TouchableWithoutFeedback>
              ))}
              </View>
              <View style={styles.mnemonicCheckInnerContainer}>
                {this.state.mnemonic.split(' ').slice(4,8).map((word,index)=>(
                    <TouchableWithoutFeedback onPress={()=>this.removeWord(index+4)}>
                      <View pointerEvents='box-only'>
                    <TextInput editable={false} style={styles.textInputCheck}
                               value={this.state.mnemonicCheck.split(' ')[index+4]==='-'?'':this.state.mnemonicCheck.split(' ')[index+4]}/>
                      </View>
                    </TouchableWithoutFeedback>

                ))}
              </View>
              <View style={styles.mnemonicCheckInnerContainer}>
                {this.state.mnemonic.split(' ').slice(8).map((word,index)=>(
                  <TouchableWithoutFeedback onPress={()=>this.removeWord(index+8)}>
                  <View pointerEvents='box-only'>
                  <TextInput editable={false} style={styles.textInputCheck}
                               value={this.state.mnemonicCheck.split(' ')[index+8]==='-'?'':this.state.mnemonicCheck.split(' ')[index+8]}/>
                  </View>
                  </TouchableWithoutFeedback>

                ))}
              </View>

            </View>
            <Button label={I18n.t('next')} arrow onPress={this.checkMnemonic} style={styles.buttonCheck}/>
          </View>
          </ScrollView>
        </Swiper>
      </SafeAreaView>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addresses: AccountSelectors.getAddresses(state),
    derivationPath: AccountSelectors.getDerivationPath(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    generateAddressFromMnemonic: (mnemonic, callback) => dispatch(AccountActions.generateAddressFromMnemonic(mnemonic, callback)),
    migrateFromMnemonic: (mnemonic, creds, callback) => dispatch(AccountActions.migrateFromMnemonic(mnemonic, creds, callback)),
    setDerivationPath: (path) => dispatch(AccountActions.setDerivationPath(path)),
    startup: () => dispatch(StartupActions.startup()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen)
