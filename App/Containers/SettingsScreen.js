import React, { Component } from 'react'

import { SafeAreaView, Text, View , Clipboard,
        TouchableOpacity, Image, Switch, BackHandler,
        Linking } 
    from 'react-native'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/SettingsScreenStyle'

import GlobalActions, { GlobalSelectors } from '../Redux/GlobalRedux'

import Header from '../Components/TitleHeader';
import TransactionItem from '../Components/TransactionItem';
import {Navigation} from 'react-native-navigation';
import AccountActions from '../Redux/AccountRedux';
import Swiper from 'react-native-swiper'

import Icon from 'react-native-vector-icons/Ionicons'

import SettingsIcon from '../Images/setting.svg';
import SettingsIconLight from '../Images/setting-light.svg';
import ApiIcon from '../Images/api.svg';
import ApiIconLight from '../Images/api-light.svg';
import BlockbookIcon from '../Images/blockbook-icon-white.png'
import BlockbookIconLight from '../Images/blockbook-icon.png'
import ExplorerIcon from '../Images/explorer-icon-white.png'
import ExplorerIconLight from '../Images/explorer-icon.png'
import PinCodeIcon from '../Images/pin-code-white.png'
import PinCodeIconLight from '../Images/pin-code.png'
import ExportIcon from '../Images/export-icon-white.png'
import ExportIconLight from '../Images/export-icon.png'
import ThemeIcon from '../Images/dark-light-white.png'
import ThemeIconLight from '../Images/dark-light.png'

import LanguageIcon from '../Images/language.png'
import WebsiteIcon from '../Images/websites.png'
import SocialMediaIcon from '../Images/socialmedia.png'


import prompt from 'react-native-prompt-android'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {defaultOptions} from '../Navigation';
import I18n from '../I18n'


class SettingsScreen extends Component {

    state = {
        pageAPI: false,
        pageLang: false
    };

