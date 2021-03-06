import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 12,
    color: 'gray'
  }
})
