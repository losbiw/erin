import React, { FC } from 'react';
import { Picture } from '@interfaces/UserState';
import AspectRatio from '@/AspectRatio/AspectRatio';
import ProgressBar from '@/ProgressBar/ProgressBar';
import { Arrows } from '@/Arrows/Arrows';
import { Link } from '@/Links/Links';
import './Home.scss';
import { AppDispatch, RootState } from '@app/store';
import { decrementIndex, incrementIndex } from '@/User/slices/wallpaperSlice';
import { connect } from 'react-redux';

interface Handlers {
  setNextWallpaper: () => void,
  setPrevWallpaper: () => void
}

interface Props extends Handlers {
  picture: Picture | undefined,
  isDownloadAllowed: boolean,
}

interface InnerProps extends Handlers {
  src: string,
  isDownloadAllowed: boolean,
  href: string,
  Content: () => JSX.Element,
}

const InnerHome: FC<InnerProps> = ({
  src, setNextWallpaper, setPrevWallpaper, isDownloadAllowed, href, Content,
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

const Home: FC<Props> = ({
  picture, isDownloadAllowed, setNextWallpaper, setPrevWallpaper,
}: Props) => {
  if (picture) {
    const { photographer, srcMain, photographerUrl } = picture;

    return (
      <InnerHome
        src={srcMain}
        isDownloadAllowed={isDownloadAllowed}
        href={photographerUrl}
        Content={() => Author(photographer)}
        setNextWallpaper={setNextWallpaper}
        setPrevWallpaper={setPrevWallpaper}
      />
    );
  }

  return <></>;
};

const mapStateToProps = ({ wallpaper, general }: RootState) => ({
  picture: wallpaper.collection[wallpaper.pictureIndex] || undefined,
  isDownloadAllowed: general.isDownloadAllowed,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setNextWallpaper: () => dispatch(incrementIndex()),
  setPrevWallpaper: () => dispatch(decrementIndex()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
