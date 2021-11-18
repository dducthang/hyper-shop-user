$('.products-pages').on('click', '.page-link', function () {
  const url = 'http://localhost:3000/api/products';
  let page = this.text;
  if (page === 'First') page = 1;
  if (page === 'Last') page = $('#lastPage').val();
  const lastPage = $('#lastPage').val();
  const productsPerPage = $('#productsPerPage').val();

  event.preventDefault();
  //event.stopPropagation();
  if (page !== '...')
    $.ajax({
      url,
      data: {
        productsPerPage,
        page,
      },
      dataType: 'json',
      success: function (data) {
        let html;
        let res = '<div class="row products">';
        data.products.forEach(product => {
          html = `<div class="col-lg-4 col-md-6">
      <div class="product">
        <div class="flip-container">
          <div class="flipper">
            <div class="front">
              <a href="/productDetail"
                ><img src="img/product1.jpg" alt="" class="img-fluid"
              /></a>
            </div>
            <div class="back">
              <a href="/productDetail"
                ><img src="img/product1_2.jpg" alt="" class="img-fluid"
              /></a>
            </div>
          </div>
        </div>
        <a href="/productDetail" class="invisible"
          ><img src="img/product1.jpg" alt="" class="img-fluid"
        /></a>
        <div class="text">
          <h3><a href="/productDetail">${product.name}</a></h3>
          <p class="price"><del></del>$${product.price}</p>
          <p class="buttons">
            <a href="/productDetail" class="btn btn-outline-secondary"
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
});
