import React, { Component } from 'react'
import cx from 'classnames'
import { Modal, Icon } from 'cozy-ui/react'
import { ModalTitle, ModalDescription } from 'cozy-ui/react/Modal'
import { Media, Bd, Img } from 'components/Media'
import palette from 'utils/palette.json'

import styles from './styles.styl'

class PopupSelect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      history: [props.options]
    }
  }

  handleBack = () => {
    const [item, ...newHistory] = this.state.history
    this.setState({
      history: newHistory
    })
    return item
  }

  handleSelect = item => {
    if (item.children && item.children.length > 0) {
      this.setState({
        history: [item, ...this.state.history]
      })
    } else {
      this.props.onSelect(item)
    }
  }

  renderList = () => {
    return (
      <div className={styles.PopupSelect__content}>
        {this.state.history[0].children.map(item => {
          return (
            <Media
              className={cx(styles.PopupSelect__row, `u-ph-1 u-pv-half${this.props.isSelected(item) ? ' u-text-bold' : ''}`)}
              onClick={() => this.handleSelect(item)}
            >
              {item.icon && <Img className='u-pr-1'>
                {item.icon}
              </Img>}
              <Bd className='u-ellipsis'>
                {item.title}
              </Bd>
              {item.children && item.children.length > 0 && <Img className='u-pl-1'>
                <Icon icon='forward' color={palette['cool-grey']} />
              </Img>}
            </Media>
          )
        })}
      </div>
    )
  }

  renderTitle = () => {
    const { history } = this.state
    const item = history[0]
    return (
      <Media>
        {history && history.length > 1 &&
          <Img className={styles.PopupSelect__back} onClick={this.handleBack}>
            <Icon icon='back' color={palette['cool-grey']} />
          </Img>}
        <Bd>
          {item.title}
        </Bd>
      </Media>
    )
  }

  render () {
    return (
      <Modal
        overflowHidden
        secondaryAction={this.props.onCancel}>
        <div className={styles.PopupSelect__title}>
          <ModalTitle>{ this.renderTitle() }</ModalTitle>
        </div>
        <ModalDescription className='u-pb-0'>
          { this.renderList() }
        </ModalDescription>
      </Modal>
    )
  }
}

export default PopupSelect
