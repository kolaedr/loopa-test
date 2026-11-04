import React from 'react';
import Campaign from '../types/Campaign';

const CampaignList: React.FC<{ campaigns: Campaign[] }> = ({ campaigns }) => {
  return (
    <ul>
      {campaigns.map(campaign => (
        <li key={campaign.id}>{campaign.name}</li>
      ))}
    </ul>
  );
};

export default CampaignList;