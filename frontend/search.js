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

        let htmlData = `
                        <table class="background">
                        <tr>
                            <th>ID</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>status</th>
                            <th>noTable</th>
                            <th>Date</th>
                        </tr>`;

        if (response.data.length === 0) {
            Swal.fire({
                icon: "info",
                title: "ไม่พบข้อมูล",
                text: "ไม่มีข้อมูลสำหรับวันที่เลือก",
                confirmButtonText: "ตกลง"
            });
            message.classList.add('danger');
            message.classList.remove('succes');
            message.innerHTML = 'ไม่เจอข้อมูลที่ค้นหา';
            informationDOM.classList.add('hidden');
            return;
        }

        for (let i = 0; i < response.data.length; i++) {
            let employee = response.data[i];
            let date = new Date(employee.date).toLocaleDateString('en-GB');
            let tableStatus = employee.status == 0 ? "ว่าง" : "ไม่ว่าง";
            htmlData += `             <br>                    
                                    <tr class="background2">
                                        <td>${employee.employeeID}</td> 
                                        <td>${employee.firstname}</td> 
                                        <td>${employee.lastname}</td> 
                                        <td>${tableStatus}</td>
                                        <td>${employee.noTable}</td>
                                        <td>${date}</td>
                                    </tr>`;
        }

        htmlData += '</table>';
        informationDOM.innerHTML = htmlData;

        // แจ้งเตือน SweetAlert ว่าดึงข้อมูลสำเร็จ
        Swal.fire({
            title: "ดึงข้อมูลสำเร็จ",
            icon: "success",
            text: `พบข้อมูลทั้งหมด ${response.data.length} รายการ`,
            confirmButtonText: "ตกลง"
        });

    } catch (error) {
        message.classList.add('danger');
        message.classList.remove('succes');
        message.classList.remove('hidden');
        informationDOM.classList.add('hidden');

        let errorText = error.message || "เกิดข้อผิดพลาด ไม่สามารถดึงข้อมูลได้";
        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: errorText,
            confirmButtonText: "ตกลง"
        });
    }
};
