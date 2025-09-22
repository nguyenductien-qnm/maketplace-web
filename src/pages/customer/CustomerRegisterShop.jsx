import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import BasicShopInfoForm from '~/components/customer/CustomerRegisterShop/BasicShopInfoForm'
import ShopTypeTaxForm from '~/components/customer/CustomerRegisterShop/ShopTypeTaxForm'
import PaymentMethodForm from '~/components/customer/CustomerRegisterShop/PaymentMethodForm'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import ReviewInformation from '~/components/customer/CustomerRegisterShop/ReviewInformation'
import { Fragment, useEffect } from 'react'
import { useUserRegisterShop } from '~/hooks/user/registerShop.hook'
import { useOwnerShopStatus } from '~/hooks/user/user.hook'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { navigate } from '~/helpers/navigation'

function CustomerRegisterShop() {
  const {
    submitting,
    register,
    errors,
    control,
    getValues,
    watch,
    handleFormSubmit,
    activeStep,
    handleNext,
    handleBack,
    STEPS_ACCOUNT_MIGRATION
  } = useUserRegisterShop()

  const { loading, shopStatus } = useOwnerShopStatus()

  useEffect(() => {
    if (shopStatus) navigate('/my-account/dashboard')
  }, [shopStatus])

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularIndeterminate />
        </Box>
      )}

      {!loading && (
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
              {STEPS_ACCOUNT_MIGRATION.map((label) => {
                const stepProps = {}
                const labelProps = {}
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>

            {activeStep === STEPS_ACCOUNT_MIGRATION.length ? (
              <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    variant="outlined"
                    className="btn-action-account-migration"
                    onClick={handleFormSubmit}
                  >
                    {submitting ? (
                      <CircularIndeterminate size="20px" />
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                {(() => {
                  switch (activeStep) {
                    case 0:
                      return (
                        <BasicShopInfoForm
                          register={register}
                          errors={errors}
                          control={control}
                          getValues={getValues}
                        />
                      )
                    case 1:
                      return (
                        <ShopTypeTaxForm
                          register={register}
                          errors={errors}
                          watch={watch}
                          control={control}
                        />
                      )
                    case 2:
                      return (
                        <PaymentMethodForm
                          register={register}
                          control={control}
                          errors={errors}
                        />
                      )
                    case 3:
                      return <ReviewInformation getValues={getValues} />
                  }
                })()}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    className="btn-action-account-migration"
                  >
                    {activeStep === STEPS_ACCOUNT_MIGRATION.length - 1 ? (
                      'Finish'
                    ) : submitting ? (
                      <CircularIndeterminate size="20px" />
                    ) : (
                      'Next'
                    )}
                  </Button>
                </Box>
              </Fragment>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default CustomerRegisterShop
