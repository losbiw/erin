import React, { FC, memo } from 'react';
import './Links.scss';

const { shell } = window.require('electron');

interface Link{
    title?: string,
    href: string,
    Content?: React.FC<React.SVGProps<SVGSVGElement>>
}

interface Props{
    links: {
        [key: string]: Link
    }
}

const Links: FC<Props> = (props: Props) => {
  const { links } = props;
  const keys = Object.keys(links);

  return (
    <div className="links">
      {
        keys.map((key) => {
          const { title, href, Content } = links[key];

          return (
            <button
              type="button"
              className="link"
              key={key}
              onClick={() => shell.openExternal(href)}
            >
              { Content && <Content /> }
              { title && <p className="title">{ title }</p> }
            </button>
          );
        })
      }
    </div>
  );
};

const MemoizedLinks = memo(Links);

export { Links, MemoizedLinks };
