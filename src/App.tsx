import { AddressForm } from "./AddressForm"
import { useMultistepForm } from "./useMultisetpForm"
import { UserForm } from "./UserForm"
import { AccountForm } from "./AccountForm"
import { FormEvent } from "react"
import { useState} from "react";
import { FinishedStep } from "./FinishedStep"

type FormData = {
  firstName: string,
  lastName: string,
  age: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  email: string,
  password: string,
  confirmPassword: string
}

const INITAL_DATA: FormData= { 
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
  confirmPassword: ""
}

function App() {
  const [data, setData] = useState(INITAL_DATA)
  const [isSubmitted, setIsSubmitted] = useState(false); 
  function updateFields(fields : Partial<FormData>){
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const {steps, currentStepIndex, step, isFirstStep, back, next, isLastStep} = useMultistepForm([<UserForm {...data} updateFields={updateFields}/>, <AddressForm {...data} updateFields={updateFields}/>, <AccountForm {...data} updateFields={updateFields}/>])

  function onSubmit(e: FormEvent){
    e.preventDefault()
    if(!isLastStep) return next()
    setIsSubmitted(true);  
    //poderia colocar um fetch para submeter em alguma api
  }

  if(isSubmitted){
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <div style={{
          position: 'relative',
          background: 'white',
          border: '1px solid black',
          padding: '2rem',
          margin: '1rem',
          borderRadius: '.5rem',
          fontFamily: 'Poppins, sans-serif',
          maxWidth: 'max-content'}}>
            <FinishedStep />
        </div>
        
      </div>
    )
  }

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        
    }}>
       <div style={{
      position: 'relative',
      background: 'white',
      border: '1px solid black',
      padding: '2rem',
      margin: '1rem',
      borderRadius: '.5rem',
      fontFamily: 'Poppins, sans-serif',
      maxWidth: 'max-content',
    }}>
      <form onSubmit={onSubmit}>
        <div style={{
          position: 'absolute',
          top: '.5rem',
          right: '.5rem',
        }}>
           {currentStepIndex + 1}/{steps.length}</div>
           {step}
           <div style={{ marginTop : '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end'}}>
            {!isFirstStep &&<button type="button" onClick={back}>Back</button>}
            <button type='submit'>{isLastStep ? "Finish" : "Next"}</button>
           </div>
      </form>
      </div>
    </div>
   
  )
}

export default App
