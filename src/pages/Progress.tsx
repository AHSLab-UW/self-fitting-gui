import React, { useState } from 'react'
import MultiStepProgressBar from '../components/ProgressBar'

type Props = {}

export default function Progress({}: Props) {
  const [step, setStep] = useState(1);

  return (
    <>
        <div>ProgressBar</div>
        <MultiStepProgressBar step = {step} />
        <button onClick={() => setStep(step + 1)}>Next</button>
    </>
  )
}
