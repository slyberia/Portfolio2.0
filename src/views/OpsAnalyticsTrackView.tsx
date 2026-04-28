import React from 'react';
import RoleTrackPage from '../components/tracks/RoleTrackPage';
import { opsAnalyticsTrackContent } from '../data/trackContent';

const OpsAnalyticsTrackView: React.FC = () => {
  return <RoleTrackPage content={opsAnalyticsTrackContent} />;
};

export default OpsAnalyticsTrackView;
