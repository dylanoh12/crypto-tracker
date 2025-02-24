import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10, // Top 10 coins
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

export const getHistoricalData = async (coinId, days) => {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: days,
    },
  });
  return response.data.prices;
};