import React from 'react';
import RoleTrackPage from '../components/tracks/RoleTrackPage';
import { implementationTrackContent } from '../data/trackContent';

const ImplementationTrackView: React.FC = () => {
  return <RoleTrackPage content={implementationTrackContent} />;
};

export default ImplementationTrackView;
