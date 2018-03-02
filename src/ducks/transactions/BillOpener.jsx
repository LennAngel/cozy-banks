/* global __TARGET__ */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getURL } from 'reducers'
import BillIntentDisplay from 'components/BillIntentDisplay'
import PropTypes from 'prop-types'
import Spinner from 'cozy-ui/react/Spinner'
import flash from 'ducks/flash'
import { translate } from 'cozy-ui/react'
import { flowRight as compose } from 'lodash'

const spinnerStyle = { marginLeft: '-0.25rem', marginRight: '-1rem' }

/*
  Wraps a component so that onClick , it calls its fetchFile prop,
  displays a Spinner while loading and displays the file, either via the
  dedicated app or intent
*/
class BillOpener extends Component {
  onCloseModal = (err) => {
    this.setState({ bill: null })
    if (err) {
      flash('error', JSON.stringify(err, null, 2))
    }
  }

  displayBill = async (ev) => {
    ev.stopPropagation()
    this.setState({ loading: true })
    const bill = await this.props.getBill()
    // Open in a modal
    if (__TARGET__ === 'browser') {
      this.setState({bill: bill, loading: false})
    }
  }

  render (props, { loading, bill }) {
    return (
      <span>
        {React.cloneElement(props.children, { onClick: this.displayBill })}
        {loading && <Spinner style={spinnerStyle} />}
        {bill && <BillIntentDisplay
          onClose={this.onCloseModal}
          onError={this.onCloseModal}
          bill={bill} />}
      </span>
    )
  }
}

BillOpener.propTypes = {
  children: PropTypes.element
}

export default compose(
  connect(state => ({ cozyURL: getURL(state) })),
  translate()
)(BillOpener)
