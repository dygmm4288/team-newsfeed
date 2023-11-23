import styled from 'styled-components';
import { StTwinkleDiv } from './Skeleton.styles';

const SkeletonLine = styled(StTwinkleDiv)`
  background-color: var(--twinkle-color);
  grid-area: line;
  border-radius: 3rem;
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '20px'};
`;
export default SkeletonLine;
