$("#save-btn").on("click", (event) => {
  event.preventDefault();
  let name = $("#name-input").val();
//   let active = $("#flexSwitchCheckChecked").is(":checked");
  if (name) {
    $.ajax({
      url: "http://localhost:8080/api/auth",
      type: "POST",
      data: {
        userName: name,
      },
      success: (res) => {
        if (res.succsess === 1) {
          alert("Create new bussiness unit success!");
          window.location.href = "http://localhost:8080/";
          res.send({ success: 1, data: user });
        } else {
                alert('Bussiness Unit Name already exist! Please input again!')
        }
      },
      error: (res) => {
        res.send({ success: 0, message: err.message })
        console.log(res);
      },
    });
  } else {
    alert("Please input name before save!");
  }
});

$("#backhome").on("click", (e)=>{
    e.preventDefault()
    window.location.href = '/'
})
