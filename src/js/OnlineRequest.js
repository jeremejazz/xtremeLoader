//requires jquery, jquery-mobile
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
  method: URL.method,
  beforeSend: function(){

      $.mobile.loading( "show", {
      text: "Loading",
      textVisible: true,
      theme: "b"
    });
  },
  success: function(response){
    OnlineRequest.getResponseMessage(response, callback);
  },
  complete: function(){
    $.mobile.loading('hide');
  },
  error: function(xhr,status, error) {

    console.log("response:" , error)
    alert("Error " + error)
  }
});

};
