import React from 'react';
import RoleTrackPage from '../components/tracks/RoleTrackPage';
import { gisTrackContent } from '../data/trackContent';

const GisTrackView: React.FC = () => {
  return <RoleTrackPage content={gisTrackContent} />;
};

export default GisTrackView;
