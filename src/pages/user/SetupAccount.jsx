import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormSetInfoUser from '~/components/user/SetupAccount/FormSetInfoUser'
import FormSetPassword from '~/components/user/SetupAccount/FormSetPassword'
import { setupAccount } from '~/redux/user.slice'
import { useDispatch } from 'react-redux'
const steps = ['CHANGE YOUR PASSWORD', 'INFORMATION USER']

export default function SetupAccount() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  const [formData, setFormData] = React.useState({
    newPassword: '',
    repeatPassword: '',
    userInfo: {}
  })

  const dispatch = useDispatch()

  const formRef = React.useRef(null)

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = async () => {
    if (activeStep === 0) {
      formRef.current.submitFormPassword()
    } else {
      formRef.current.submitFormInfo()
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleSubmitPassword = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      newPassword: data.newPassword,
      repeatPassword: data.repeatPassword
    }))
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleSubmitInfo = async (data) => {
    await new Promise((resolve) => {
      setFormData((prevData) => {
        resolve()
        return {
          ...prevData,
          userInfo: data
        }
      })
    })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const finishProgress = async () => {
    await dispatch(setupAccount(formData))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Box sx={{ width: '40%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}

            if (isStepSkipped(index)) {
              stepProps.completed = false
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={() => finishProgress()}>Confirm</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep == 0 ? (
              <FormSetPassword
                ref={formRef}
                handleSubmitPassword={handleSubmitPassword}
              />
            ) : (
              <FormSetInfoUser
                ref={formRef}
                handleSubmitInfo={handleSubmitInfo}
              />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === 1 && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  )
}
