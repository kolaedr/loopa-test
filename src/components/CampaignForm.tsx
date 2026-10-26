import React, { useState } from 'react';
import { Campaign } from '../types/Campaign';
import adCampaignService from '../services/adCampaignService';

const CampaignForm: React.FC<{ campaign?: Campaign; onSubmit: (campaign: Campaign) => void }> = ({ campaign, onSubmit }) => {
  const [name, setName] = useState(campaign?.name || '');
  const [startDate, setStartDate] = useState(campaign?.startDate || '');
  const [endDate, setEndDate] = useState(campaign?.endDate || '');
  const [type, setType] = useState(campaign?.type || '');
  const [ctr, setCTR] = useState(campaign?.ctr || 0);
  const [cpa, setCPA] = useState(campaign?.cpa || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: campaign?.id || 0,
      name,
      startDate,
      endDate,
      type,
      ctr,
      cpa
    };
    await adCampaignService.updateCampaign(newCampaign.id, newCampaign);
    onSubmit(newCampaign);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Name' required />
      <input type='date' value={startDate} onChange={e => setStartDate(e.target.value)} placeholder='Start Date' required />
      <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)} placeholder='End Date' required />
      <input type='text' value={type} onChange={e => setType(e.target.value)} placeholder='Type' required />
      <input type='number' value={ctr} onChange={e => setCTR(Number(e.target.value))} placeholder='CTR' required />
      <input type='number' value={cpa} onChange={e => setCPA(Number(e.target.value))} placeholder='CPA' required />
      <button type='submit'>Save</button>
    </form>
  );
};

export default CampaignForm;