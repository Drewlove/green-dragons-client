import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import ChallengeForm from "./ChallengeForm";
import { GET_INVALID_INPUTS } from "../Utilities/FormValidation";
import { MODAL_MESSAGES } from "../Utilities/ModalMessages";
import { HTTP_METHODS } from "../Utilities/HttpMethods";
import Modal from "../_Common/Modal";
import ModalDeleteConfirm from "../_Common/ModalDeleteConfirm";
import {
  ELEMENT_DISPLAY_NONE,
  ELEMENT_DISPLAY,
  SCROLL_TO_TOP,
} from "../Utilities/UtilityFunctions";
import ShimmerForm from "../_Common/ShimmerForm";
import "react-datepicker/dist/react-datepicker.css";

class ChallengeFormContainer extends Component {
  state = {
    challenge: {
      challenge_id: null,
      challenge_name: "",
      challenge_description: "",
      units: "",
    },
    invalidInputs: [],
    isLoaded: false,
    modalMessage: "",
    redirectUrl: "",
  };

  async componentDidMount() {
    return this.props.match.params.rowId === "0"
      ? this.setState({ isLoaded: true })
      : this.getRowFromTable();
  }

  async getRowFromTable() {
    const endpoint = `challenges/${this.props.match.params.rowId}`;
    const response = await HTTP_METHODS.getData(endpoint);
    response.ok ? this.updateForm(response.data) : this.handleError(response);
  }

  updateForm(data) {
    const challenge = data;
    this.setState({ challenge }, () => this.setState({ isLoaded: true }));
  }

  handleError(response) {
    ELEMENT_DISPLAY_NONE("main");
    this.setState({ modalMessage: response.error });
  }

  componentDidUpdate(prevProps) {
    return prevProps.match.params.rowId !== this.props.match.params.rowId
      ? this.resetForm()
      : null;
  }

  resetForm() {
    const challenge = {
      challenge_id: null,
      challenge_name: "",
      challenge_description: "",
      units: "",
    };
    this.setState({ challenge });
    this.setState({ invalidInputs: [] });
  }

  renderModal() {
    ELEMENT_DISPLAY_NONE("main");
    SCROLL_TO_TOP();
    return (
      <Modal toggleModalDisplay={() => this.toggleModalDisplay()}>
        <p>{this.state.modalMessage}</p>
        {this.state.modalMessage === MODAL_MESSAGES.deleteConfirm ? (
          <ModalDeleteConfirm
            cancelDelete={(e) => this.cancelDelete(e)}
            deleteRecord={(e) => this.deleteRecord(e)}
          />
        ) : null}
      </Modal>
    );
  }

  toggleModalDisplay() {
    ELEMENT_DISPLAY("main");
    const redirectModalMessages = [
      MODAL_MESSAGES.fetchFail,
      MODAL_MESSAGES.deleteSuccessful,
      MODAL_MESSAGES.saveSuccessful,
    ];
    const doesPageRedirect =
      redirectModalMessages.indexOf(this.state.modalMessage) >= 0;
    return doesPageRedirect
      ? this.setState({ redirectUrl: "/challenges" })
      : this.setState({ modalMessage: "" });
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState({ modalMessage: MODAL_MESSAGES.deleteConfirm });
    ELEMENT_DISPLAY_NONE("main");
  }

  cancelDelete(e) {
    ELEMENT_DISPLAY("main");
    this.setState({ modalMessage: "" });
  }

  async deleteRecord() {
    const deleteResponse = await HTTP_METHODS.deleteData(
      `challenges/${this.props.match.params.rowId}`
    );
    deleteResponse.ok
      ? this.setState({ modalMessage: MODAL_MESSAGES.deleteSuccessful })
      : this.setState({ modalMessage: MODAL_MESSAGES.deleteFail });
  }

  handleSave(e) {
    e.preventDefault();
    this.validateAllInputs();
    return this.isFormValid()
      ? this.saveRecord()
      : this.setState({ modalMessage: MODAL_MESSAGES.saveFailInputsInvalid });
  }

  async saveRecord() {
    const saveResponse = await HTTP_METHODS.submitData(
      this.state.challenge,
      this.getEndpointSuffix(),
      this.isPatchOrPost()
    );
    saveResponse.ok
      ? this.setState({ modalMessage: MODAL_MESSAGES.saveSuccessful })
      : this.setState({ modalMessage: MODAL_MESSAGES.saveFail });
  }

  isPatchOrPost() {
    return this.props.match.params.rowId === "0" ? "POST" : "PATCH";
  }

  getEndpointSuffix() {
    return this.isPatchOrPost() === "POST"
      ? `challenges`
      : `challenges/${this.props.match.params.rowId}`;
  }

  validateAllInputs() {
    for (let [key, value] of Object.entries(this.state.challenge)) {
      if (key !== "challenge_id") {
        this.updateInvalidInputs(key, value);
      }
    }
  }

  isFormValid() {
    return this.state.invalidInputs.length > 0 ? false : true;
  }

  handleChange(e) {
    const { name, value } = e.target;
    const challenge = { ...this.state.challenge, [name]: value };
    this.setState({ challenge });
    return this.state.invalidInputs.indexOf(e.target.name) >= 0
      ? this.updateInvalidInputs(name, value)
      : null;
  }

  updateInvalidInputs(inputName, inputValue) {
    const inputReqs = this.getInputReqs(inputName);
    const inputActual = { name: inputName, value: inputValue };
    const invalidInputs = GET_INVALID_INPUTS(
      inputActual,
      inputReqs,
      this.state.invalidInputs
    );
    this.setState({ invalidInputs });
  }

  getInputReqs(inputName) {
    const inputRequirements = {
      challenge_name: {
        minLength: 1,
      },
      challenge_description: {
        minLength: 1,
      },
      units: {
        minLength: 1,
      },
    };
    return inputRequirements[inputName];
  }

  renderForm() {
    return (
      <ChallengeForm
        challenge={this.state.challenge}
        invalidInputs={this.state.invalidInputs}
        updateInvalidInputs={(name, value) =>
          this.updateInvalidInputs(name, value)
        }
        handleChange={(e) => this.handleChange(e)}
        handleSave={(e) => this.handleSave(e)}
        handleDelete={(e) => this.handleDelete(e)}
      />
    );
  }

  render() {
    return (
      <>
        {this.state.modalMessage.length > 0 ? this.renderModal() : null}
        {this.state.redirectUrl.length > 0 ? (
          <Redirect to={this.state.redirectUrl} />
        ) : null}
        {this.state.isLoaded ? (
          this.renderForm()
        ) : (
          <ShimmerForm inputNumber={5} />
        )}
      </>
    );
  }
}

export default withRouter(ChallengeFormContainer);
