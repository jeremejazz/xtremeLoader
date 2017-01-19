//requires jquery
var OnlineRequest = {};

//parse response message returned as html file
//returns str
OnlineRequest.getResponseMessage = function(response){

  Console.log(response);
};

//data= {}
OnlineRequest.sendRequest = function(url, data){

$.ajax({
  url : url,
  data : data,
  success: function(response){
    OnlineRequest.getResponseMessage(response);
  }
});

};
