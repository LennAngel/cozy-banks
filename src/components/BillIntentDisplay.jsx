/* global cozy */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FullscreenIntentModal from 'components/FullscreenIntentModal'

class BillIntentDisplay extends Component {
  createIntent = () => {
    const bill = this.props.bill
    const doctype = 'io.cozy.bills'
    return cozy.client.intents.create('SHOW', doctype, { bill })
  }

  showModal = () => {
    this.setState({ intent: this.createIntent() })
  }

  closeModal = () => {
    this.setState({ intent: null })
    this.props.onClose && this.props.onClose()
  }

  handleModalError = err => {
    this.setState({ intent: null, error: err })
    this.props.onError && this.props.onError(err)
  }

  componentDidMount () {
    this.showModal()
  }

  render ({ children }, { intent }) {
    return intent
      ? <FullscreenIntentModal
        intent={intent}
        onIntentError={this.handleModalError}
        dismissAction={this.closeModal} />
      : null
  }
}

BillIntentDisplay.propTypes = {
  bill: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default BillIntentDisplay
