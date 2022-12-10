$(function () {
  // https://medium.com/geekculture/link-your-html-form-to-a-spreadsheet-via-google-forms-9024f0611d82
  //  https://formsubmit.co/
  // Get the form.
  var form = $("#contact-form");
  var type = "mail";
  // Get the messages div.
  var formMessages = $(".form-messege");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();
    $.ajax({
      url: "https://zincline.in/assets/php/sendmail.php",
      method: "POST",
      data: {
        name: $("#Name").val(),
        email: $("#Email").val(),
        phone: $("#Phone").val(),
        state: $("#State").val(),
        city: $("#City").val(),
        country: $("#Country").val(),
        zip: $("#Zip").val(),
        message: $("#Message").val(),
      },
      dataType: "json",
      success: function (response) {
		    window.location.assign("https://www.zincline.in/thankyou.html")
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");
        $("#contact-form button").prop("disabled", true);

        // Set the message text.
        $(formMessages).text(
          "Your details have been communicated successfuly, please wait we will get back to you !"
        );

        // Clear the form.
        $("#contact-form input,#contact-form textarea").val("");
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status === 0) {
          window.location.assign("https://www.zincline.in/thankyou.html")
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");
          $("#contact-form button").prop("disabled", true);

          // Set the message text.
          $(formMessages).text(
            "Your details have been communicated successfuly, please wait we will get back to you !"
          );

          // Clear the form.
          $("#contact-form input,#contact-form textarea").val("");
        } else {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          // Set the message text.
          $(formMessages).text(`${xhr.status} : ${thrownError}`);
        }
      },
    });
  });
});
