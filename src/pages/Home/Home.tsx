import React, { FC } from 'react';
import { Picture } from '@interfaces/UserState';
import './Home.scss';
import { RootState } from '@app/store';
import { setNextWallpaper as _setNextWallpaper, setPrevWallpaper as _setPrevWallpaper } from '@redux/helpers/switchWallpaper';
import { connect } from 'react-redux';
import { Arrows } from '@/Arrows/Arrows';
import { Link } from '@/Links/Links';
import ProgressBar from '@/ProgressBar/ProgressBar';
import AspectRatio from '@/AspectRatio/AspectRatio';

interface Props {
  picture: Picture | undefined,
  isDownloadAllowed: boolean,
}

interface Handlers {
  setNextWallpaper: () => void,
  setPrevWallpaper: () => void
}

interface InnerProps extends Handlers {
  src: string,
  isDownloadAllowed: boolean,
  href: string,
  Content: () => JSX.Element,
}

const InnerHome: FC<InnerProps> = ({
  src, isDownloadAllowed, href, Content, setNextWallpaper, setPrevWallpaper,
}: InnerProps) => (
  <div className="page home">
    <Arrows
      handleForwardClick={setNextWallpaper}
      handleBackClick={setPrevWallpaper}
    />
    <AspectRatio src={src} />

    <div className="wrapper">
      {!isDownloadAllowed && <ProgressBar />}
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

const Home: FC<Props> = ({ picture, isDownloadAllowed }: Props) => {
  if (picture) {
    const { photographer, srcMain, photographerUrl } = picture;

    return (
      <InnerHome
        src={srcMain}
        isDownloadAllowed={isDownloadAllowed}
        href={photographerUrl}
        Content={() => Author(photographer)}
        setNextWallpaper={_setNextWallpaper}
        setPrevWallpaper={_setPrevWallpaper}
      />
    );
  }

  return <></>;
};

const mapStateToProps = ({ wallpaper, general }: RootState) => ({
  picture: wallpaper.collection[wallpaper.pictureIndex] || undefined,
  isDownloadAllowed: general.isDownloadAllowed,
});

export default connect(mapStateToProps)(Home);
