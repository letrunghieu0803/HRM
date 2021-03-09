$(document).ready(async () => {
  const showlist = async function (data, a, b) {
    if (data) {
      let list = data
        .map((val, idx) => {
          if (val.active) {
            if (a) {
              if (val.userName.includes(a)) {
                return `
                    <tr class="row-list" id=${val._id}>
                      <td>${val.userName}</td>
                     <td>
                    <div class="form-check form-switch" >
                    <input class="form-check-input" type="checkbox" value=${val.userName} id=${"check"+val._id} checked>
                    </div>
                    </td>
                      <td><i class="fas fa-edit" data-value=${val._id}></i></td>
                    </tr>
                    `;
              }
            } else {
              return `
              <tr class="row-list" id=${val._id}>
                  <td>${val.userName}</td>
                 <td>
                <div class="form-check form-switch" >
                <input class="form-check-input" type="checkbox" value=${val.userName} id=${"check"+val._id} checked>
                </div>
                </td>
                  <td><i class="fas fa-edit" data-value=${val._id}></i></td>
                </tr>
                `;
            }
          } else {
            if (a) {
              if (val.userName.includes(a)) {
                return `
                <tr class="row-list" id=${val._id}>
                      <td>${val.userName}</td>
                     <td>
                    <div class="form-check form-switch" >
                    <input class="form-check-input" type="checkbox" value=${val.userName} id=${"check"+val._id} >
                    </div>
                    </td>
                      <td><i class="fas fa-edit" data-value=${val._id}></i></td>
                    </tr>
                    `;
              }
            } else {
              return `
                <tr class="row-list" id=${val._id}>
                  <td>${val.userName}</td>
                 <td>
                <div class="form-check form-switch" >
                <input class="form-check-input" type="checkbox" value=${val.userName}   >
                </div>
                </td>
                  <td><i class="fas fa-edit" data-value=${val._id}></i></td>
                </tr>
                `;
            }
          }
        })
        .join("");
      $("#list-bussiness-unit").append(list);
    }
  };

  const loadFirst = async function (nameInputChange, activeChange) {
    await $.ajax({
      url: `http://localhost:8080/api/auth/`,
      method: "GET",
      success: (res) => {
        if (res.success === 1) {
          const data = res.data;
          console.log("go hear");
          showlist(data.data, nameInputChange, activeChange);
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
  };

  await loadFirst(null, null);
  $(".fa-edit").on("click", (e) => {
    e.preventDefault();
    let $el = $(e.target);
    const value = $el.data("value");
    window.location.href = `update/${value}`;
    console.log(value);
    //   console.log(event.target.children())
  });

  $(".row-list").click(function (e) {
    let name = $(this).children()[0].innerHTML
    let check = $(e.target).prop("checked")
    let id = this.id
    // console.(this)
    console.log(name,id,check)
    
    
    // let id = this.id;
    // console.log(name);
    // let check = $(this).prop("checked");
    // console.log(check);
    $.ajax({
      url: "http://localhost:8080/api/auth/" + id,
      method: "PUT",
      data: {
        id: id,
        userName: name,
        active: check,
      },
      success: (res) => {
        console.log(res);
      },
      error: (res) => {
        alert("Loi cap nhat");
        res.send({ success: 0, message: err.message });
        console.log(res);
      },
    });
  });

  $("#dropTrue").on("click", (event) => {
    event.preventDefault();
    $("#dropdownMenuButton1").html("True");
    let active = $("#dropdownMenuButton1").html();
    let value = $("#searchbyname").val();
    $("#list-bussiness-unit").html("");

    loadFirst(value, active);
  });
  $("#dropFalse").on("click", (event) => {
    event.preventDefault();
    $("#dropdownMenuButton1").html("False");
    let value = $("#searchbyname").val();
    let active = $("#dropdownMenuButton1").html();
    $("#list-bussiness-unit").html("");

    loadFirst(value, active);
  });
  $("#clear-btn").on("click", (event) => {
    event.preventDefault();
    $("#dropdownMenuButton1").html("");
    $("#searchbyname").val("");
  });

  $("#searchbyname").on("input", (e) => {
    e.preventDefault();
    let value = $("#searchbyname").val();
    let active = $("#dropdownMenuButton1").val();
    $("#list-bussiness-unit").html("");
    console.log(value, active);
    loadFirst(value, active);
  });
  //   $('#searchbyname').on("change")
  $("#create-btn").on("click", (event) => {
    event.preventDefault();
    console.log("test create");
    window.location.href = `/create`;
  });
});
