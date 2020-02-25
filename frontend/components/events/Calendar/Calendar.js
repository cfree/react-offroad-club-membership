import styled from 'styled-components';
import { format } from 'date-fns';

const StyledCalendar = styled.div`
  text-align: center;
  padding: 5px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  background: ${({ theme }) => theme.colors.white_dark};

  .date {
    color: ${({ theme }) => theme.colors.red};
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }

  .month {
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black_light};
    font-size: 1.2rem;
    line-height: 1;
  }
`;

const Calendar = ({ date }) => {
  return (
    <StyledCalendar title={format(date, 'MM-DD-YYYY')}>
      <div className="date">{format(date, 'D')}</div>
      <div className="month">{format(date, 'MMM')}</div>
    </StyledCalendar>
  );
};

export default Calendar;
