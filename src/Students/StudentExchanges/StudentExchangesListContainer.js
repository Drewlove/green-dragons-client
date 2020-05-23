import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StudentName from '../../_Common/StudentName'
import ListMainWrapper from '../../_Common/ListMainWrapper'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'
import NoResultsMessage from '../../_Common/NoResultsMessage'
import {GET_MM_DD_YYYY_DATE, ELEMENT_DISPLAY_NONE} from '../../Utilities/UtilityFunctions'
import ShimmerList from '../../_Common/ShimmerList'

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
        response.ok ? this.updateState(response.data) : this.handleError(response)
    }

    updateState(response){
        const exchanges = response
        this.setState({exchanges}, () => this.setState({isLoaded: true})) 
    }

    handleError(response){
        ELEMENT_DISPLAY_NONE('main')
        this.setState({modalMessage: response.error})  
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
        this.setState({redirectUrl: '/students'})
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
                <h2 className='student-exchange-list-balance'>Balance: <span className={this.isAmountNegative()}>${this.getBalance()}</span></h2>
                {this.state.exchanges.length === 0 ? this.renderNoResults() : null}
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

    renderNoResults(){
        return <NoResultsMessage recordName ='transactions' />
    }

    renderShimmerList(){
        return(
            <main>
                <ShimmerList listLength={5} />
            </main>
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : this.renderShimmerList() }
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default ExchangesListContainer
