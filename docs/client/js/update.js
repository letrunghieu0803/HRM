const idUser = window.location.pathname.split("/").pop();

$(document).ready(async () => {
  await $.ajax({
    url: `http://localhost:8080/api/auth/${idUser}`,
    method: "GET",
    success: (res) => {
      if (res.success === 1) {
        const data = res.data;
        console.log(data.active);
        if (!$("#name-input").val()) {
          $("#name-input").attr("placeholder", `${data.userName}`);
        }

        if (data.active === false){
            console.log("vao check")
            $('#flexSwitchCheckChecked').attr("checked", false) 
        }

      }
    },
    error: (res) => {
      console.log(res);
    },
  });
  $("#save-btn").on("click", (e) => {
    e.preventDefault();
    console.log($("#flexSwitchCheckChecked").is(":checked"));
    console.log(idUser)
    console.log($("#name-input").attr('placeholder'))
    $.ajax({
      url: 'http://localhost:8080/api/auth/'+idUser,
      method: "PUT",
      data: {
        id: idUser,
        userName: $("#name-input").val() ? $("#name-input").val() : $("#name-input").attr('placeholder') ,
        active: $("#flexSwitchCheckChecked").is(":checked"),
      },
      success: (res) => {
        console.log(res)
        alert("Cập nhật thành công!")
      },
      error: (res) => {
        alert("Không có gì thay đổi!")
        res.send({ success: 0, message: err.message });
        console.log(res);
      },
    });
  });
  $("#backhome").on("click", (e)=>{
      e.preventDefault()
      window.location.href = '/'
  })
});
