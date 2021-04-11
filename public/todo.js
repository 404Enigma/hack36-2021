$(document).ready(function () {
  $("input[type=checkbox]").change(function () {
    if (this.checked) {
      $(this).next(".label-text").css("text-decoration-line", "line-through");
      console.log("checked");
      const val = $("input[name=option]:checked", "1").val();
      console.log(val);
    } else {
      $(this).next(".label-text").css("text-decoration-line", "none");
      console.log("not checked");
      const val = $("input[name=option]:checked", "1").val();
      console.log(val);
    }
  });
});
