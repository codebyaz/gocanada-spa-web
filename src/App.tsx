import { useState } from 'react'
import Main from 'react-bootstrap/Container';

import { CalculatorForm } from './components/CalculatorForm/CalculatorForm';
import { Header } from './components/Header/Header';

import '/public/global.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Main>
        <CalculatorForm />
      </Main>
    </div>
  )
}

export default App
