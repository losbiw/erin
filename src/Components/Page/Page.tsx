import React, { FC, lazy, Suspense } from 'react';
import { Pages, SharedState } from '@/interfaces/UserState';
import { Warning } from '@/interfaces/Warning';
import { Config } from '@/interfaces/Config';
import './Page.scss';
import Loading from '../Loading/Loading';

const Home = lazy(() => import('../Home/Home'));
const Picker = lazy(() => import('../Picker/Picker'));
const Settings = lazy(() => import('../Settings/Settings'));
const Info = lazy(() => import('../Info/Info'));

interface Props extends SharedState{
    switchWallpaper: (index: number | boolean, isUnlocked: boolean) => void,
    setWarning: (warning: string | Warning) => void,
    setIsComplete: (isComplete: boolean) => void,
    updateConfig: (config: Config, isRequiredFilled?: boolean) => void
}

const Page: FC<Props> = (props: Props) => {
  const {
    switchWallpaper, setIsComplete, current, collection, pictureIndex, isLocked, progress, config,
  } = props;
  let Element;

  if (current === Pages.Home && collection.length > 0) {
    Element = () => (
      <Home
        picture={collection[pictureIndex]}
        isLocked={isLocked}
        progress={progress}
        pictureIndex={pictureIndex}
        switchWallpaper={switchWallpaper}
      />
    );
  } else if (current === Pages.Picker) {
    Element = () => (
      <Picker
        pictureIndex={pictureIndex}
        collection={collection}
        isLocked={isLocked}
        progress={progress}
        switchWallpaper={switchWallpaper}
      />
    );
  } else if (current === Pages.Settings) {
    const { setWarning, updateConfig } = props;

    Element = () => (
      <Settings
        config={config}
        setWarning={setWarning}
        setIsComplete={setIsComplete}
        updateConfig={updateConfig}
      />
    );
  } else if (current === Pages.Info) {
    const { setWarning } = props;

    Element = () => (
      <Info setWarning={setWarning} />
    );
  } else {
    Element = () => <></>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Element />
    </Suspense>
  );
};

export default Page;
