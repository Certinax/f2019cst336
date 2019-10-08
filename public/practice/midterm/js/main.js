const product = $("#product");
const unitprice = $("#unitprice");
const quantity = $("#quantity");
const productTotal = $("#productTotal");

const promoButton = $("#promoButton");
const promoCode = $("#promoCode");

// jQuery on ready
$(function() {
  $.ajax({
    type: "get",
    url: "https://cst336.herokuapp.com/projects/api/promo_products.php",
    dataType: "json",
    success: function(data, status) {
      const randItem = Math.floor(Math.random() * data.length);
      const { productName, price, qty } = data[randItem];

      product.html(productName);
      unitprice.html(price);
      quantity.val(qty);

      const pTotal = price * qty;
      productTotal.html(`${pTotal}`);
    }
  });
});

// Changes product total price upon quantity change
quantity.on("change", () => {
  productTotal.html(quantity.val() * unitprice.html());
});

promoButton.on("click", () => {
  console.log("PROMO CHECKING");

  console.log(promoCode.val());

  let discount = promoMe();
});
