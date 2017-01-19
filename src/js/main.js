$(document).ready(function(){
  //preload panels
  $( "body>[data-role='panel']" ).panel();

  //load items
  $("#category").change(function(){
                //fetch products

    $.ajax({
      url: '/ajax/ota.txt',
      method: 'GET',
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

});
