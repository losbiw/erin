import React, { FC, useCallback } from 'react';
import { Picture } from '@interfaces/UserState';
import AspectRatio from '../AspectRatio/AspectRatio';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Arrows } from '../Arrows/Arrows';
import { Link } from '../Links/Links';
import './Home.scss';

interface Props {
  picture: Picture,
  progress: number,
  isLocked: boolean,
  pictureIndex: number,
  switchWallpaper: (index: number | boolean, shouldForceSwitch: boolean) => void
}

interface InnerProps {
  src: string,
  progress: number,
  isLocked: boolean,
  href: string,
  Content: () => JSX.Element,
  handleNextWallpaper: () => void,
  handlePrevWallpaper: () => void
}

const InnerHome: FC<InnerProps> = ({
  src, progress, handleNextWallpaper, handlePrevWallpaper, isLocked, href, Content,
}: InnerProps) => (
  <div className="page home">
    <Arrows
      handleForwardClick={handleNextWallpaper}
      handleBackClick={handlePrevWallpaper}
    />
    <AspectRatio src={src} />

    <div className="wrapper">
      { isLocked && <ProgressBar width={progress} /> }
      <Link href={href} Content={Content} />
    </div>
  </div>
);

const Author = (photographer: string) => (
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

const Home: FC<Props> = ({
  picture, progress, isLocked, switchWallpaper, pictureIndex,
}: Props) => {
  const { photographer, srcMain, photographerUrl } = picture;

  const handleNextWallpaper = useCallback(
    () => switchWallpaper(pictureIndex + 1, false),
    [pictureIndex],
  );

  const handlePrevWallpaper = useCallback(
    () => switchWallpaper(pictureIndex - 1, false),
    [pictureIndex],
  );

  return (
    <InnerHome
      src={srcMain}
      progress={progress}
      isLocked={isLocked}
      href={photographerUrl}
      Content={() => Author(photographer)}
      handleNextWallpaper={handleNextWallpaper}
      handlePrevWallpaper={handlePrevWallpaper}
    />
  );
};

export default Home;
