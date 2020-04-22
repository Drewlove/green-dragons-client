import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import StudentFormProfile from './StudentFormProfile'
import "react-datepicker/dist/react-datepicker.css";

class StudentFormProfileContainer extends Component{
    state = {
        student: {
            first_name: '', 
            last_name: '', 
            birth_date: ''
        }
    } 

    async componentDidMount(){
        return this.props.isPostOrPatch() === 'POST' ? null : this.setState({student: await this.props.fetchRowFromTable()})
    }

    componentDidUpdate(prevProps){
        return prevProps.match.params.row_id !== this.props.match.params.row_id ? this.resetForm() : null
    }

    resetForm(){
        const student = {
            first_name: '', 
            last_name: '', 
            birth_date: ''
         }
        this.setState({student})
    }

    handleSave(e){
        e.preventDefault()
        this.props.getSubmitFormOptions(this.state.student)
    }

    handleDelete(e){
        this.props.handleDelete(e)
    }

    handleChange(e){
        const student = {...this.state.student, [e.target.name]: e.target.value}
        this.setState({student})
    }

    handleBirthdateChange(date){
        const student = {...this.state.student, birth_date: date}
        this.setState({student})
    }

    renderStudentFormProfile(){
        return(
            <StudentFormProfile 
            student = {this.state.student} 
            handleChange = {e=> this.handleChange(e)}
            handleBirthdateChange = {e=> this.handleBirthdateChange(e)}
            handleSave = {e => this.handleSave(e)}
            handleDelete = {e => this.props.handleDelete(e) } />    
        )
    }

    render(){
        return(
            <>
                {this.renderStudentFormProfile()}         
            </>
        )
    }
}

export default withRouter(StudentFormProfileContainer)





// import React, {Component} from 'react'
// import {withRouter, Redirect} from 'react-router-dom'
// import StudentFormProfile from './StudentFormProfile'
// import Modal from '../../_Common/Modal'
// import {HTTP_METHODS} from '../../Utilities/HttpMethods'
// import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
// import "react-datepicker/dist/react-datepicker.css";

// class StudentFormProfileContainer extends Component{
//     state = {
//         student: {
//             first_name: '', 
//             last_name: '', 
//             birth_date: ''
//         }, 
//         modalMessage: '',
//         redirectUrl: ''
//     } 

//     currentRowId = this.props.match.params.row_id
//     tableName = 'students'

//     componentDidMount(){
//         return this.isPostOrPatch() === 'POST' ? null : this.fetchStudent() 
//     }

//     componentDidUpdate(prevProps){
//         return prevProps.match.params.row_id !== this.currentRowId ? this.resetForm() : null
//     }

//     resetForm(){
//         const student = {
//             first_name: '', 
//             last_name: '', 
//             birth_date: ''
//          }
//         this.setState({student})
//     }

//     isPostOrPatch(){
//         return this.currentRowId === "0" ? 'POST' : 'PATCH' 
//     }

//     async fetchStudent(){
//         try{
//             let result = await HTTP_METHODS.getData(`${this.tableName}/${this.currentRowId}`)
//             return result.ok ? this.setState({student: result.data}) : this.setState({modalMessage: MODAL_MESSAGES.getFail})
//         } catch(error){
//             this.setState({modalMessage: 'Failed to Load'})
//         }
//     }

//     handleChange(e){
//         const student = {...this.state.student, [e.target.name]: e.target.value}
//         this.setState({student})
//     }

//     handleBirthdateChange(date){
//         const student = {...this.state.student, birth_date: date}
//         this.setState({student})
//     }

//     handleSave(e){
//         e.preventDefault()
//         this.isPostOrPatch() === "POST" ? 
//         this.submitForm(this.tableName, 'POST') 
//         : this.submitForm(`${this.tableName}/${this.currentRowId}`, 'PATCH')
//     }
    
//     async submitForm(urlSuffix, method){
//         let modalMessage
//         let student = {...this.state.student, birth_date: new Date(this.state.student.birth_date)}
//         try{
//             const result = await HTTP_METHODS.postOrPatchData(student, urlSuffix, method)
//             result.ok ? modalMessage = MODAL_MESSAGES.saveSuccessful : modalMessage = MODAL_MESSAGES.saveFail
//             return this.setState({modalMessage})
//         } catch(error){
//             modalMessage = MODAL_MESSAGES.saveFail
//             this.setState({modalMessage})
//         }
//     }

//     async handleDelete(e){
//         e.preventDefault()
//         let modalMessage
//         const urlSuffix = `${this.tableName}/${this.currentRowId}`
//         try {
//             const result = await HTTP_METHODS.deleteData(urlSuffix)
//             result.ok ? modalMessage = MODAL_MESSAGES.deleteSuccessful : modalMessage = MODAL_MESSAGES.deleteFail
//             return this.setState({modalMessage})
//         } catch{
//             modalMessage = MODAL_MESSAGES.deleteFail
//             this.setState({modalMessage})   
//         }
//     }

//     toggleModalDisplay(){
//         this.setState({redirectUrl: `/${this.tableName}`})
//     }

//     renderModal(){
//         return(
//             <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
//                 <p>{this.state.modalMessage}</p>
//             </Modal>
//         )
//     }

//     renderStudentFormProfile(){
//         return(
//             <StudentFormProfile 
//             student = {this.state.student} 
//             handleChange = {e=> this.handleChange(e)}
//             handleBirthdateChange = {e=> this.handleBirthdateChange(e)}
//             handleSave = {e => this.handleSave(e)}
//             handleDelete = {(e) => this.handleDelete(e) } />    
//         )
//     }

//     render(){
//         return(
//             <>
//             {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl}/> : null}
//             {this.state.modalMessage.length > 0 ? this.renderModal() : this.renderStudentFormProfile()}         
//             </>
//         )
//     }
// }

// export default withRouter(StudentFormProfileContainer)