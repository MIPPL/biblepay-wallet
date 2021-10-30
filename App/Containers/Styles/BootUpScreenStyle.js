import { StyleSheet } from 'react-native'

import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  header: {
    flex: 0,
    backgroundColor: '#000000'
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: wp(8),
  }
})
