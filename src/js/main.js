$(document).ready(function(){
  //preload panels
  $( "body>[data-role='panel']" ).panel();

  //load items
  $("#category").change(function(){
                //fetch products
    var category = $(this).val();
    $.ajax({
      url: URL.ajax,
      method: 'POST',
      data: {
        state     : "productlist",
        substate  : "categorized",
        category  : category
      },
      success: function(response){
        var parsed = $.parseHTML(response);
          $("#list_products").html('');
        $.each(parsed[1], function(i, item){
          if(i ==0)
            return; //don't include [select product]
          $("#list_products").append('<li><a href="" data-val="' + $(item).val() + '">' + $(item).text() + '</a></li>');
        });

        $("#list_products").listview("refresh");
      }

    });
    //todo put on ajax callback
    $("#product_collapse").removeClass('ui-state-disabled');
  });

  $("#list_products ").on('click',"li a",function(e){
    e.preventDefault();


    $("#product").val(""); //todo
    $("#product_name a").text($(this).text());
    $( "#product_collapse" ).collapsible( "collapse" );


  });

/*
* to make toggle panel available to all pages since
* this theme doesn't seem to support external panels. We'll just duplicate all panels to the rest of
* the pages
*/
  $(".toggle_panel").click(function(e){
    e.preventDefault();
    $(this)
      .closest('.page')
      .find('.navigation_panel')
      .panel("toggle");
  });


  //load page events
  $("#btnLoadSubmit").click(function(){
    //get form data
    var form_data = {};
    OnlineRequest.sendRequest(URL.load, form_data, function (data){
      alert(data.message);
    }); //callback alert
  });




});
