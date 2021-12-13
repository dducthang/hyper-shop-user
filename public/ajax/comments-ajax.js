// $('.comment-button').on('click', function (e) {
//   e.preventDefault();
//   const comment = $('.comment-input').val();
//   console.log(comment);
//   if (comment !== '') {
//     const url = $('.comment-form').attr('action');
//     console.log(url);
//     $.ajax({
//       type: 'POST',
//       url,
//       data: { comment },
//       dataType: 'json',
//       success: function (data) {},
//       error: function (error) {
//         console.log(error);
//       },
//     });
//   }
// });

$('.comment-form').on('submit', function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  const form = $(this);

  const url = form.attr('action');
  const data = form.serialize();
  if (data !== 'comment=') {
    //input is not leave blank
    $.ajax({
      type: 'POST',
      url: url,
      data,
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        if (error.status === 401) {
          alert('Please Login');
        } else {
          alert('Something bad happend');
        }
      },
    });
    $('.comment-input').val('');
  }
});
