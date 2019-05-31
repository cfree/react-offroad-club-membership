import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default class RichTextArea extends Component {
  constructor(props) {
    super(props)
    this.state = { text: this.props.defaultText }

    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
    }
  }

  handleChange = (value) => {
    this.setState({ text: value })
    this.props.onChange(value);
  }

  render() {
    if (typeof window === 'undefined') {
      return null;
    }

    const ReactQuill = this.ReactQuill;

    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
        </Helmet>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
        />
      </>
    )
  }
}

RichTextArea.propTypes = {
  onChange: PropTypes.func,
  defaultText: PropTypes.string,
};

RichTextArea.defaultProps = {
  onChange: () => {},
  defaultText: '',
};
