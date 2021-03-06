$(document).ready(function(){
  //preload panels
  $( "body>[data-role='panel']" ).panel();


  //load items
  var height = $.mobile.getScreenHeight();

  $("#category").change(function(){
                //fetch products
    var category = $(this).val();
    $.ajax({
      url: URL.ajax,
      method: URL.method,
      crossDomain: true,
      data: {
        state     : "productlist",
        substate  : "categorized",
        category  : category
      },
      beforeSend: function(){

        $.mobile.loading( "show", {
        text: "Loading products",
        textVisible: true,
        theme: "b"
      });
      }
      ,
      success: function(response){


        var parsed = $.parseHTML(response);
          $("#list_products").html('');
            $.each(parsed[1], function(i, item){
              if(i ==0)
                return; //don't include [select product]
              $("#list_products").append('<li><a href="" data-val="' + $(item).val() + '">' + $(item).text() + '</a></li>');
            });

        $("#list_products").listview("refresh");
        $( "#product_collapse" ).collapsible( "expand" );
      },
      complete: function(){
        $.mobile.loading('hide');
      },
      error: function(xhr,status, error) {

        console.log("response:" , error)
        alert("Error " + error)
      }

    });
    //todo put on ajax callback
    $("#product_collapse").removeClass('ui-state-disabled');
  });

  $("#list_products ").on('click',"li a",function(e){
    e.preventDefault();


    $("#product").val( $(this).attr('data-val') );
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
  $("#frmLoad").validate({
    errorPlacement : function(error, element){
      error.appendTo( element.closest('.ui-field-contain').find('span.errorplacement') );
    }
  });

  $(".nextpage").click(function(e){
      e.preventDefault();
      //get parent form
      $form = $(this).closest('form');
      if($form.valid()){
        //also check for hidden fields with required filed (i.e the products list)
        var requiredHiddenFields = "";
        $form.find("input.required:hidden").each(function(i, item){

          if($(item).val() == ""){
            requiredHiddenFields += $(item).attr("data-fieldname") + "\n";
          }
          
          
        });

        if(requiredHiddenFields.length > 0){
            alert("Please indicate: \n" + requiredHiddenFields );
          return false;
        }

        var href = $(this).attr('data-href');

        $.mobile.navigate(href,{
          transition: "slide"
        }); //pass form data?
      }

  });


  $("#btnLoadSubmit").click(function(e){
    e.preventDefault();

        //TODO validation for blank entries, email format (better in realtime for formats), cellnumber formats (no spaces between)


    if($("#frmLoad2").valid()){
      //validation for hidden field


      if(confirm("Are you sure you want to Load \"" + $("#product_name a").text() + "\" (" + $("#product").val() + ") to " +  $("#load_cellnumber").val()) == false){
        return false;
      }
            //get form data
            /*
            var form_data = {};
            form_data['state'] = "webload3";
            form_data['step'] = 1;
            form_data['webtype'] = null;
            form_data['pc_detail'] = "a";
            form_data['uid'] = $("#txtID").val(); //TODO might reconsider classes w/ dynamic traversing for other pages
            form_data['pik'] = $("#txtpik").val();
            form_data['category'] = $("#category").val();
            form_data['pcode'] = $("#product").val();
            form_data['cellno'] = $("#load_cellnumber").val();
            form_data['email'] = $("#load_email").val();
            form_data['pc_detail'] = "b"; // no seriously I'm just following those hidden fields
            form_data['submit'] = "SEND LOAD";
            */
            var form_data = $("#frmLoad").serialize();
            OnlineRequest.sendRequest(URL.load, form_data, function (data){
              var dot = data.message.indexOf("."); //truncate additional text after 1st sentence

              alert(data.message.substring(0, dot));
              //at this moment I don't know all the response messages. So this should do
              //todo add reset()

            }); //callback alert
      }
  });




});
