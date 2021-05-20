import React, { FC, memo } from 'react';
import './Links.scss';

const { shell } = window.require('electron');

interface LinkInterface {
  title?: string,
  href: string,
  Content?: React.FC<React.SVGProps<SVGSVGElement>> | (() => JSX.Element)
}

interface Props {
  links: {
    [key: string]: LinkInterface
  }
}

const Link: FC<LinkInterface> = ({ Content, title, href }: LinkInterface) => (
  <button
    type="button"
    className="link"
    onClick={() => shell.openExternal(href)}
  >
    { Content && <Content /> }
    { title && <p className="title">{ title }</p> }
  </button>
);

Link.defaultProps = {
  title: '',
  Content: undefined,
};

const Links: FC<Props> = ({ links }: Props) => (
  <div className="links">
    {
      Object.keys(links).map((key) => {
        const { title, href, Content } = links[key];

        return (
          <Link
            title={title}
            Content={Content}
            href={href}
            key={title}
          />
        );
      })
    }
  </div>
);

const MemoizedLinks = memo(Links);

export {
  Links, MemoizedLinks, Link, LinkInterface,
};
