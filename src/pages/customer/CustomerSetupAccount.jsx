import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormSetInfoUser from '~/components/customer/CustomerSetupAccount/FormSetInfo'
import FormSetPassword from '~/components/customer/CustomerSetupAccount/FormSetPassword'
import { Fragment } from 'react'
import { useSetupAccount } from '~/hooks/user.hook'

function CustomerSetupAccount() {
  const {
    steps,
    activeStep,
    isStepSkipped,
    formRef,
    handleNext,
    handleBack,
    handleSkip,
    handleSubmitPassword,
    handleSubmitInfo,
    finishProgress
  } = useSetupAccount()

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

export default CustomerSetupAccount
