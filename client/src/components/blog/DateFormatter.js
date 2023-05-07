import { parseISO, format } from 'date-fns'

const DateFormatter = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <time style={{ fontWeight: 'bold' }} dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
    </time>
  )
}

export default DateFormatter
