function main() {
  uploadConversions(csvUrl = 'http://remote.host.com/subdirectory/import_file.csv',
                    accountId = '123-456-7890');
}

function uploadConversions(csvUrl, accountId) {
  // set desired account ID for uploading conversions
  var targetAccountId = accountId; 
  
  // set the URL to download pre-formatted CSV from
  var csvUrl = csvUrl; 

  var mccAccount = AdWordsApp.currentAccount();
  Logger.log("MCC account set to %s, ('%s')", mccAccount.getCustomerId(), mccAccount.getName());  

  var childAccounts = MccApp.accounts().withIds([targetAccountId]).get();
  var childAccount = childAccounts.next();
  
  MccApp
  .select(childAccount);
  Logger.log("Selected account %s ('%s')", childAccount.getCustomerId(), childAccount.getName());
  
  var blob = UrlFetchApp.fetch(csvUrl)
  .getBlob()
  .getAs(MimeType.CSV);
  Logger.log("Downloaded CSV from %s", csvUrl);

  var upload = AdWordsApp
  .bulkUploads()
  .newFileUpload(blob, moneyInMicros = false, timeZone = "-0500");
  
  upload.forOfflineConversions();
  upload.apply();
}
