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
      <Grid item size={2}>
        <DateFilter />
      </Grid>
      <Grid item size={2}>
        <CategoryFilter />
      </Grid>
      <Grid item size={1}>
        <FilterButton />
      </Grid>
      <Grid item size={1}>
        <ResetButton />
      </Grid>
      <Grid item size={2}></Grid>
      <Grid item size={3}>
        <SearchInput />
      </Grid>
      <Grid item size={1}>
        <SearchButton />
      </Grid>
    </Grid>
  )
}
export default Filter
