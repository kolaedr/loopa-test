export const getCampaigns = async () => {
  const response = await fetch('/api/campaigns');
  return response.json();
};

export const updateCampaign = async (id: number, campaign: any) => {
  const response = await fetch(`/api/campaigns/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(campaign)
  });
  return response.json();
};