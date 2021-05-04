import React, { FC, useCallback, useMemo } from 'react';
import { Picture } from '@interfaces/UserState';
import AspectRatio from '../AspectRatio/AspectRatio';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Arrows } from '../Arrows/Arrows';
import { MemoizedLinks as Links } from '../Links/Links';
import './Home.scss';

interface Props{
    picture: Picture,
    progress: number,
    isLocked: boolean,
    pictureIndex: number,
    switchWallpaper: (index: number | boolean, shouldForceSwitch: boolean) => void
}

const Home: FC<Props> = (props: Props) => {
  const {
    picture, progress, isLocked, switchWallpaper, pictureIndex,
  } = props;
  const { photographer, srcMain, photographerUrl } = picture;

  const handleNextWallpaper = useCallback(
    () => switchWallpaper(pictureIndex + 1, true), [pictureIndex],
  );

  const handlePrevWallpaper = useCallback(
    () => switchWallpaper(pictureIndex - 1, true), [pictureIndex],
  );

  const author = () => (
    <div className="author">
      <p className="text">Photo by </p>
      <span className="medium">
        {' '}
        {photographer}
        {' '}
      </span>
      <p className="text"> on </p>
      <span className="medium">Pexels</span>
    </div>
  );

  const links = useMemo(() => ({
    author: {
      href: photographerUrl,
      Content: author,
    },
  }), [photographerUrl]);

  return (
    <div className="page home">
      <Arrows
        handleForwardClick={handleNextWallpaper}
        handleBackClick={handlePrevWallpaper}
      />
      <AspectRatio src={srcMain} />

      <div className="wrapper">
        { isLocked && <ProgressBar width={progress} /> }
        <Links links={links} />
      </div>
    </div>
  );
};

export default Home;
