const ServiceNowApi = require('servicenow-rest');
const v1 = 'v1';
var serviceNowActions = function (sninstance, snusername, snpassword) {
  var instance = sninstance;
  var username = snusername;
  var password = snpassword;
  this.getLastNChanges = function(n, userChange) {
    return ["CHG000123", "CHG000124"];
  }
  this.getCtasksForChange = function(changeNumber) {
    return ["CTASKXXXXXXX", "CTASKXXXXXXY"];
  }
  this.getApiClientForTable = function(table) {
    return new ServiceNowApi.gliderecord(this.instance, table, this.username, this.password, v1);
  }
  this.build
  return this;
}

module.exports = serviceNowActions;
