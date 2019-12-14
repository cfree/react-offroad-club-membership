import Link from 'next/link';
import styled from 'styled-components';
import { lighten } from 'polished';

import Filter from '../../Login/Filter';
import PollingPlace from '../../voting/PollingPlace';
import NextEvent from '../NextEvent';
import EventsSchedule from '../EventsSchedule';
import RunReports from '../RunReports';
import RecentPhotos from '../RecentPhotos';
import RecentCheckIns from '../RecentCheckIns';
import {
  isFullMember,
  isNotFullMember,
  isNotLocked,
  isLocked,
} from '../../../lib/utils';

import { StyledContainer } from '../dashboard.styles';

const StyledHalf = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 30px;
`;

const StyledThird = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 30px;
`;

const StyledRosterLink = styled.a`
  padding: 20px;
  background: ${lighten(0.3, 'red')};
  font-size: 32px;
  display: block;
  color: white;
  cursor: pointer;
`;

const StyledDocumentLink = styled.a`
  padding: 20px;
  background: ${lighten(0.3, 'red')};
  font-size: 32px;
  display: block;
  color: white;
  cursor: pointer;
`;

const Dashboard = () => (
  <>
    <Filter statusCheck={isNotLocked}>
      <StyledThird>
        <StyledContainer>
          <NextEvent />
        </StyledContainer>
        <StyledContainer>
          <EventsSchedule />
        </StyledContainer>
      </StyledThird>

      <StyledHalf>
        <StyledContainer>
          <Link href="/roster">
            <StyledRosterLink>Roster</StyledRosterLink>
          </Link>
        </StyledContainer>
        <StyledContainer>
          <Link href="/documents">
            <StyledRosterLink>Documents</StyledRosterLink>
          </Link>
        </StyledContainer>
        {/* <StyledContainer>
          <Link href="/history">
            <StyledDocumentLink>Club History</StyledDocumentLink>
          </Link>
        </StyledContainer> */}
      </StyledHalf>

      {/* <StyledThird>
        <StyledContainer>
          <RecentPhotos />
        </StyledContainer>

        <StyledContainer>
          <RunReports />
          <RecentCheckIns />
        </StyledContainer>
      </StyledThird> */}
      {/* <PollingPlace /> */}
    </Filter>
    <Filter statusCheck={isLocked}>
      <p>Your account is being reviewed, please check back later.</p>
    </Filter>
  </>
);

export default Dashboard;
