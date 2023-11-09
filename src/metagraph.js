const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

const METAGRAPH_API_KEY = 'EAAKOjYZBHVlwBO3mEZAkSoyDsacSn5pTNzKAb4DjSZAWOiEFigwkWPtCyqMw0VYxKLZBFig5L9ZBeLZCwTn7AmhHuJGjxyQAB1I38ZBGGuJtHT614QkA8TukoNZAZBeL0EFFJnuHuIizm7FWdENbi1Wep1IKhZAMFa75jVXnRZCgL08f0WbrS2nAGzvFmdMhP8ZD';
const OUTPUT_CSV_FILE = 'meta_data.csv';

const METAGRAPH_API_URL = 'https://graph.facebook.com/'; // Adjust the API endpoint as needed

const METRICS = ['Impressions', 'CPM', 'CTR', 'Clicks', 'AmountSpend', 'Purchase', 'CostPerPurchase'];

const fetchData = async () => {
  try {
    // Make sure your internet connection is stable and DNS resolution works
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const params = {
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      metrics: METRICS.join(','),
      api_key: METAGRAPH_API_KEY,
    };

    // Make the API request
    const response = await axios.get(METAGRAPH_API_URL, { params });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      const data = response.data.data.map((entry) => ({
        Impressions: entry.Impressions,
        CPM: entry.CPM,
        CTR: entry.CTR,
        Clicks: entry.Clicks,
        AmountSpend: entry.AmountSpend,
        Purchase: entry.Purchase,
        CostPerPurchase: entry.CostPerPurchase,
      }));

      const csvWriter = createObjectCsvWriter({
        path: OUTPUT_CSV_FILE,
        header: METRICS,
      });

      await csvWriter.writeRecords(data);

      console.log('Data has been successfully stored in a CSV file.');
    } else {
      console.log('Received a non-OK response status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

// Export the fetchData function

module.exports = fetchData;
