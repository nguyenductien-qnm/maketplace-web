import Grid from '@mui/material/Grid2'
import CategoryFilter from './CategoryFilter'
import DateFilter from './DateFilter'
import FilterButton from './FilterButton '
import ResetButton from './ResetButton '
import SearchButton from './SearchButton '
import SearchInput from './SearchInput '
function Filter() {
  return (
    <Grid container spacing={1}>
      <Grid size={2}>
        <DateFilter />
      </Grid>
      <Grid size={2}>
        <CategoryFilter />
      </Grid>
      <Grid size={1}>
        <FilterButton />
      </Grid>
      <Grid size={1}>
        <ResetButton />
      </Grid>
      <Grid size={2}></Grid>
      <Grid size={3}>
        <SearchInput />
      </Grid>
      <Grid size={1}>
        <SearchButton />
      </Grid>
    </Grid>
  )
}
export default Filter
