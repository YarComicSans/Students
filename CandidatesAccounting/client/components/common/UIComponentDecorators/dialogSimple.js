import React from 'react'
import PropTypes from 'prop-types'
import Slide from 'material-ui/transitions/Slide'
import Dialog, {
  DialogContent,
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog'

function Transition(props) {
  return <Slide direction='up' {...props} />
}

export default function SimpleDialog(props) {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        transition={Transition}
        disableBackdropClick
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          {props.actions}
        </DialogActions>
      </Dialog>
    </div>
  )
}

SimpleDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  actions: PropTypes.object,
}