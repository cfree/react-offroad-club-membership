import * as yup from 'yup';
import { format } from 'date-fns';

export const eventSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  startDate: yup
    .date()
    .min(format(new Date(), 'YYYY-MM-DD'))
    .required('Start date is required'),
  startTime: yup.string().required('Start time is required'),
  endDate: yup
    .date()
    .min(format(new Date(), 'YYYY-MM-DD'))
    .required('End date is required'),
  endTime: yup.string().required('End time is required'),
  address: yup.string(),
  trailDifficulty: yup.string().required(),
  // trailNotes: yup.string(),
  rallyAddress: yup.string(),
  rallyTime: yup
    .string()
    .nullable()
    .default(null),
  membersOnly: yup.boolean(),
  host: yup.string(), // ID
  trail: yup.string().nullable(), // ID
});
