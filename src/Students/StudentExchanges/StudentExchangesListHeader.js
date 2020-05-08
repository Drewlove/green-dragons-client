import React, {Component} from 'react'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'

class StudentExchangesListHeader extends Component{
    state = {
        student: null, 
        isLoaded: false
    }

    componentDidMount(){
        this.fetchRow()
    }

    async fetchRow(){
        const endpointSuffix = `students/${this.props.studentId}`
        const response = await HTTP_METHODS.getData(endpointSuffix)
        return response.ok ? 
        this.setState({student: response.data}, () => this.setState({isLoaded: true}))
        : null
    }

    isAmountNegative(){
        return this.props.balance < 0 ? "negative-amount" : ""
    }

    renderPage(){
        const {first_name, last_name} = this.state.student
        return(
            <>
            <h1>{first_name} {last_name}</h1>
            <h2 className={this.isAmountNegative()}>Balance: ${this.props.balance.toFixed(2)}</h2>
            </>
        )
    }

    render(){
        return(
            <header>
                {this.state.isLoaded ? this.renderPage() : <h2>Loading...</h2>}
            </header>
        )
    }
}

export default StudentExchangesListHeader

