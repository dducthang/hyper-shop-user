$('.products-pages').on('click', '.page-link', reloadProduct);
$('.category-menu').on('click', '.category-filter', reloadProduct);

function reloadProduct() {
  const url = 'http://localhost:3000/api/products';
  let page = sessionStorage.getItem('page') || 1;
  if (page === 'First') page = 1;
  if (page === 'Last') page = sessionStorage.getItem('lastPage');

  // const lastPage = $('#lastPage').val(); //dùng hidden field tạm, chắc sau này xài session
  let lastPage;
  const productsPerPage = $('#productsPerPage').val();
  const filters = {
    productsPerPage,
    page,
    category: sessionStorage.getItem('category'),
    // brand: req.query.brand,
    // color: req.query.color,
    // sex: req.query.sex,
    // shoesHeight: req.query.shoesHeight,
    // closureType: req.query.closureType,
    // material: req.query.material,
  };
  Object.keys(filters).forEach(
    key => filters[key] === (undefined || null) && delete filters[key]
  );
  event.preventDefault();
  //event.stopPropagation();
  if (page !== '...')
    $.ajax({
      url,
      data: filters,
      dataType: 'json',
      success: function (data) {
        lastPage = data.lastPage;
        console.log(lastPage);
        if (page === 'Last') page = lastPage;
        // currentPage: page,
        sessionStorage.setItem('lastPage', lastPage);
        sessionStorage.setItem('productsPerPage', data.productsPerPage);
        sessionStorage.setItem('productsCount', data.productsCount);
        let html;
        let res = '<div class="row products">';
        data.products.forEach(product => {
          html = `<div class="col-lg-4 col-md-6">
      <div class="product">
        <div class="flip-container">
          <div class="flipper">
            <div class="front">
              <a href="/productDetail"
                ><img src="${product.image}" alt="" class="img-fluid"
              /></a>
            </div>
            <div class="back">
              <a href="/productDetail"
                ><img src="${product.image}" alt="" class="img-fluid"
              /></a>
            </div>
          </div>
        </div>
        <a href="/productDetail" class="invisible"
          ><img src="${product.image}" alt="" class="img-fluid"
        /></a>
        <div class="text">
          <h3><a href="/productDetail">${product.name}</a></h3>
          <p class="price"><del></del>$${product.price}</p>
          <p class="buttons">
            <a href="/products/${product._id}" class="btn btn-outline-secondary"
              >View detail</a
            ><a href="/cart" class="btn btn-primary"
              ><i class="fa fa-shopping-cart"></i>Add to cart</a
            >
          </p>
        </div>
      </div>
    </div>
    `;
          res += html;
        });
        res += `</div>`;
        let pagesHtml = `<div class="pages">
    <nav
      aria-label="Page navigation example"
      class="d-flex justify-content-center"
    >`;
        if (lastPage > 0) {
          pagesHtml += `<ul class="pagination"><li class="page-item"><a class="page-link">First</a></li>`;
          let i = Number(page) > 5 ? Number(page) - 4 : 1;
          if (i !== 1) {
            pagesHtml += `<li class="page-item"><a class="page-link">...</a></li>`;
          }
          for (; i <= Number(page) + 4 && i <= lastPage; i++) {
            if (i == page) {
              pagesHtml += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
            } else {
              pagesHtml += `<li class="page-item"><a class="page-link">${i}</a></li>`;
            }
            if (i == Number(page) + 4 && i < lastPage) {
              pagesHtml += `<li class="page-item"><a class="page-link">...</a></li>`;
            }
          }
          pagesHtml += `<li class="page-item">
      <a class="page-link">Last</a>
    </li>`;
          pagesHtml += `</ul>`;
        }

        pagesHtml += `</nav></div>`;

        res += pagesHtml;

        $('.products-pages').html(res);
      },
      error: function (error) {
        console.log(error);
      },
    });
}
