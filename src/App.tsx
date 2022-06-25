import React from 'react';
import { Form } from './components/Form';
import { FormTwo } from './components/FormTwo';
import './app.sass';

function App() {
  return (
    <div className="container">
      <h1 className="header-title">
        Так как в задании не было сказано делать на классовых компонентах или на
        хуках сделал две формы
      </h1>
      <h2 className="small-title">форма на хуках</h2>
      <FormTwo />
      <h2 className="small-title">Классовые компоненты</h2>
      <Form />
    </div>
  );
}

export default App;

