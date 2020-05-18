import React, {Component} from 'react'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import ShimmerItem from '../_Common/ShimmerItem'

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
            <h2>{first_name} {last_name}</h2>
            </>
        )
    }

    renderPlaceHolder(){
        return(
            <div className='student-name-shimmer'>
                <ShimmerItem/>
            </div>
        )
    }

    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : this.renderPlaceHolder()}
            </>
        )
    }
}

export default StudentName

