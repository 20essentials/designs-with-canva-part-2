import { baseUrl } from '@/utils/functions';
import FlyingPosters from './FlyingPosters';
import { arrayCards } from '@/utils/data';

const items = arrayCards.map(({ localImage, canvaWeb }) => ({
  srcImage: baseUrl(localImage),
  web: canvaWeb
}));

export const ContainerFlyingPosters = () => {
  return (
    <article className='ContainerFlyingPosters'>
      <FlyingPosters items={items} />
    </article>
  );
};
