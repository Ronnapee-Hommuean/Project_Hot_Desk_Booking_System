const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE'; // default mode
let selectedId = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id', id)
    if (id) {
        mode = 'EDIT'
        selectedId = id
        //1.ดึงข้อมูล user ที่ต้องการแก้ไข
        try {
            const response = await axios.get(`${BASE_URL}/booking/${id}`)
            const user = response.data

            //2. เราจะนำข้อมูลของ user ที่ดึงมา ใส่ใน input ที่เรามี
            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let gmailDOM = document.querySelector('input[name=gmail]');
            let noTableDOM = document.querySelector('input[name=noTable]');
            let dateDOM = document.querySelector('input[name=date]');

            const date = new Date(user.date).toISOString().split('T')[0]
            firstNameDOM.value = user.firstname
            lastNameDOM.value = user.lastname
            gmailDOM.value = user.gmail
            noTableDOM.value = user.noTable
            dateDOM.value = date
    
           
        } catch (error) {
            console.log('error', error);
        }
    }
}

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let gmailDOM = document.querySelector('input[name=gmail]');
    let noTableDOM = document.querySelector('input[name=noTable]');
    let dateDOM = document.querySelector('input[name=date]');

    let messageDOM = document.getElementById('message');

    try {
        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            gmail: gmailDOM.value,
            noTable: noTableDOM.value,
            date: dateDOM.value,
            status: 1 // ✅ กำหนดให้สถานะเป็น 1 (จองแล้ว)
        };

        console.log("submitData", userData);

        if (mode === 'CREATE') {
            const response = await axios.post(`${BASE_URL}/booking`, userData);
            // แสดงข้อความสำเร็จ
             Swal.fire({
            title: "จองสำเร็จ",
            icon: "success",
            draggable: true
            });
           
        }else{
            const response = await axios.put(`${BASE_URL}/booking/${selectedId}`, userData)
            Swal.fire({
                title: "แก้ไขข้อมูลเรียบร้อย",
                icon: "success",
                draggable: true
              });
            console.log('response', response.data);
        }
        

        

        messageDOM.innerText = message;
        messageDOM.className = 'message success';

    } catch (error) {
        console.log('error message', error.message);
        console.log('error ', error.errors);

        if (error.response) {
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }

        let errorText = error.message + '\n' + error.errors.join('\n');
        
        // ✅ แสดง Pop-up แจ้งเตือนข้อผิดพลาด
        Swal.fire({
            icon: "error",
            title: errorText,
          });

    
    }

}
