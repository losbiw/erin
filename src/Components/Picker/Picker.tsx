import React, {
  FC, useState, useEffect, memo,
} from 'react';
import { Picture } from '@/interfaces/UserState';
import AspectRatio from '../AspectRatio/AspectRatio';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Arrows } from '../Icons/UI';
import { Arrow } from '../Arrows/Arrows';
import './Picker.scss';

interface Props{
    collection: Picture[],
    pictureIndex: number,
    isLocked: boolean,
    progress: number,
    switchWallpaper: (index: number | boolean, shouldForceSwitch: boolean) => void
}

interface PickerPicture{
    src: string,
    index: number,
    key: string
}

const Picker: FC<Props> = memo((props: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [stateCollection, setCollection] = useState<PickerPicture[]>([]);

  const {
    progress, isLocked, switchWallpaper, pictureIndex, collection,
  } = props;

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

  return (
    <div className="picker page">
      <div className="wrapper">
        <Arrow
          Icon={Arrows.Forward}
          index={0}
          handleClick={() => switchWallpaperBlock(false)}
        />
      </div>

      <div className="slider">
        { stateCollection
          && stateCollection.map((pic) => {
            const { src, key, index } = pic;
            const isActive = pictureIndex === pic.index;

            return (
              <AspectRatio
                src={src}
                key={key}
                isActive={isActive}
                handleClick={isActive ? undefined : () => switchWallpaper(index, false)}
              />
            );
          })}
      </div>

      <div className="wrapper">
        { isLocked && <ProgressBar width={progress} /> }

        <Arrow
          Icon={Arrows.Back}
          index={0}
          handleClick={() => switchWallpaperBlock(true)}
        />
      </div>
    </div>
  );
});

export default Picker;
