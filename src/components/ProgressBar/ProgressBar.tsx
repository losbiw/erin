import { RootState } from '@app/store';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.scss';

interface Props {
  width: number
}

const ProgressBar: FC<Props> = ({ width }: Props) => (
  <div className="progress-bar">
    <div className="fill" style={{ width: `${width}%` }} />
  </div>
);

const mapStateToProps = (state: RootState) => ({ width: state.progress });

export default connect(mapStateToProps)(ProgressBar);
