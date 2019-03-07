import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoadingImg = styled.img`
  animation: ${loading} 2s linear infinite;
  display: inline-block;
  height: 25px;
  width: auto;
  margin: 0 10px;
  vertical-align: middle;
`;

const Loading = ({ loading }) => {
  return loading && <StyledLoadingImg src="/static/img/loading.png" alt="Loading..." />;
};

export default Loading;
