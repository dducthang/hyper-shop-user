$(function () {
  sessionStorage.clear();
  sessionStorage.setItem('lastPage', $('#lastPage').val());
  sessionStorage.setItem('productsCount', $('#productsCount').val());
  url_string = window.location.href;
  const url = new URL(url_string);
  const category = url.searchParams.get('category');
  if (category !== null) sessionStorage.setItem('category', category);
});
$('.category-menu').on('click', '.category-filter', function () {
  sessionStorage.removeItem('page');
  sessionStorage.setItem(
    'category',
    $(this).clone().children().remove().end().text() //remove span tag
  );
});
$('.products-pages').on('click', '.page-link', function () {
  const page = this.text;
  sessionStorage.setItem('page', this.text);
});
$('.products-number').on('click', '.show-products-quantity', function () {
  sessionStorage.setItem('productsPerPage', this.text);
  sessionStorage.removeItem('page');
});
