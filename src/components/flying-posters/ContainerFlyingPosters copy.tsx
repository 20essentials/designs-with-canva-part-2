import FlyingPosters from './FlyingPosters';
import { arrayCards } from '@/utils/data';

const items = arrayCards.map(({ localImage }) => localImage);

export const ContainerFlyingPosters = () => {
  return (
    <article className='ContainerFlyingPosters'>
      <FlyingPosters items={items} />
    </article>
  );
};
