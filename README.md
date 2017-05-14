# adwords_conversion_import
A simple script to import offline conversions from a remote URL.

## Usage

In order to use the script, just create a new script entity under your MCC account and paste the code from this repo. **This script is intended to be run under MCC account only**, and might not work under a regular account.

## Input
The script requires 2 parameters to be run properly: account ID and URL for the CSV. 
```javascript
  function main() {
  // set desired account ID for uploading conversions 
  // and the URL to download pre-formatted CSV from
  uploadConversions(accountId = '123-456-7890',
                    csvUrl = 'http://remote.host.com/subdirectory/import_file.csv');
}
```

### Account ID

The `accountId` variable represents the **child account ID** that the conversions should be imported into. Since the script is designed to be run under MCC account, this is where you specify your child account ID.

### CSV URL

The `csvUrl` variable should contain the URL where the latest CSV with conversions is located. Please note that the URL should return **the actual CSV file** and nothing else, so various file sharing services won't work.
