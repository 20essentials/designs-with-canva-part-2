import { baseUrl } from '@/utils/functions';
import FlyingPosters from './FlyingPosters';
import { arrayCards } from '@/utils/data';

const items = arrayCards
  .toSorted(() => Math.random() - 0.5)
  .map(({ localImage, canvaWeb }) => ({
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
