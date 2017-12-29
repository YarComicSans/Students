import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

export default class ErrorSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
    this.props.setErrorMessage('');
  };

  render() {
    let open = this.state.open;
    if (this.props.message !== '') {
      open = true;
    }
    return (
      <div>
        <Snackbar
          action="Error"
          open={open}
          message={this.props.message}
          autoHideDuration={this.props.autoHideDuration ? this.props.autoHideDuration : 10000}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        />
      </div>
    );
  }
}

ErrorSnackbar.propTypes = {
  message: PropTypes.string,
  autoHideDuration: PropTypes.number,
  setErrorMessage: PropTypes.func,
};