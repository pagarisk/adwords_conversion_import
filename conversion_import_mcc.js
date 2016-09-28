 function main() {
  // set desired account ID for uploading conversions 
  // and the URL to download pre-formatted CSV from
  uploadConversions(accountId = '123-456-7890',
                    csvUrl = 'http://remote.host.com/subdirectory/import_file.csv');
}

function uploadConversions(accountId, csvUrl) {
  Logger.log("Target account set to %s", 
             accountId);
  Logger.log("CSV source set to %s", 
             csvUrl);

  // subsetting the accounts list to find target by ID
  var childAccount = MccApp.accounts()
  .withIds([accountId])
  .get()
  .next();
  
  // selecting the child account to apply the changes to
  MccApp
  .select(childAccount);
  Logger.log("Selected account %s ('%s')", 
             childAccount.getCustomerId(), 
             childAccount.getName());
  
  // fetching the CSV from the URL specified
  var blob = UrlFetchApp.fetch(csvUrl)
  .getBlob()
  .getAs(MimeType.CSV);
  Logger.log("Downloaded CSV from %s", 
             csvUrl);

  // creating the upload object
  // specify the correct timezone here, as 
  // conversion timestamp cannot precede the click timestamp
  var upload = AdWordsApp
  .bulkUploads()
  .newFileUpload(blob, 
                 moneyInMicros = false, 
                 timeZone = "-0500"); 
  Logger.log("Successfully created upload object.");
  
  // set the upload type and apply
  upload.forOfflineConversions();
  upload.apply();
  Logger.log("Offline conversions has been successfully applied to account %s (%s)", 
             childAccount.getCustomerId(), 
             childAccount.getName());
}
