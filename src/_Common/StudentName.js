import React, {Component} from 'react'
import {HTTP_METHODS} from '../Utilities/HttpMethods'

class StudentName extends Component{
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

    renderPage(){
        const {first_name, last_name} = this.state.student
        return(
            <>
            <h1>{first_name} {last_name}</h1>
            </>
        )
    }

    render(){
        return(
            <div>
                {this.state.isLoaded ? this.renderPage() : <h2>Loading...</h2>}
            </div>
        )
    }
}

export default StudentName

