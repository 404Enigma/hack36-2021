$(document).ready(function () {
  $("input[type=checkbox]").change(function () {
    if (this.checked) {
      $(this).next(".label-text").css("text-decoration-line", "line-through");
      console.log("checked");
    } else {
      $(this).next(".label-text").css("text-decoration-line", "none");
      console.log("not checked");
    }
  });
});
