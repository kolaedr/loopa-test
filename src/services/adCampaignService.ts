import axios from 'axios';

const adCampaignService = {
  getCampaigns: async () => {
    const response = await axios.get('/api/campaigns');
    return response.data;
  },
  updateCampaign: async (id: number, campaign: any) => {
    const response = await axios.put(`/api/campaigns/${id}`, campaign);
    return response.data;
  }
};

export default adCampaignService;