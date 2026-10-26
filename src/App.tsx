import React from 'react';
import AdCampaigns from './components/AdCampaigns';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import useAdCampaigns from './hooks/useAdCampaigns';

const App: React.FC = () => {
  const campaigns = useAdCampaigns();

  return (
    <div>
      <h1>Ad Campaigns Management</h1>
      <CampaignForm onSubmit={newCampaign => console.log(newCampaign)} />
      <CampaignList campaigns={campaigns} />
    </div>
  );
};

export default App;