import styled from 'styled-components';
import { StTwinkleDiv } from './Skeleton.styles';

const StSkeletonCircle = styled(StTwinkleDiv)`
  width: var(--img-size);
  height: var(--img-size);

  background-color: gray;
  grid-area: img;
  border-radius: 50%;
`;
export default StSkeletonCircle;
