import React, {
  FC, useState, useEffect, memo,
} from 'react';
import { Picture } from '@interfaces/UserState';
import AspectRatio from '@/AspectRatio/AspectRatio';
import ProgressBar from '@/ProgressBar/ProgressBar';
import { Arrows } from '@icons/UI';
import { Arrow } from '@/Arrows/Arrows';
import './Picker.scss';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import { setIndexByNumber } from '@/User/slices/wallpaperSlice';

interface SharedProps {
  pictureIndex: number,
  isDownloadAllowed: boolean,
  setWallpaperByIndex: (index: number) => void
}

interface Props extends SharedProps {
  collection: Picture[],
}

interface PickerPicture {
  src: string,
  index: number,
  key: string
}

interface InnerProps extends SharedProps {
  collection: PickerPicture[],
  handleForwardClick: () => void,
  handleBackClick: () => void,
}

interface ArrowProps {
  children?: React.ReactNode,
  handleClick: () => void
}

const ArrowWrapper: FC<ArrowProps> = ({ children, handleClick }: ArrowProps) => (
  <div className="wrapper">
    {children}
    <Arrow
      Icon={Arrows.Forward}
      index={0}
      handleClick={handleClick}
    />
  </div>
);

ArrowWrapper.defaultProps = {
  children: undefined,
};

const InnerPicker: FC<InnerProps> = ({
  collection, isDownloadAllowed, pictureIndex,
  handleForwardClick, handleBackClick, setWallpaperByIndex,
}: InnerProps) => (
  <div className="picker page">
    <ArrowWrapper handleClick={handleBackClick} />

    <div className="slider">
      {collection
        && collection.map(({ src, key, index }) => {
          const isActive = pictureIndex === index;
          const handleAspectClick = isActive ? undefined : () => setWallpaperByIndex(index);

          return (
            <AspectRatio
              src={src}
              key={key}
              isActive={isActive}
              handleClick={handleAspectClick}
            />
          );
        })}
    </div>

    <ArrowWrapper handleClick={handleForwardClick}>
      {!isDownloadAllowed && <ProgressBar />}
    </ArrowWrapper>
  </div>
);

const Picker: FC<Props> = memo(({
  isDownloadAllowed, setWallpaperByIndex, pictureIndex, collection,
}: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [stateCollection, setCollection] = useState<PickerPicture[]>([]);

  const findClosestDividible = (number: number, divider: number): number => {
    if (number) return number - (number % divider);
    return 0;
  };

  const sortCollection = (collectionArg: Picture[], startIndexArg: number): void => {
    const sorted: PickerPicture[] = [];
    for (let i = startIndexArg; i < startIndexArg + 6; i += 1) {
      if (collectionArg[i]) {
        const { srcPicker, photographer } = collectionArg[i];

        sorted.push({
          src: srcPicker,
          index: i,
          key: photographer + i,
        });
      }
    }

    setStartIndex(startIndexArg);
    setCollection(sorted);
  };

  useEffect(() => {
    const closest = findClosestDividible(pictureIndex, 6);
    sortCollection(collection, closest);
  }, []);

  const switchWallpaperBlock = (isNext: boolean): void => {
    let updated = isNext ? startIndex + 6 : startIndex - 6;

    if (updated + 6 > collection.length) {
      updated = 0;
    } else if (updated < 0) {
      updated = collection.length - 6;
    }

    const closest = findClosestDividible(updated, 6);
    sortCollection(collection, closest);
  };

  const setPrevBlock = () => switchWallpaperBlock(false);
  const setNextBlock = () => switchWallpaperBlock(true);

  return (
    <InnerPicker
      collection={stateCollection}
      isDownloadAllowed={isDownloadAllowed}
      pictureIndex={pictureIndex}
      setWallpaperByIndex={setWallpaperByIndex}
      handleBackClick={setPrevBlock}
      handleForwardClick={setNextBlock}
    />
  );
});

const mapStateToProps = ({ wallpaper, general }: RootState) => ({
  collection: wallpaper.collection,
  pictureIndex: wallpaper.pictureIndex,
  isDownloadAllowed: general.isDownloadAllowed,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setWallpaperByIndex: (index: number) => dispatch(setIndexByNumber(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
