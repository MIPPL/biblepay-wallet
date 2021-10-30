import { Navigation } from "react-native-navigation";

import { Text, TextInput } from 'react-native'

import { initApp } from './App/Navigation/index';

import './App/Config'

import './shim.js'

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

Navigation.events().registerAppLaunchedListener(() => {
    initApp()
});
