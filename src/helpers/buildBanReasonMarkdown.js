import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import { stripHtml } from '~/utils/stripHtml'

export const buildBanReasonMarkdown = (log) => {
  if (!log) return ''

  return `
**ID:** ${log._id}

**Action:** ${capitalizeFirstLetter(log.action)}

**Action at:** ${log.createdAt}

**Reason:** ${stripHtml(log.reason)}
`.trim()
}
