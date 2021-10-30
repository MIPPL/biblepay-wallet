import React, { PureComponent } from 'react'

import { ActivityIndicator, Text, View } from 'react-native'

import styles from './Styles/ScreenLoadingIndicatorStyle'


export default class ScreenLoadingIndicator extends PureComponent {

  // Defaults for props
  static defaultProps = {
    animated: true
  }

  renderLabel () {
    if (this.props.label) {
      return (
        <Text style={styles.label}>{this.props.label}</Text>
      )
    }

    return null
  }

  render () {

      return (
        <View style={[styles.loading, this.props.style]}>
          <ActivityIndicator size='large' color={this.props.color || 'black'} />
          {this.renderLabel()}
        </View>
      )

  }
}
