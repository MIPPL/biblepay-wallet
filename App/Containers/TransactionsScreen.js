import React, { Component } from 'react'

import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    Image,
    TextInput,
    Clipboard,
    StatusBar,
    TouchableOpacity,
    Platform, BackHandler,
} from 'react-native';

import { connect } from 'react-redux'

// Styles
import styles from './Styles/TransactionsScreenStyle'


import { AccountSelectors } from '../Redux/AccountRedux'

import Header from '../Components/TitleHeader';
import TransactionItem from '../Components/TransactionItem';
import {Navigation} from 'react-native-navigation';
import AccountActions from '../Redux/AccountRedux';
import {GlobalSelectors} from '../Redux/GlobalRedux';

import ItemStyle from '../Components/Styles/TransactionItemStyle'

import I18n from '../I18n'

import TransactionsIconLight from '../Images/transactions.svg';
import TransactionsIcon from '../Images/transactions-white.svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ITEM_HEIGHT = ItemStyle.container.height + ItemStyle.container.marginBottom

class TransactionsScreen extends Component {
    state = {
        sort: 0 // 0 means ALL, 1 means RECEIVED, 2 means SENT
    }


    componentDidMount () {

        Navigation.events().bindComponent(this);


    }

    componentDidAppear() {
        this.refresh()
        if(Platform.OS==='android')
            this.backhandler=BackHandler.addEventListener('hardwareBackPress', () => {
                Navigation.mergeOptions(this.props.componentId, {
                    bottomTabs: {
                        currentTabIndex: 2
                    }
                })
                return true;
            });
    }
    componentDidDisappear() {
        if(this.backhandler)
            this.backhandler.remove()
    }
    refresh = () => {
        this.props.fetchAddressInfo()
    }

    renderItem = ({item, index, separators}) => {
        return(
            <TransactionItem
                item={item}
            />)
    }

    getItemLayout = (data, index) => {
                return(
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
        )
    }

    renderListHeader = () => {
        var headerInnerSelected = (this.props.lightTheme)?styles.listHeaderInnerSelectedLight:styles.listHeaderInnerSelected;
        return(<View style={styles.listHeader}>
            <TouchableOpacity onPress={()=>this.setState({sort:0})} style={[styles.listHeaderInner, this.state.sort===0?headerInnerSelected:null]}><Text style={[styles.listHeaderInnerText, this.state.sort===0?styles.listHeaderInnerTextSelected:null]}>{I18n.t('all').toUpperCase()}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({sort:1})} style={[styles.listHeaderInner, this.state.sort===1?headerInnerSelected:null]}><Text style={[styles.listHeaderInnerText, this.state.sort===1?styles.listHeaderInnerTextSelected:null]}>{I18n.t('received').toUpperCase()}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({sort:2})} style={[styles.listHeaderInner, this.state.sort===2?headerInnerSelected:null]}><Text style={[styles.listHeaderInnerText, this.state.sort===2?styles.listHeaderInnerTextSelected:null]}>{I18n.t('sent').toUpperCase()}</Text></TouchableOpacity>
        </View>)
    }

    getData = () => {
                switch (this.state.sort) {
                    case 0:
                        return this.props.transactions
                        break;
                    case 1:
                        return this.props.transactions.filter(tx=>tx.amount>=0)
                        break;
                    case 2:
                        return this.props.transactions.filter(tx=>tx.amount<0)
                        break;
                }
    }

  render () {
    return (
      <SafeAreaView style={styles.container}>
          <Header title={I18n.t('transactions')} parentComponentId={this.props.componentId}/>
          <FlatList
              style={styles.flatList}
              data={this.getData()}
              renderItem={this.renderItem}
              getItemLayout={this.getItemLayout}
              ListHeaderComponent={this.renderListHeader}
          />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: AccountSelectors.getTransactions(state),
    lightTheme: GlobalSelectors.getUseLightTheme(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAddressInfo: ()=>dispatch(AccountActions.fetchAddressInfo())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen)
