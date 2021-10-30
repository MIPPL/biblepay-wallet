import Config from './DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import { NativeModules } from 'react-native';

// grabs the ip address

let host = null

if (Config.useReactotron) {
  host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'Biblepay Wallet', host })
    .useReactNative()
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
}
