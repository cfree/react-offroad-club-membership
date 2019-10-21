import { format, subYears, subDays } from 'date-fns';

export const dateEighteenYearsAgo = format(
  subYears(subDays(new Date(), 1), 18),
  'YYYY-MM-DD',
);
