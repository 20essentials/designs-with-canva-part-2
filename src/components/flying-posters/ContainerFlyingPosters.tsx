import FlyingPosters from './FlyingPosters';
import { arrayCards } from '@/utils/data';

const items = arrayCards.map(({ localImage, canvaWeb }) => ({
  srcImage: localImage,
  web: canvaWeb
}));
// export type ArrayItem = { srcImage: string; web: string }[];


export const ContainerFlyingPosters = () => {
  return (
    <article className='ContainerFlyingPosters'>
      <FlyingPosters items={items} />
    </article>
  );
};
