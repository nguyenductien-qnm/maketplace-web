import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AttributeField from './AttributeField'
import { red } from '@mui/material/colors'
import { toast } from 'react-toastify'
import { Controller } from 'react-hook-form'
import { useProductAttributes } from '../../../hook/form/useProductAttribute'
import { PRODUCT_TAG_RULE, PRODUCT_TAG_RULE_MESSAGE } from '~/utils/validators'
import {
  PRODUCT_DETAIL_INFO_TOOLTIP,
  PRODUCT_TAGS_LIMIT
} from '../../../constants/product.constant'

function DetailInformation({ form }) {
  const { control } = form
  const { fieldsAttribute, handleAddAttribute, handleRemoveAttribute } =
    useProductAttributes({ control })

  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle sx={{ mb: 3 }}>Detail Information</TypographyTitle>

      <Grid2 container rowSpacing={3} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TypographyLabel>Product Tags</TypographyLabel>
            <Tooltip
              arrow
              placement="top"
              title={PRODUCT_DETAIL_INFO_TOOLTIP.TAGS}
            >
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
            </Tooltip>
          </Box>
          <Controller
            name="product_tags"
            control={control}
            defaultValue={[]}
            rules={{
              validate: {
                validTags: (value) => {
                  if (!value || value.length === 0) return true

                  const invalidTags = value.filter(
                    (tag) => !PRODUCT_TAG_RULE.test(tag)
                  )
                  if (invalidTags.length > 0) {
                    return `Invalid tags: ${invalidTags.join(
                      ', '
                    )}. ${PRODUCT_TAG_RULE_MESSAGE}`
                  }
                  return true
                }
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Autocomplete
                  fullWidth
                  multiple
                  freeSolo
                  options={[]}
                  value={field.value}
                  onChange={(event, newValue) => {
                    if (newValue.length < field.value.length) {
                      field.onChange(newValue)
                      return
                    }
                    const lastTag = newValue[newValue.length - 1]
                    if (lastTag && !PRODUCT_TAG_RULE.test(lastTag)) {
                      toast.error(PRODUCT_TAG_RULE_MESSAGE)
                      return
                    }
                    if (newValue.length > PRODUCT_TAGS_LIMIT) {
                      toast.warn(
                        `You can add up to ${PRODUCT_TAGS_LIMIT} items only`
                      )
                      return
                    }
                    field.onChange(newValue)
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const isInvalid = !PRODUCT_TAG_RULE.test(option)
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={`tag-${index}`}
                          color={isInvalid ? 'error' : 'default'}
                        />
                      )
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      placeholder={
                        field.value?.length >= PRODUCT_TAGS_LIMIT
                          ? `Maximum ${PRODUCT_TAGS_LIMIT} tags reached`
                          : 'Enter tags'
                      }
                      error={!!error}
                      helperText={
                        error?.message ||
                        `${field.value?.length || 0}/${PRODUCT_TAGS_LIMIT} tags`
                      }
                    />
                  )}
                />
              </>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TypographyLabel>Product Attribute</TypographyLabel>
            <Tooltip
              arrow
              placement="top"
              title={PRODUCT_DETAIL_INFO_TOOLTIP.ATTRIBUTES}
            >
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fieldsAttribute.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start'
                }}
              >
                <AttributeField
                  form={form}
                  index={index}
                  fieldType="key"
                  placeholder="Key"
                  errorMessage="Key is required"
                />

                <AttributeField
                  form={form}
                  index={index}
                  fieldType="value"
                  placeholder="Value"
                  errorMessage="Value is required"
                />

                <HighlightOffOutlinedIcon
                  onClick={() => handleRemoveAttribute(index)}
                  sx={{
                    color: red[600],
                    cursor: 'pointer',
                    mt: 1,
                    '&:hover': { opacity: 0.7 }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid2>

        <Grid2 size={12}>
          <Button onClick={handleAddAttribute} variant="outlined">
            + Add Attribute
          </Button>
        </Grid2>
      </Grid2>
    </Card>
  )
}

export default DetailInformation
