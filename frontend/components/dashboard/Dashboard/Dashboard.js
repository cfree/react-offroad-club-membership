import Link from 'next/link';
import styled from 'styled-components';
import { lighten, rgba } from 'polished';

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

const StyledDashboard = styled.div`
  margin-top: 50px;
`;

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
  padding: 20px 30px;
  font-size: 32px;
  display: block;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    background: url('static/img/toyota.jpg');
    background-image: linear-gradient(
      90deg,
      ${({ theme }) => rgba(theme.colors.grey_light, 1)} 0%,${({ theme }) => rgba(theme.colors.grey_light, 0.75)} 0%
    ),
    url('static/img/toyota.jpg');
    background-size: cover;
    background-position: center bottom;
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
    position: absolute;
    transition: 0.3s;
    z-index: -1;
  }

  &:hover:before,
  &:focus:before {
    transform: scale(1.2);
    transition: 0.3s;
  }
`;

const StyledDocumentLink = styled.a`
  padding: 20px 30px;
  font-size: 32px;
  display: block;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    background: url('static/img/docs.jpg');
    background-image: linear-gradient(
      90deg,
      ${({ theme }) => rgba(theme.colors.grey_light, 1)} 0%,${({ theme }) => rgba(theme.colors.grey_light, 0.65)} 0%
    ),
    url('static/img/docs.jpg');
    background-size: cover;
    background-position: center;
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
    position: absolute;
    transition: 0.3s;
    z-index: -1;
  }

  &:hover:before,
  &:focus:before {
    transform: scale(1.2);
    transition: 0.3s;
  }
`;

const Dashboard = () => (
  <StyledDashboard>
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
            <StyledDocumentLink>Documents</StyledDocumentLink>
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
      <p>
        Your account is being reviewed. To expedite this process, <Link href="/settings/profile"><a>fill out your profile</a></Link> and <Link href="/settings/garage"><a>add your rig</a></Link>.
      </p>
    </Filter>
  </StyledDashboard>
);

export default Dashboard;
