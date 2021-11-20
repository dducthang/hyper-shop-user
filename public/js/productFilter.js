$(function () {
  sessionStorage.clear();
  sessionStorage.setItem('lastPage', $('#lastPage').val());
});
$('.category-menu').on('click', '.category-filter', function () {
  sessionStorage.removeItem('page');
  sessionStorage.setItem(
    'category',
    $(this).clone().children().remove().end().text()//remove span tag 
  );
});
$('.products-pages').on('click', '.page-link', function () {
  let page = this.text;
  sessionStorage.setItem('page', this.text);
});
