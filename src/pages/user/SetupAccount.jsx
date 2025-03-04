import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormSetInfoUser from '~/components/user/SetupAccount/FormSetInfoUser'
import FormSetPassword from '~/components/user/SetupAccount/FormSetPassword'
import { setupAccountAPI } from '~/redux/user.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import dayjs from 'dayjs'
const steps = ['CHANGE YOUR PASSWORD', 'INFORMATION USER']

function SetupAccount() {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
    userInfo: {}
  })

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const formRef = useRef(null)

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
      new_password: data.new_password,
      confirm_password: data.confirm_password
    }))
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleSubmitInfo = async (data) => {
    const convertedData = {
      ...data,
      user_date_of_birth: dayjs(data.user_date_of_birth).format('MM/DD/YYYY')
    }
    console.log(data)
    await new Promise((resolve) => {
      setFormData((prevData) => {
        resolve()
        return {
          ...prevData,
          userInfo: convertedData
        }
      })
    })

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const finishProgress = async () => {
    const res = await dispatch(
      setupAccountAPI({
        data: formData,
        loadingClass: '.btn-auth-setup-account'
      })
    )
    if (res.payload?.status === 200)
      setTimeout(() => {
        navigate('/home')
      }, 1000)
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
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                className="btn-auth-setup-account"
                onClick={() => finishProgress()}
              >
                Confirm
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
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
          </Fragment>
        )}
      </Box>
    </Box>
  )
}

export default SetupAccount
