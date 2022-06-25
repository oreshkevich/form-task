import React, { Component } from 'react';
import { IFormState } from '../interface/IFormState';
import './index.sass';

class Form extends Component {
  state: IFormState = {
    valid: true,
    validDate: true,
    validText: true,
    validEmail: true,
    validTel: true,
    cards: [],
    name: '',
    errForm: '',
    success: '',
  };

  inputRef = React.createRef<HTMLInputElement>();
  emailRef = React.createRef<HTMLInputElement>();
  telRef = React.createRef<HTMLInputElement>();
  dateRef = React.createRef<HTMLInputElement>();
  textareaRef = React.createRef<HTMLTextAreaElement>();
  buttonRef = React.createRef<HTMLButtonElement>();
  formRef = React.createRef<HTMLFormElement>();

  validate(val: string) {
    const position = val.indexOf(' ', val.indexOf(' ') + 1);
    const re = /^(?:[a-zA-Z\s]{3,30})(\s[a-zA-Z\s]{3,30})$/;
    return re.test(val) && position === -1;
  }

  validateEmail(val: string) {
    const res = /^([a-zA-Z][a-zA-Z0-9-_]{2,15})*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(val);
  }

  validateTel(valE: string) {
    const tel = /^[\d\\+][\d\\(\\)\\ -]{4,14}\d$/;
    // const num = val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return tel.test(valE);
  }

  validateData(val: string) {
    return val.length > 3;
  }

  validateLength(val: string) {
    return val.length > 10 && val.length < 300;
  }

  validateChange() {
    const isValid = this.validate(this.inputRef.current?.value as string);

    const isValidEmail = this.validateEmail(
      this.emailRef.current?.value as string
    );

    const isValidTel = this.validateTel(this.telRef.current?.value as string);
    const isValidDate = this.validateData(
      this.dateRef.current?.value as string
    );
    const isValidText = this.validateLength(
      this.textareaRef.current?.value as string
    );

    this.setState(() => ({
      valid: isValid,
      validDate: isValidDate,
      validText: isValidText,
      validEmail: isValidEmail,
      validTel: isValidTel,
    }));
  }

  handleChange = () => {
    (this.buttonRef.current as HTMLButtonElement).disabled = false;
    this.validateChange();
  };

  handleShow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValid = this.validate(this.inputRef.current?.value as string);

    const isValidEmail = this.validateEmail(
      this.emailRef.current?.value as string
    );

    const isValidTel = this.validateTel(this.telRef.current?.value as string);
    const isValidDate = this.validateData(
      this.dateRef.current?.value as string
    );
    const isValidText = this.validateLength(
      this.textareaRef.current?.value as string
    );

    this.setState(() => ({
      valid: isValid,
      validDate: isValidDate,
      validText: isValidText,
      validEmail: isValidEmail,
      validTel: isValidTel,
    }));

    if (isValid && isValidDate && isValidText && isValidEmail && isValidTel) {
      fetch(
        ` https://react-form-19a9b-default-rtdb.europe-west1.firebasedatabase.app/people.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: (this.inputRef.current as HTMLInputElement).value,
            email: (this.emailRef.current as HTMLInputElement).value,
            tel: (this.telRef.current as HTMLInputElement).value,
            age: (this.dateRef.current as HTMLInputElement).value,
            text: (this.textareaRef.current as HTMLTextAreaElement).value,
          }),
        }
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          this.formRef.current?.reset();
          this.setState({ success: `success: successful sending` });
        })
        .catch((err) => this.setState({ errForm: `error: ${err}` }));

      (this.buttonRef.current as HTMLButtonElement).disabled = true;
    }
  };
  componentDidMount() {
    (this.buttonRef.current as HTMLButtonElement).disabled = true;
  }

  render() {
    const {
      valid,
      validDate,
      validText,
      validEmail,
      validTel,
      errForm,
      success,
    } = this.state;
    const color = valid ? 'green' : 'red';
    const colorDate = validDate ? 'green' : 'red';
    const colorText = validText ? 'green' : 'red';
    const colorTel = validTel ? 'green' : 'red';
    const colorEmail = validEmail ? 'green' : 'red';
    return (
      <div className="form-container">
        <form className="login-form" ref={this.formRef}>
          <label className="form-control" htmlFor="name">
            Name:
            <input
              className="form-input transform"
              ref={this.inputRef}
              type="text"
              name="name"
              onChange={this.handleChange}
              placeholder="First and last name"
              required
              style={{ borderColor: color }}
            />
          </label>
          <p className="small">
            {valid
              ? null
              : 'The name must contain from 3 to 30 characters space and surname from 3 to 30'}
          </p>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="E-mail"
              ref={this.emailRef}
              onChange={this.handleChange}
              style={{ borderColor: colorEmail }}
            />
          </label>
          <p className="small">
            {validEmail
              ? null
              : 'Fill in the address correctly example: username@example.com'}
          </p>
          <label htmlFor="phone">
            Phone:
            <input
              className="form-input"
              type="tel"
              name="phone"
              placeholder="Phone"
              ref={this.telRef}
              onChange={this.handleChange}
              style={{ borderColor: colorTel }}
            />
          </label>
          <p className="small">
            {validTel
              ? null
              : 'The number must contain only digits no more than 10'}
          </p>
          <label htmlFor="data">
            Birth date:
            <input
              className="form-input"
              ref={this.dateRef}
              type="date"
              name="date"
              onChange={this.handleChange}
              style={{ borderColor: colorDate }}
            />
          </label>
          <p className="small">{validDate ? null : 'Must be filled in'}</p>
          <label htmlFor="text">
            Text:
            <textarea
              className="form-input"
              ref={this.textareaRef as React.LegacyRef<HTMLTextAreaElement>}
              id="text"
              name="text"
              placeholder="Enter the message"
              onChange={this.handleChange}
              style={{ borderColor: colorText }}
            />
          </label>
          <p className="small">
            {validText
              ? null
              : 'Write at least something about yourself more than 10 letters'}
          </p>
          <button
            className="form-button"
            onClick={this.handleShow}
            type="submit"
            name="disable_button"
            ref={this.buttonRef}
            id="disable_button"
          >
            Show
          </button>
        </form>
        <h2 className="small">{errForm ? `${errForm}` : null}</h2>
        <h2 className="small-green">{success ? `${success}` : null}</h2>
      </div>
    );
  }
}

export { Form };
