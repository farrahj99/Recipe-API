$(document).ready(function(){

  var proxy = "https://cors-anywhere.herokuapp.com/";
  var apiURL = "http://api.yummly.com/v1/api/recipes?_app_id=3ac97d24&_app_key=ebc3af17d281169a009fa3b3cf157026&"
  var search = $("input").val();

  $("button").on("click", function(){
    search = $("input").val();

    $.ajax({
      url: proxy + apiURL + "q=" + search,

      success: function( response ) {
        $(".recipe").children("li").remove();
        $(".ingredient").children("li").remove();
        console.log(response); // server response
        $.each(response.matches, function(index, value){
           $(".recipe").append("<li>" + response.matches[index].sourceDisplayName + "</li>");

        });
      },
      error: function(r){
        console.log(r); //server response
      }
    });
  });

  $(".recipe").on("click", "li", function(){
    var i = $(".recipe li").index($(this));

    $.ajax({
      url: proxy + apiURL + "q=" + search,

      success: function( response ) {
        $(".ingredient").children("li").remove();
        console.log(response); // server response
         $('.imageFrame').css('background-image', 'url(' + response.matches[i].imageUrlsBySize[90] + ')');
        $.each(response.matches[i].ingredients, function(index, value){
           $(".ingredient").append("<li>" + response.matches[i].ingredients[index] + "</li>");

        });
      },
      error: function(r){
        console.log(r); //server response
      }
    });
  });

  // $("ul").on("click", "li", function(){
  //   var actor = $(this).html();
  //
  //   $.ajax({
  //     url: proxy + apiURL + "actor=" + actor,
  //
  //     success: function( response ) {
  //
  //           $(".movies").children("li").remove();
  //       console.log(response); // server response
  //       $.each(response, function(index, value){
  //         $(".movies").append("<li>" + value.show_title + "</li>");
  //       });
  //     },
  //     error: function(r){
  //       console.log(r); //server response
  //     }
  //   });
  // });
});
