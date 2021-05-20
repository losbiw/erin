import React from 'react';

export default (props: { raw: string }) => {
  const { raw } = props;
  return <span dangerouslySetInnerHTML={{ __html: raw }} />;
};
