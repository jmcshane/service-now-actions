const ORDER_BY = "ORDERBY"
const ORDER_BY_DESC = "ORDERBYDESC";
const SEPARATOR = "^";
const DIRECTION = "direction";
const ORDER_COLUMN = "orderColumn";

var QueryBuilder = function() {
  this.query = {};
  this.orderFields = [];
}

QueryBuilder.prototype = {
  addOrderBy : function(orderColumn, descending) {
    var orderObj = {};
    if (descending) {
      orderObj[DIRECTION] = ORDER_BY_DESC;
    } else {
      orderObj[DIRECTION] = ORDER_BY;
    }
    orderObj[ORDER_COLUMN] = orderColumn;
    this.orderFields.push(orderObj);
  },
  addQueryParam : function(key, value) {
    if (key.startsWith(ORDER_BY)) {
      return new Error("Should not add query parameters for order by fields");
    }
    this.query[key] = value;
  },
  encodeQuery : function() {
    var encodedString = "";
    for (var property in this.query) {
      if (this.query.hasOwnProperty(property)) {
        if (encodedString.length > 0) {
          encodedString += SEPARATOR;
        }
        encodedString += `${property}=${this.query[property]}`;
      }
    }
    for (var i = 0; i < this.orderFields.length; i++) {
      if (encodedString.length > 0) {
        encodedString += SEPARATOR;
      }
      encodedString += `${this.orderFields[i][DIRECTION]}${this.orderFields[i][ORDER_COLUMN]}`
    }
    return encodedString;
  }

}
module.exports = QueryBuilder;
