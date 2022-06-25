import { useState, useEffect, FocusEvent } from 'react';
import './index.sass';

export const FormTwo = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [tel, setTel] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [success, setSuccess] = useState('');
  const [errForm, setErrForm] = useState('');
  const [valid, setValid] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validText, setValidText] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validTel, setValidTel] = useState(true);
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [textDirty, setTextDirty] = useState(false);
  const [telDirty, setTelDirty] = useState(false);
  const [birthDateDirty, setBirthDateDirty] = useState(false);

  const validateName = (val: string) => {
    const position = val.indexOf(' ', val.indexOf(' ') + 1);
    const re = /^(?:[a-zA-Z\s]{3,30})(\s[a-zA-Z\s]{3,30})$/;
    return re.test(val) && position === -1;
  };

  const validateEmail = (val: string) => {
    const res = /^([a-zA-Z][a-zA-Z0-9-_]{2,15})*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(val);
  };

  const validateTel = (valE: string) => {
    const valString = valE;
    let matrix = '+7 (___) ___ ____',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = valE.replace(/\D/g, ''),
      newalue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newalue.indexOf('_');
    if (i !== -1) {
      i < 5 && (i = 3);
      newalue = newalue.slice(0, i);
    }

    valE = newalue;
    setTel(valE);
    return valString.length > 16;
  };

  const validateData = (val: string) => {
    return val.length > 3;
  };

  const validateLength = (val: string) => {
    return val.length > 10 && val.length < 300;
  };
  const focusHandler = (
    e:
      | FocusEvent<HTMLInputElement, Element>
      | FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'text':
        setTextDirty(true);
        break;
      case 'tel':
        setTelDirty(true);
        break;
      case 'birthDate':
        setBirthDateDirty(true);
        break;
    }
  };
  const validateChange = () => {
    if (firstNameDirty) {
      const isValid = validateName(firstName);
      setValid(isValid);
    }
    if (emailDirty) {
      const isValidEmail = validateEmail(email);
      setValidEmail(isValidEmail);
    }
    if (birthDateDirty) {
      const isValidDate = validateData(birthDate);
      setValidDate(isValidDate);
    }
    if (telDirty) {
      const isValidTel = validateTel(tel);
      setValidTel(isValidTel);
    }
    if (textDirty) {
      const isValidText = validateLength(text);
      setValidText(isValidText);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isValid = validateName(firstName);
    setValid(isValid);
    const isValidEmail = validateEmail(email);
    setValidEmail(isValidEmail);
    const isValidTel = validateTel(tel);
    setValidTel(isValidTel);
    const isValidDate = validateData(birthDate);
    setValidDate(isValidDate);
    const isValidText = validateLength(text);
    setValidText(isValidText);

    if (isValid && isValidDate && isValidText && isValidEmail && isValidTel) {
      fetch(
        ` https://react-form-19a9b-default-rtdb.europe-west1.firebasedatabase.app/people.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            email: email,
            tel: tel,
            age: birthDate,
            text: text,
          }),
        }
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          setSuccess(`success: successful sending`);
          reset();
        })
        .catch((err) => setErrForm(`error: ${err}`));
    }
  };
  const reset = () => {
    setTel('');
    setFirstName('');
    setEmail('');
    setText('');
    setBirthDate('');
  };

  useEffect(() => {
    validateChange();
  });

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-control" htmlFor="firstName">
          Name:
          <input
            className="form-input transform"
            type="text"
            name="firstName"
            placeholder="First and last name"
            value={firstName}
            onFocus={(e) => focusHandler(e)}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={email}
            onFocus={(e) => focusHandler(e)}
            name="email"
            className="form-input"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <p className="small">
          {validEmail
            ? null
            : 'Fill in the address correctly example: username@example.com'}
        </p>
        <label htmlFor="tel">
          Phone:
          <input
            className="form-input"
            type="tel"
            name="tel"
            id="tel"
            value={tel}
            onFocus={(e) => focusHandler(e)}
            placeholder="+7(000)000-00-00"
            onChange={(e) => setTel(e.target.value)}
          />
        </label>
        <p className="small">
          {validTel
            ? null
            : 'The number must contain only digits no more than 11'}
        </p>
        <label htmlFor="birthDate">
          Birth date:
          <input
            className="form-input"
            type="date"
            value={birthDate}
            onFocus={(e) => focusHandler(e)}
            name="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <p className="small">{validDate ? null : 'Must be filled in'}</p>
        <label htmlFor="text">
          Text:
          <textarea
            className="form-input"
            id="text"
            name="text"
            value={text}
            onFocus={(e) => focusHandler(e)}
            placeholder="Enter the message"
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <p className="small">
          {validText
            ? null
            : 'Write at least something about yourself more than 10 letters'}
        </p>
        <div>
          <button
            className="form-button"
            value="Send"
            type="submit"
            name="disable_button"
            id="disable_button"
          >
            Show
          </button>
        </div>
      </form>
      <h2 className="small">{errForm ? `${errForm}` : null}</h2>
      <h2 className="small-green">{success ? `${success}` : null}</h2>
    </div>
  );
};
