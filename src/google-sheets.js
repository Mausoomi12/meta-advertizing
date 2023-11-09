const { GoogleSpreadsheet } = require('google-spreadsheet');

const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1IZwlB2jDqdNm2_uxYPHozKoSnM9GxnGqjuZ5ZEByLrI/edit#gid=0';
const CREDENTIALS_FILE = './credentials/google-credentials.json';

const uploadToGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  try {
    await doc.useServiceAccountAuth(require('./' + CREDENTIALS_FILE));
    await doc.loadInfo(); // Loads document properties and worksheets

    // Assuming you want to add the data to the first sheet
    const sheet = doc.sheetsByIndex[0];

    const csvData = fs.readFileSync(OUTPUT_CSV_FILE, 'utf-8');

    await sheet.clear();
    await sheet.setHeaderRow(METRICS);
    await sheet.addRow(csvData);

    console.log('Data has been successfully uploaded to the Google Sheet.');
  } catch (error) {
    console.error('Error uploading data to Google Sheet:', error);
  }
};

module.exports = uploadToGoogleSheet;
