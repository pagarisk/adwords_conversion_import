function main() {
  // set desired account ID for uploading conversions 
  // and the URL to download pre-formatted CSV from
  uploadConversions(accountId = '123-456-7890',
                    csvUrl = 'http://remote.host.com/subdirectory/import_file.csv');
}

function uploadConversions(accountId, csvUrl) {
  var targetAccountId = accountId;
  Logger.log("Target account set to %s", targetAccountId);
  var csvUrl = csvUrl; 
  Logger.log("CSV source set to %s", csvUrl);

  var childAccount = MccApp.accounts()
  .withIds([targetAccountId])
  .get()
  .next();
  
  MccApp
  .select(childAccount);
  Logger.log("Selected account %s ('%s')", 
             childAccount.getCustomerId(), 
             childAccount.getName());
  
  var blob = UrlFetchApp.fetch(csvUrl)
  .getBlob()
  .getAs(MimeType.CSV);
  Logger.log("Downloaded CSV from %s", csvUrl);

  var upload = AdWordsApp
  .bulkUploads()
  .newFileUpload(blob, 
                 moneyInMicros = false, 
                 timeZone = "-0500");
  Logger.log("Successfully created upload object.");
  
  upload.forOfflineConversions();
  upload.apply();
  Logger.log("Offline conversions has been successfully applied to account %s (%s)", 
             childAccount.getCustomerId(), 
             childAccount.getName());
}
