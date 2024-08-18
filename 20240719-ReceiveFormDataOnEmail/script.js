const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail(){
    // 用動態生成表單的字串
    const bodyMessage = `Full Name: ${fullName.value}<br> Email:${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}<br>`;


    Email.send({
        SecureToken :"3f749353-ded2-433c-b92f-64e82ba3169b",
        Host : "smtp.elasticemail.com",
        Username : "az586329@gmail.com",
        Password : "AF1CA66E62517A8CFBEE06C1E73441B24DA3",
        To : 'az586329@gmail.com',
        From : "az586329@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if(message == "OK"){    
            Swal.fire({
                title: "成功！",
                text: "我們已收到您的來信🥰",
                icon: "success"
              });
        }
      }
    );
}

// 檢查html表單中所有的"item"類別，並且標記那些沒有填寫的輸入元素
function checkInputs(){
    const items = document.querySelectorAll(".item");

    for(const item of items){
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        // 查看任務第二欄是否為空值
        if(items[1].value !=""){
            checkEmail();
        }

        items[1].addEventListener("keyup",() =>{
            checkEmail();
        });

        // 事件驗證
        // 當輸入框沒有值，或是輸入了值，都會動態改變
        item.addEventListener("keyup", () => {
            if(item.value !=""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

// 檢查gmail為正規表達式
function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");

    // match(emailRegex)用來檢查email的格式是否正確
    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value !=""){
            errorTxtEmail.innerText = "輸入有效的電子信箱";
        }
        else{
            errorTxtEmail.innerText = "信箱輸入不可空白";
        }
    }

    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
 }


// 當按下送出鍵後，表單不會被提交
form.addEventListener("submit",(e) => {
    e.preventDefault();
    checkInputs();

    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
        sendEmail();

        // 將表單重置為初始狀態
        form.reset();
        return false;
    }
});