    constructor(props) {
        super(props);
    
        this.goToWebsite = this.goToWebsite.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    componentDidMount () {
        if(Platform.OS==='android')
          this.backhandler=BackHandler.addEventListener('hardwareBackPress', () => {
            if(this.state.pageAPI){
                this.goBack()
            }
            return true;
          });
    }

    changeBlockBookApi = () => {
        prompt(
            'Enter Blockbook Api',
            '',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: api => this.props.setBlockbookApi(api)},
            ],
            {
                type: 'plain-text',
                cancelable: false,
                defaultValue: this.props.blockBookApi,
                placeholder: 'Type here'
            }
        );
    }

    changeLanguage = (lang) => {
        I18n.locale = lang;
        this.props.setLanguage(lang);
        this.handleSwitchChange( this.props.lightTheme );       // forces refresh of bottomTab
        this.goBack();
    }

    changeExplorerApi = () => {
        prompt(
            'Enter Explorer Api',
            '',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: api => this.props.setExplorerApi(api)},
            ],
            {
                type: 'plain-text',
                cancelable: false,
                defaultValue: this.props.explorerApi,
                placeholder: 'Type here'
            }
        );
    }

    changePinCode = () => {
        Navigation.showModal( {component: {
                name: 'ChangePinCodeScreen',
                options: defaultOptions(this.props.lightTheme)
            }})
    }

    exportPrivKey = () => {
        Navigation.showModal({
            component: {
                name: 'RequestPinCodeScreen',
                passProps: {onFinish: this.openExportModal},
                options: defaultOptions(this.props.lightTheme)
            },
        });
    }

    goBack = () => {
        this.setState({ pageAPI: false, pageLang: false })
        this.refs.swiper.scrollBy(-1, true)
      }
    
    goToPageAPI = () => {
        this.setState({ pageAPI: true })
        this.refs.swiper.scrollBy(1, true)
    }
    goToLanguage = () => {
        this.setState({ pageLang: true })
        this.refs.swiper.scrollBy(1, true)
    }
    goToWebsite = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
    openExportModal = (id) => {
        Navigation.dismissModal(id).then(()=>{
            Navigation.showModal({
                component: {
                    name: 'ExportPrivKeyScreen',
                    options: defaultOptions(this.props.lightTheme)
                },
            });
            if(this.backhandler)
                this.backhandler.remove()
        })

    }

  render () {
    return (
      <SafeAreaView style={styles.container}>
          <Header title={I18n.t('settings')} parentComponentId={this.props.componentId}/>
          <Swiper ref={'swiper'} showsPagination={false} autoplay={false} loop={false} scrollEnabled={false} showsButtons={false}>
            {this.state.pageAPI && this.renderPageAPI()}
            {this.state.pageLang && this.renderPageLanguages()}
            {!this.state.pageAPI && !this.state.pageLang && this.renderSettingsHome()}
          </Swiper>
      </SafeAreaView>
    )
  }

  renderBackIcon = () =>  {
      return (  
            <Icon name="md-arrow-back" size={wp(10)} color={this.props.lightTheme?'black':'white'} style={{height: wp(10), position: 'absolute', top: hp(-8), left: hp(2)}} onPress={this.goBack}/>
      )
  }

  renderSettingsHome () {
    return (
        <View style={styles.settingsWrapper}>  
            <View style={{alignItems:'center', marginTop: hp(-8), marginBottom: hp(2)}}>
                {this.props.lightTheme&&<SettingsIconLight width={wp(12)} height={wp(12)} style={{marginLeft: wp(2)}}/>}
                {!this.props.lightTheme&&<SettingsIcon width={wp(12)} height={wp(12)} style={{marginLeft: wp(2)}}/>}
            </View>   
              <TouchableOpacity onPress={this.goToPageAPI} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1]}>
                  <View style={styles.settingInnerContainer}>
                  {this.props.lightTheme&&<ApiIconLight  width={wp(11)} height={wp(11)} style={{marginLeft:wp(2), marginRight:wp(1)}} />}
                  {!this.props.lightTheme&&<ApiIcon  width={wp(11)} height={wp(11)} />}
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('changeAPI')}</Text>
                      </View>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.changePinCode} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2]}>
                  <View style={styles.settingInnerContainer}>
                      <Image source={this.props.lightTheme?PinCodeIconLight:PinCodeIcon} style={styles.icon} resizeMode={'contain'}/>
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('changePin')}</Text>
                      </View>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.exportPrivKey} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1]}>
                  <View style={styles.settingInnerContainer}>
                      <Image source={this.props.lightTheme?ExportIconLight:ExportIcon} style={styles.icon} resizeMode={'contain'}/>
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('exportPrivkey')}</Text>
                      </View>
                  </View>
              </TouchableOpacity>

              <View style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2]}>
                  <View style={styles.settingInnerContainer}>
                      <Image source={this.props.lightTheme?ThemeIconLight:ThemeIcon} style={styles.icon} resizeMode={'contain'}/>
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('useLightTheme')}</Text>
                      </View>
                  </View>
                  <Switch value={this.props.lightTheme} onValueChange={this.handleSwitchChange} style={{marginRight: wp(1)}}/>
              </View>
              <TouchableOpacity onPress={this.goToLanguage} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1]}>
                  <View style={styles.settingInnerContainer}>
                  <Image source={this.props.lightTheme?LanguageIcon:LanguageIcon} style={styles.icon} resizeMode={'contain'}/>
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('language')}</Text>
                      </View>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.goToWebsite('https://www.biblepay.org/community/')} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1]}>
                  <View style={styles.settingInnerContainer}>
                  <Image source={this.props.lightTheme?SocialMediaIcon:SocialMediaIcon} style={styles.icon} resizeMode={'contain'}/>
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('socialMedias')}</Text>
                      </View>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.goToWebsite('https://www.biblepay.org')} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2]}>
                  <View style={styles.settingInnerContainer}>
                      <Image source={this.props.lightTheme?WebsiteIcon:WebsiteIcon} style={styles.icon} resizeMode={'contain'}/>
                      <View style={styles.titleWrapper}>
                          <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{I18n.t('website')}</Text>
                      </View>
                  </View>
              </TouchableOpacity>
          </View>
    );
  }

  renderPageAPI ()  {
      return (
        <View style={styles.settingsWrapperAPI}> 
            {this.renderBackIcon()}
            <View style={{alignItems:'center', marginTop: hp(-8), marginBottom: hp(2)}}>
                {this.props.lightTheme&&<ApiIconLight width={wp(14)} height={wp(14)} style={{marginLeft: wp(2)}}/>}
                {!this.props.lightTheme&&<ApiIcon width={wp(14)} height={wp(14)} style={{marginLeft: wp(2)}}/>}
            </View>   
            <TouchableOpacity onPress={this.changeBlockBookApi} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1]}>
            <View style={styles.settingInnerContainer}>
            <Image source={this.props.lightTheme?BlockbookIconLight:BlockbookIcon} style={styles.icon} resizeMode={'contain'}/>
            <View>
                <View style={styles.titleWrapper}>
                <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>Blockbook</Text>
                </View>
                <Text style={[styles.subTitle,this.props.lightTheme?styles.subTitleLight:null]}>{this.props.blockBookApi}</Text>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.changeExplorerApi} style={[styles.settingContainer,this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2]}>
                <View style={styles.settingInnerContainer}>
                    <Image source={this.props.lightTheme?ExplorerIconLight:ExplorerIcon} style={styles.icon} resizeMode={'contain'}/>
                    <View>
                        <View style={styles.titleWrapper}>
                        <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>Explorer</Text>
                        </View>
                        <Text style={[styles.subTitle,this.props.lightTheme?styles.subTitleLight:null]}>{this.props.explorerApi}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        );
  }

  renderPageLanguages ()  {
    
    var translations = { de: 'Deutch',
                    el : 'ελληνικά' ,
                    en : 'English',
                    es : 'Español',
                    fr : 'Français',
                    hi : 'हिन्दी, हिंदी',
                    it : 'Italiano',
                    pt : 'Português',
                    ru : 'русский',
                    sv : 'Svenska',
                    tr : 'Türkçe' };

    return (
        <KeyboardAwareScrollView bounces={false} automaticallyAdjustContentInsets={false}>
        <SafeAreaView style={styles.settingsWrapperAPI}> 
          {this.renderBackIcon()}
          <View style={{alignItems:'center'}}>
              <Image source={this.props.lightTheme?LanguageIcon:LanguageIcon} style={styles.iconHeader} resizeMode={'contain'}/>
          </View>   
          
          {this.renderLanguage('de',translations['de'],this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1)}
          {this.renderLanguage('el',translations['el'],this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2)}
          {this.renderLanguage('en',translations['en'],this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1)}
          {this.renderLanguage('es',translations['es'],this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2)}
          {this.renderLanguage('fr',translations['fr'],this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1)}
          {this.renderLanguage('it',translations['it'],this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2)}
          {this.renderLanguage('pt',translations['pt'],this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1)}
          {this.renderLanguage('ru',translations['ru'],this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2)}
          {this.renderLanguage('sv',translations['sv'],this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1)}
          {this.renderLanguage('tr',translations['tr'],this.props.lightTheme?styles.settingContainerLight2:styles.settingContainerDark2)}
          {this.renderLanguage('hi',translations['hi'],this.props.lightTheme?styles.settingContainerLight1:styles.settingContainerDark1)}

      </SafeAreaView>
      </KeyboardAwareScrollView>
      );
    }

    renderLanguage ( key, description, style ) {
        return (
            <TouchableOpacity onPress={() => this.changeLanguage(key)} style={[styles.settingContainer,style]}>
                <View style={styles.settingInnerContainer}>
                    <Image source={this.props.lightTheme?LanguageIcon:LanguageIcon} style={styles.icon} resizeMode={'contain'}/>
                    <View>
                        <Text style={[styles.title,this.props.lightTheme?styles.titleLight:null]}>{description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    handleSwitchChange = (flag) => {
        this.props.setUseLightTheme(flag)
        Navigation.mergeOptions(this.props.componentId, {
            layout: {
                backgroundColor: flag?'#FFFFFF':'#000000',
                orientation: ['portrait'],
                componentBackgroundColor: flag?'#FFFFFF':'#000000'
            },
            bottomTabs: {
                backgroundColor: flag?'#FFFFFF':'#000000',
            },
            bottomTab: {
                iconColor: '#a2a5b7',
                selectedIconColor: flag?'black':'white',
                textColor: '#a2a5b7',
                selectedTextColor: flag?'black':'white',
            },
            statusBar: {
                backgroundColor: flag?'white':'#000000',
                style: flag?'dark':"light"
            },
        })
        for(let i=0;i<4;i++){
            let icon, text;
            if(i==0){
                icon=require('../Images/wallet.png')
                text=I18n.t('wallet')
            }else if(i==1){
                icon=require('../Images/send.png')
                text=I18n.t('send')
            }else if(i==2){
                icon=require('../Images/receive.png')
                text=I18n.t('receive')
            }else if(i==3){
                icon=require('../Images/transactions.png')
                text=I18n.t('transactions')
            }

            Navigation.mergeOptions('bottomTab'+i, {
                layout: {
                    backgroundColor: flag?'#FFFFFF':'#000000',
                    orientation: ['portrait'],
                    componentBackgroundColor: flag?'#FFFFFF':'#000000'
                },
                bottomTabs: {
                    backgroundColor: flag?'#FFFFFF':'#000000',
                },
                bottomTab: {
                    iconColor: '#a2a5b7',
                    selectedIconColor: flag?'black':'white',
                    textColor: '#a2a5b7',
                    selectedTextColor: flag?'black':'white',
                    icon,
                    text,
                    iconInsets: {
                        top: -2,
                        left: 0,
                        bottom: 2,
                        right: 0
                    },
                },
                statusBar: {
                    backgroundColor: flag?'white':'#000000',
                    style: flag?'dark':"light"
                },
            })
        }

    }
}



const mapStateToProps = (state) => {
  return {
      blockBookApi: GlobalSelectors.getBlockbookApi(state),
      explorerApi: GlobalSelectors.getExplorerApi(state),
      nodeSetupApi: GlobalSelectors.getNodeSetupApi(state),
      infinityApi: GlobalSelectors.getInfinityApi(state),
      lightTheme: GlobalSelectors.getUseLightTheme(state),
      language: GlobalSelectors.getLanguage(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBlockbookApi: (api) => dispatch(GlobalActions.setBlockbookApi(api)),
    setExplorerApi: (api) => dispatch(GlobalActions.setExplorerApi(api)),
    setNodeSetupApi: (api) => dispatch(GlobalActions.setNodeSetupApi(api)),
    setInfinityApi: (api) => dispatch(GlobalActions.setInfinityApi(api)),
    setUseLightTheme: (flag) => dispatch(GlobalActions.setUseLightTheme(flag)),
    setLanguage: (lang) => dispatch(GlobalActions.setLanguage(lang)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
