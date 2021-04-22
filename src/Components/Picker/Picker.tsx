import React, { Component } from 'react';
import { Picture } from '@/interfaces/UserState';
import AspectRatio from '../AspectRatio/AspectRatio';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Arrows } from '../Icons/UI'
import { Arrow } from '../Arrows/Arrows';
import './Picker.scss';

interface Props{
    collection: Picture[],
    pictureIndex: number,
    isLocked: boolean,
    progress: number,
    switchWallpaper: (index: number | boolean, isUnlocked: boolean) => void
}

interface PickerPicture{
    src: string,
    index: number,
    key: string
}

interface State{
    startIndex: number,
    collection: PickerPicture[]
}

export default class Picker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      startIndex: 0,
      collection: [],
    };
  }

  componentDidMount() {
    const { findClosestDividible, sortCollection, props } = this;
    const { pictureIndex, collection } = props;
    const closest = findClosestDividible(pictureIndex, 6);

    sortCollection(collection, closest);
  }

  componentDidUpdate(prevProps: Props) {
    const { collection } = this.props;

    if ((prevProps.collection !== collection)) {
      this.componentDidMount();
    }
  }

    sortCollection = (collection: Picture[], startIndex: number): void => {
      const sorted: PickerPicture[] = [];
      for (let i = startIndex; i < startIndex + 6; i++) {
        if (collection[i]) {
          const { srcPicker, photographer } = collection[i];

          sorted.push({
            src: srcPicker,
            index: i,
            key: photographer + i,
          });
        }
      }

      this.setState({
        startIndex,
        collection: sorted,
      });
    }

    switchWallpaperBlock = (isNext: boolean): void => {
      const { findClosestDividible, sortCollection, props } = this;
      const { startIndex } = this.state;
      const { collection } = props;
      let updated = isNext ? startIndex + 6 : startIndex - 6;

      if (updated + 6 > collection.length) { updated = 0; } else if (updated < 0) { updated = collection.length - 6; }

      const closest = findClosestDividible(updated, 6);
      sortCollection(collection, closest);
    }

    findClosestDividible(number: number, divider: number): number {
      if (number) return number - (number % divider);
      return 0;
    }

    render() {
      const { switchWallpaperBlock, state, props } = this;
      const { collection } = state;
      const { progress, isLocked, switchWallpaper } = props;

      return (
        <div className="picker page">
          <div className="wrapper">
            <Arrow Icon={Arrows.Forward}
                  index={0}
                  handleClick={() => switchWallpaperBlock(false)}/>
          </div>

          <div className="slider">
            { collection
                && collection.map((pic) => {
                  const { src, key, index } = pic;
                  const isActive = this.props.pictureIndex === pic.index;

                  return (
                    <AspectRatio src={src} key={key} isActive={isActive}
                      handleClick={isActive ? undefined : () => switchWallpaper(index, false)}/>
                  );
                })}
          </div>

          <div className="wrapper">
            { isLocked && <ProgressBar width={progress} /> }

            <Arrow Icon={Arrows.Back}
                  index={0}
                  handleClick={() => switchWallpaperBlock(true)}
            />
          </div>
        </div>
      );
    }
}