const product = $("#product");
const unitprice = $("#unitprice");
const quantity = $("#quantity");
const productTotal = $("#productTotal");
const discountSum = $("#discountSum");
const shipping = $("#shipping");
const subtotal = $("#subTotal");
const tax = $("#tax");
const total = $("#total");
const shippingMethod = $("#shippingMethod");

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
      unitprice.html(`$${price}`);
      quantity.val(qty);

      const pTotal = price * qty;
      productTotal.html(`${pTotal}`);
      updateValues();
    }
  });
});

// Changes product total price upon quantity change
quantity.on("change", () => {
  productTotal.html(quantity.val() * convertToNumber(unitprice));
  updateValues();
});

shippingMethod.on("change", function() {
  updateValues();
});

promoButton.on("click", function() {
  promoMe();
});

function promoMe() {
  $.ajax({
    url: "https://cst336.herokuapp.com/projects/api/promo_codes.php",
    type: "GET",
    dataType: "json",
    data: {
      promoCode: promoCode.val().toLowerCase()
    },
    success: function(res, status) {
      if (!res) {
        promoError();
      } else {
        promoSuccess(res.discount);
        updateDiscount(res.discount);
        updateValues();
      }
    }
  });
}

function promoError() {
  $("#discountMsg").attr("class", "text-danger");
  $("#discountMsg").html("Invalid promocode");
}

function promoSuccess(discount) {
  $("#discountMsg").attr("class", "text-primary");
  $("#discountMsg").html(`Your discount: ${discount}%`);
}

function updateDiscount(discount) {
  const discount_dec = discount / 100;
  discountSum.html(`$-${productTotal.html() * discount_dec}`);
}

function convertToNumber(element) {
  if (element.html()) {
    // return parseInt(element.html().replace(/\D/g, ""));
    return Number(element.html().replace(/[^0-9,.]+/, ""));
  }
  return 0;
}

function updateTotal() {
  const subtotalVal = convertToNumber(subtotal);
  const taxVal = convertToNumber(tax);

  const newTotal = subtotalVal + taxVal;
  total.html(`$${newTotal}`);
}

function updateShipping() {
  if (shippingMethod.val() != 0) {
    shipping.html(`$${shippingMethod.val()}`);
  }
}

function updateSubtotal() {
  const subtotalVal =
    convertToNumber(productTotal) -
    convertToNumber(discountSum) +
    convertToNumber(shipping);

  subtotal.html(`$${subtotalVal}`);
}

function updateTax() {
  const taxVal = convertToNumber(subtotal) * 0.1;
  tax.html(`$${taxVal.toFixed(2)}`);
}

function updateValues() {
  updateShipping();
  updateSubtotal();
  updateTax();
  updateTotal();
}
