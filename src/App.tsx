import React from 'react';
import { Form } from './components/Form';
import { FormTwo } from './components/FormTwo';

function App() {
  return (
    <div className="App">
      <h1>
        Так как в задании не было сказано делать на классовых компонентах или на
        хуках сделал две формы
      </h1>
      <h2 className="small-title">форма на классовых</h2>
      <Form />
      <h2 className="small-title">форма на хуках</h2>
      <FormTwo />
    </div>
  );
}

export default App;

