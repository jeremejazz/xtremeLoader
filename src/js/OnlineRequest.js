//requires jquery
var OnlineRequest = {};

//parse response message returned as html file
//returns str
OnlineRequest.getResponseMessage = function(response, callback){

  var message = $(response).find("strong").text();
  var data = {};
  data.message = message;
  if(typeof callback == "function") {
    callback(data);
  }
};

//data= {}
OnlineRequest.sendRequest = function(url, data, callback){

$.ajax({
  url : url,
  data : data,
  success: function(response){
    OnlineRequest.getResponseMessage(response, callback);
  }
});

};
