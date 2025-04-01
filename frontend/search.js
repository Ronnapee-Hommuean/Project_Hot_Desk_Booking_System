const BASE_URL = 'http://localhost:8000';

let dateDOM = document.getElementById("date");
let message = document.getElementById("message");
let informationDOM = document.getElementById("information");

const searchingData = async () => {
    try {
        if (dateDOM.value == '') {
            Swal.fire({
                icon: "warning",
                title: "กรุณาใส่วันที่",
                text: "คุณต้องระบุวันที่ก่อนค้นหา",
                confirmButtonText: "ตกลง"
            });
            return; // ออกจากฟังก์ชันเลย
        }

        const response = await axios.get(`${BASE_URL}/booking/date/${dateDOM.value}`);
        console.log("response", response.data);

        message.classList.add('succes');
        message.classList.remove('danger');
        message.classList.remove('hidden');
        informationDOM.classList.remove("hidden");

        let htmlData = `<br>
                        <table >
                        <tr class="background">
                            <th>ID</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>status</th>
                            <th>noTable</th>
                            <th>Date</th>
                        </tr>`;

                       

        for (let i = 0; i < response.data.length; i++) {
            let user = response.data[i];
            let date = new Date(user.date).toLocaleDateString('en-GB');
            let tableStatus = user.status == 0 ? "ว่าง" : "ไม่ว่าง";
            htmlData += `                             
                                    <tr class="background2">
                                        <td data-label="ID">${user.employeeID}</td> 
                                        <td data-label="firstname">${user.firstname}</td> 
                                        <td data-label="lastname">${user.lastname}</td> 
                                        <td data-label="status">${tableStatus}</td>
                                        <td data-label="No.Table">${user.noTable}</td>
                                        <td data-label="Date">${date}</td>
                                    </tr>`;
        }

        htmlData += '</table>';
        informationDOM.innerHTML = htmlData;


    } catch (error) {
      
        Swal.fire({
            icon: "info",
            title: "ยังไม่มีการจอง",
            confirmButtonText: "ตกลง"
        });
    }
};