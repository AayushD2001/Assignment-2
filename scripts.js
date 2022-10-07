
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          method: 'GET',
          url: '/tweets',
          success: function(response){
            var namebody = $('#namebody');
            namebody.html('');
            // Will need to repeat this step for all tweets in the array.
            response.tweetinfo.forEach(function(tweet){
              namebody.append('\
                <tr>\
                  <td>' + tweet.user.id + '</td>\
                  <td>' + tweet.user.screen_name + '</td>\
                  <td>' + tweet.user.name + '</td>\
                </tr>\
              ');
              
            });
          }
        })
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          method: 'GET',
          url: '/tweetinfo',
          success: function(response){
            var tweetbody = $('#tweetbody');
            tweetbody.html('');
              // Will need to repeat this step every tweet in the array.
            response.tweetinfo.forEach(function(tweet){
              tweetbody.append('\
                <tr>\
                  <td>' + tweet.id + '</td>\
                  <td>' + tweet.text + '</td>\
                  <td>' + tweet.created_at + '</td>\
                </tr>\
              ');
              
            });
          }
        })
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo',
          success: function(response){
            var searchbody = $('#searchbody');
            searchbody.html('');
            // Will need to repeat this step for every entry in the searchVar array.
            response.searchVar.forEach(function(tweet){
              searchbody.append('\
                <tr>\
                  <td>' + tweet.id + '</td>\
                  <td>' + tweet.text + '</td>\
                  <td>' + tweet.created_at + '</td>\
                </tr>\
              ');
              
            });
          }
        });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        var inputString = createInput.val();

        const parsedStrings = inputString.split(';');

        var id = parsedStrings[0];
        var text = parsedStrings[1];

        //TODO: create a tweet
        $.ajax({
          // make sure you have the correct parameters.
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: id,text: text}),
          success: function(response){
            console.log(response);
            createInput.val('');
          }

        })
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input').val();
    
    //TODO: search a tweet and display it.
    $('#search-form').on('submit', function (event) {
      event.preventDefault();
      var tweetid = $('#search-input');
  
      //search a tweet and display it.
      $.ajax({
        // Make sure you have the correct parameters.
        method: 'POST',
        url: '/searchinfo',
        contentType: 'application/json',
        data: JSON.stringify({ id: tweetid.val() }),
        success: function (response) {
          var tbodyEl = $('#searchbody');
          tbodyEl.html('');
  
  
          tbodyEl.append('\
              <tr>\
              <td class="id">' + response.id + '</td>\
              <td class="id">' + response.text + '<td>\
              <td class="user id">' + response.created_at + '</td>\
          </tr>\
                ');
        }
      });
    });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
    $.ajax({
      // Make sure you have the correct parameters.
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({name: newName}),
      success: function(response){
        console.log(response);
        updateInput.val('');
        $('#get-button').click();
      }
    });
    


  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input').val();
    event.preventDefault();

    //TODO: delete a tweet
    $.ajax({
      // Make sure the parameters are correct.
      url: '/tweetinfo/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response){
        console.log(response);
      }
    });

  });


});


                    
   