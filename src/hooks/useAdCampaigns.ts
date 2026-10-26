import { useState, useEffect } from 'react';

const useAdCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns from API
    const fetchCampaigns = async () => {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  return campaigns;
};

export default useAdCampaigns;