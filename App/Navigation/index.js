import { Navigation } from 'react-native-navigation';
import {Platform} from 'react-native'

import BootUpScreen from '../Containers/BootUpScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import IntroScreen from '../Containers/IntroScreen'
import RequestPinCodeScreen from '../Containers/RequestPinCodeScreen'
import ChangePinCodeScreen from '../Containers/ChangePinCodeScreen'
import SendScreen from '../Containers/SendScreen'
import ReceiveScreen from '../Containers/ReceiveScreen'
import QrScannerScreen from '../Containers/QrScannerScreen'
import TransactionsScreen from '../Containers/TransactionsScreen'
import NetworkScreen from '../Containers/NetworkScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ExportPrivKeyScreen from '../Containers/ExportPrivKeyScreen'
import TransactionDetailScreen from '../Containers/TransactionDetailScreen';

import {withReduxProvider} from './redux';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

let Colors = {}
let Fonts = {}
import I18n from '../I18n'

Navigation.registerComponent('BootUpScreen', () => gestureHandlerRootHOC(withReduxProvider(BootUpScreen)), () => BootUpScreen)
Navigation.registerComponent('DashboardScreen', () => gestureHandlerRootHOC(withReduxProvider(DashboardScreen)), () => DashboardScreen)
Navigation.registerComponent('IntroScreen', () => gestureHandlerRootHOC(withReduxProvider((IntroScreen))), () => IntroScreen)
Navigation.registerComponent('RequestPinCodeScreen', () => gestureHandlerRootHOC(withReduxProvider((RequestPinCodeScreen))), () => RequestPinCodeScreen)
Navigation.registerComponent('QrScannerScreen', () => gestureHandlerRootHOC(withReduxProvider((QrScannerScreen))), () => QrScannerScreen)
Navigation.registerComponent('SendScreen', () => gestureHandlerRootHOC(withReduxProvider(SendScreen)), () => SendScreen)
Navigation.registerComponent('ReceiveScreen', () => gestureHandlerRootHOC(withReduxProvider(ReceiveScreen)), () => ReceiveScreen)
Navigation.registerComponent('TransactionsScreen', () => gestureHandlerRootHOC(withReduxProvider(TransactionsScreen)), () => TransactionsScreen)
Navigation.registerComponent('NetworkScreen', () => gestureHandlerRootHOC(withReduxProvider(NetworkScreen)), () => NetworkScreen)
Navigation.registerComponent('SettingsScreen', () => gestureHandlerRootHOC(withReduxProvider(SettingsScreen)), () => SettingsScreen)
Navigation.registerComponent('ChangePinCodeScreen', () => gestureHandlerRootHOC(withReduxProvider(ChangePinCodeScreen)), () => ChangePinCodeScreen)
Navigation.registerComponent('ExportPrivKeyScreen', () => gestureHandlerRootHOC(withReduxProvider(ExportPrivKeyScreen)), () => ExportPrivKeyScreen)
Navigation.registerComponent('TransactionDetailScreen', () => gestureHandlerRootHOC(withReduxProvider(TransactionDetailScreen)), () => TransactionDetailScreen)

export const defaultOptions = (useLightTheme) => ({
  layout: {
    backgroundColor: useLightTheme?'#FFFFFF':'#000000',
    orientation: ['portrait'],
    componentBackgroundColor: useLightTheme?'#FFFFFF':'#000000',
  },
  popGesture: false,
  modalPresentationStyle: 'overCurrentContext',
  animations: {
    push: {
      enabled: 'true',
      content: {
        x: {
          from: 2000,
          to: 0,
          duration: 200
        }
      }
    },
    pop: {
      enabled: 'true',
      content: {
        x: {
          from: 0,
          to: 2000,
          duration: 200
        }
      }
    }
  },

  statusBar: {
    backgroundColor: useLightTheme?'white':'#000000',
    style: useLightTheme?'dark':"light"
  },
  topBar: {
    visible: false,
    noBorder: true,
    bottomBorderWidth: 0,
    title: {
      text: '',
      color: Colors.textColorDark,
      alignment: 'right',
      component: {
        alignment: 'right'
      }
    },
    backButton: {color: Colors.textColorDark, title: '', titleVisible: false, showTitle: false},
  },

  bottomTab: {
    iconColor: '#a2a5b7',
    selectedIconColor: useLightTheme?'black':'white',
    textColor: '#a2a5b7',
    selectedTextColor: useLightTheme?'black':'white',
    iconInsets: {
      top: -2,
      left: 0,
      bottom: 2,
      right: 0
    },
  },
  bottomTabs: {
    visible: true,
    animate: false, // Controls whether BottomTabs visibility changes should be animated
    drawBehind: false,
    backgroundColor: useLightTheme?'#FFFFFF':'#000000',
    hideShadow: true,
  },
  overlay: {
    interceptTouchOutside: true,
  },
});

export const initApp = () => {
  Navigation.setDefaultOptions(defaultOptions(true));
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'BootUpScreen',
          },
        }

        ]
      }

    },
  });
  changeNavigationBarColor('#000000');
}

export const preStartApp = () => {
  Navigation.setDefaultOptions(defaultOptions(true));
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'IntroScreen',
          },
        }

        ]
      }

    },
  });
}

export const preStartApp2 = () => {
  Navigation.setDefaultOptions(defaultOptions(true));
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'RequestPinCodeScreen',
          },
        }

        ]
      }

    },
  });
}


export const startApp = (useLightTheme) => {
  Navigation.setDefaultOptions(defaultOptions(useLightTheme));
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'bottomTabs',
        options: {
          bottomTabs: {
            titleDisplayMode: 'alwaysShow'
          },
          layout: {
            backgroundColor: 'white',
          }
        },
        children: [
          {
            stack: {
              children: [{
                component: {
                  name: 'DashboardScreen',
                  id: 'bottomTab0'
                },
              }],
              options: {
                bottomTab: {
                  icon: require('../Images/wallet.png'),
                  text: I18n.t('wallet')
                },
              },
            },
          },
          {
          stack: {
            children: [{
              component: {
                name: 'SendScreen',
                id: 'bottomTab1'
              },
            }],
            options: {
              bottomTab: {
                icon: require('../Images/send.png'),
                text: I18n.t('send')
              },
            },
          },
        },
        {
          stack: {
            children: [{
              component: {
                name: 'ReceiveScreen',
                id: 'bottomTab2'
              },
            }],
            options: {
              bottomTab: {
                icon: require('../Images/receive.png'),
                text: I18n.t('receive')
              },
            },
          },
        },
          {
            stack: {
              children: [{
                component: {
                  name: 'TransactionsScreen',
                  id: 'bottomTab3'
                },
              },
              ],
              options: {
                bottomTab: {
                  icon: require('../Images/transactions.png'),
                  text: I18n.t('transactions')
                },
              },
            },
          }],
      },
    },
  });
  Navigation.mergeOptions('bottomTabs',{
    bottomTabs: {
      currentTabIndex: 0,
    },
  })



}
