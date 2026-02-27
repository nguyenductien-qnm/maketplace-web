import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import TypographyTitle from '../common/TypographyTitle'
import TypographyLabel from '../common/TypographyLabel'
import ReadOnlyTextField from '../common/ReadOnlyTextField'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'

function CreatorInfoCard({ role, creator }) {
  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle sx={{ mb: 3 }}>Creator</TypographyTitle>

      <Grid2 container spacing={3} sx={{ mt: 2 }}>
        <Grid2 size={6}>
          <TypographyLabel>Creator Role</TypographyLabel>
          <ReadOnlyTextField value={capitalizeFirstLetter(role ?? 'N/A')} />
        </Grid2>

        <Grid2 size={6}>
          <TypographyLabel>Creator Name</TypographyLabel>
          <ReadOnlyTextField value={creator?.creator_name ?? 'N/A'} />
        </Grid2>

        <Grid2 size={6}>
          <TypographyLabel>Creator Code</TypographyLabel>
          <ReadOnlyTextField value={creator?.creator_code ?? 'N/A'} />
        </Grid2>
      </Grid2>
    </Card>
  )
}

export default CreatorInfoCard
