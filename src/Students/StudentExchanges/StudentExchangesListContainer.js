import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StudentName from '../../_Common/StudentName'
import ListMainWrapper from '../../_Common/ListMainWrapper'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {GET_MM_DD_YYYY_DATE} from '../../Utilities/UtilityFunctions'

class ExchangesListContainer extends Component{
    state = {
        exchanges: [], 
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    componentDidMount(){
        this.fetchAllRows()
    }

    async fetchAllRows(){
        const endpointSuffix = `exchanges/students/${this.props.match.params.rowId}`
        const response = await HTTP_METHODS.getData(endpointSuffix)
        response.ok ? 
        this.updateExchanges(response.data)
        : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }

    updateExchanges(data){
        this.setState({exchanges: data}, () => this.setState({isLoaded: true}))
    }

    getListData(){
        const listData = this.state.exchanges.map(key => {
            return {
                ...key, 
                exchange_date : GET_MM_DD_YYYY_DATE(key.exchange_date), 
            }
        })
        return listData
    }

    toggleModalDisplay(){
        this.setState({redirectUrl: '/'})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    getBalance(){
        return this.state.exchanges.reduce((total, exchange) => {
            return total + parseFloat(exchange.amount)
          }, 0.00)
          .toFixed(2); 
    }

    isAmountNegative(){
        const balance = this.getBalance()
        return balance < 0 ? "negative-amount" : ""
    }

    renderPage(){
        return(
        <>
            <header>
                <StudentName studentId={this.props.match.params.rowId} />
                <h2 className={this.isAmountNegative()}>Balance: ${this.getBalance()}</h2>
            </header>
            <main>
                <ListMainWrapper 
                rootPath={`${this.props.location.pathname}`}
                tableName='exchange'
                listData={this.getListData()}
                propertiesToDisplay={['exchange_date', 'amount']} 
                listClassName='exchanges-list'
                />
            </main>
        </>
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : <h1>Loading...</h1>}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default ExchangesListContainer
