import React from 'react';
import styled from 'styled-components';

const StyledPlaceholder = styled.div`
  margin: 10px;
  height: 85px;
  width: 85px;
  background: silver;
  line-height: 85px;
  text-align: center;
  float: left;
`;

const RecentPhotos = () => {
  return (
    <div>
      <h3>Recent Photos</h3>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
      <StyledPlaceholder>Photo</StyledPlaceholder>
    </div>
  );
};

export default RecentPhotos;
