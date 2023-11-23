import styled from 'styled-components';
import { StTwinkleDiv } from './Skeleton.styles';

const SkeletonCircle = styled(StTwinkleDiv)`
  width: ${(props) => props.width || 'var(--img-size)'};
  height: ${(props) => props.height || 'var(--img-size)'};

  background-color: var(--twinkle-color);
  grid-area: img;
  border-radius: 50%;
`;
export default SkeletonCircle;
