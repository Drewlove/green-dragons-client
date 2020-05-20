import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import StudentFormSubcommunities from './StudentFormSubcommunities'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import ShimmerForm from '../../_Common/ShimmerForm'
import Modal from '../../_Common/Modal'

class StudentFormSubcommunitiesContainer extends Component{
    state = {
        communities: [],
        subcommunities: [], 
        studentSubcommunitiesOriginal: {},
        studentSubcommunitiesUpdated: [],
        invalidInputs: [],
        isLoaded: false, 
        modalMessage: '', 
        redirectUrl: ''
    } 

    async componentDidMount(){
        this.getAllData()
    }

    componentDidUpdate(prevProps){
       if(this.props.match.params.rowId !== prevProps.match.params.rowId){
           this.getAllData()
       } 
    }

    async getAllData(){
        const communities =  await this.getData('communities')
        const subcommunities =  await this.getData('subcommunities')
        const rawStudentSubcommunities =  await this.getData(`student-subcommunities/students/${this.props.match.params.rowId}`)
        const studentSubcommunitiesObj = this.castArrToObj(rawStudentSubcommunities, 'subcommunity_id')
        const studentSubcommunitiesArr = this.getIDsFromArr(rawStudentSubcommunities, 'subcommunity_id')
        this.setState({
            communities,
            subcommunities,
            studentSubcommunitiesOriginal: studentSubcommunitiesObj,
            studentSubcommunitiesUpdated: studentSubcommunitiesArr
        }, () => this.setState({isLoaded: true}))
    }

    async getData(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }  

    castArrToObj(arr, id){
        return arr.reduce((acc, item) => {
            acc[item[id]] = item
            return acc
        }, {})
    }

    getIDsFromArr(arr, id){
        return arr.map(key => key[id])
    }
    

    setModalMessage(modalMessage){
        this.setState({modalMessage})
    }

    closeModal(){
        return this.state.modalMessage === MODAL_MESSAGES.deleteSuccessful || this.state.modalMessage === MODAL_MESSAGES.saveSuccessful ?
        this.setState({redirectUrl: '/students/'}) : this.setState({modalMessage: ''})
    }

    renderModal(){
        return(
            <Modal closeModal={()=> this.closeModal()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    handleChange(e){
        const isChecked = e.target.checked
        const subcommunityId = parseInt(e.target.value)
        return isChecked ? this.addSubcommunity(subcommunityId) : this.removeSubcommunity(subcommunityId)
    }

    addSubcommunity(id){
        const studentSubcommunitiesUpdated = [...this.state.studentSubcommunitiesUpdated]
        studentSubcommunitiesUpdated.push(id)
        this.setState({studentSubcommunitiesUpdated})
    }

    removeSubcommunity(id){
        const studentSubcommunitiesUpdated = [...this.state.studentSubcommunitiesUpdated]
        const index = studentSubcommunitiesUpdated.indexOf(id)
        studentSubcommunitiesUpdated.splice(index, 1)
        this.setState({studentSubcommunitiesUpdated})
    }

    async handleSave(e){
        e.preventDefault()
        const saveResponse = await this.saveSubcommunities()
        const deleteResponse = await this.deleteSubcommunities()
        const saveSuccessful = saveResponse.indexOf(false) >= 0 ? false : true
        const deleteSuccessful = deleteResponse.indexOf(false) >= 0 ? false : true
        if(saveSuccessful && deleteSuccessful){
            this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) 
        } else {
            this.setState({modalMessage: MODAL_MESSAGES.saveFail})
        }
    }

    async saveSubcommunities(){
        const newSubcommunities = this.getNewSubcommunities()
        return Promise.all(newSubcommunities.map(key => {
            return this.saveSubcommunity(key)
        })
        )
    }

    async saveSubcommunity(key){
        const studentSubcommunity = {
            subcommunity_id: key,
            student_id: this.props.match.params.rowId
        }
        let res = await HTTP_METHODS.submitData(studentSubcommunity, `student-subcommunities`, 'POST')
        return res.ok
    }


    getNewSubcommunities(){
        const {studentSubcommunitiesOriginal, studentSubcommunitiesUpdated} = this.state
        let newSubcommunities = []
        studentSubcommunitiesUpdated.forEach(key => {
            if(!studentSubcommunitiesOriginal[key]){
                newSubcommunities.push(key)
            }
        })
        return newSubcommunities
    }

    deleteSubcommunities(){
        const deletedSubcommunities = this.getDeletedSubcommunities()
        return Promise.all(deletedSubcommunities.map(key => {
            return this.deleteSubcommunity(key)
        })
        )
    }

    async deleteSubcommunity(key){
        const studentSubcommunityID = this.state.studentSubcommunitiesOriginal[key].student_subcommunity_id
        let res = await HTTP_METHODS.deleteData(`student-subcommunities/${studentSubcommunityID}`) 
        return res.ok
    }

    getDeletedSubcommunities(){
        const {studentSubcommunitiesOriginal, studentSubcommunitiesUpdated} = this.state
        let deletedSubcommunities = []
        Object.keys(studentSubcommunitiesOriginal).forEach(key => {
            if(studentSubcommunitiesUpdated.indexOf(parseInt(key)) === -1){
                deletedSubcommunities.push(key)
            }
        })
        return deletedSubcommunities
    }

    renderForm(){
        return(
            <StudentFormSubcommunities
            studentId={this.props.match.params.rowId}
            mergedCommunities={this.getMergedCommunities()}
            studentSubcommunitiesUpdated={this.state.studentSubcommunitiesUpdated}
            handleChange = {e => this.handleChange(e)}
            handleSave = {e => this.handleSave(e)}
            handleDelete = {e => this.handleDelete(e)}
            />    
        )
    }

    getMergedCommunities(){
         const {communities, subcommunities} = this.state

        const mergedCommunities = communities.reduce((acc, item) => {
            item.subcommunities = [] 
            acc[item.community_id] = item
            return acc
          }, {} )
          
          subcommunities.forEach(key => {
            mergedCommunities[key.community_id].subcommunities.push(key)
          })
          return mergedCommunities
        }

    render(){
        return(
            <>
            {this.state.modalMessage.length > 0 ? this.renderModal() : null}
            {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl}/> : null}
            {this.state.isLoaded ? this.renderForm() : <ShimmerForm inputNumber={5}/>}
            </>
        )
    }
}

export default withRouter(StudentFormSubcommunitiesContainer)
