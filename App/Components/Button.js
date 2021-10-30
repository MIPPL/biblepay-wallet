import React, { PureComponent } from 'react'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from './Styles/ButtonStyle'
import {GlobalSelectors} from '../Redux/GlobalRedux';
import {connect} from 'react-redux';

class Button extends PureComponent {

  renderLabel () {
    if (this.props.label) {
      return (
        <Text style={styles.label} numberOfLines={1} ellipsizeMode='tail'>{this.props.label.toUpperCase()} </Text>
      )
    }

    return null
  }
  renderArrow = () => {
    if(this.props.arrow){
      return (<Text style={styles.label}> &#8594;</Text>)
    }
    return null
  }

  render () {
    var fillStyle = this.props.notfilled?(this.props.lightTheme?styles.notFilledLight:styles.notFilled):
                                         (this.props.lightTheme?styles.filledLight:styles.filled);
      return (
        <TouchableOpacity style={[this.props.lightTheme?styles.containerLight:styles.container, this.props.style, fillStyle]} onPress={this.props.onPress}>
          {this.renderLabel()}
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Button)
