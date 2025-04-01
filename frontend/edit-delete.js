const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    //1. load user.js ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/booking`);
    console.log(response.data);


    const userDOM = document.getElementById('user');
    //2. นำ user.js ทั้งหมด โหลดหลับเข้าไปใน html
    let htmlData = `<table>
        <tr class="background ">
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Gmail</th>
                <th>Date</th>
                <th>No.Table</th>
                <th>Edit</th>
                <th>Delete</th>
        </tr>
          `


    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        const dateDOM = new Date(user.date).toLocaleDateString('en-GB')
        htmlData += `
        <tr class="background2">
            <td data-label="ID">
                ${user.employeeID} 
            </td>
            <td data-label="Firstname">
                 ${user.firstname}
            </td>
            <td data-label="Lastname">
                 ${user.lastname}
            </td>
            <td data-label="Gmail">
                 ${user.gmail}
            </td>
            <td data-label="Date">
                 ${dateDOM}
            </td>
            <td data-label="No.Table">
                ${user.noTable}
            </td>
            <td>
                <a href = 'edit.html?id=${user.employeeID}'><button class ='button '>Edit</button></a>
            </td>
            <td>
                <button class='delete button'  data-id = '${user.employeeID}'>Delete</button>
            </td>
        </tr>`

    }
    htmlData += '</table>'
    userDOM.innerHTML = htmlData;


    //3. ลบ user
    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            //ดึง id ของ user ที่ต้องการลบ
            const id = event.target.getAttribute('data-id');

            try {
                await axios.delete(`${BASE_URL}/booking/${id}`);
                loadData();//recursive function = เรียกใช้ฟังก์ชัน ตัวเอง

            } catch (error) {
                console.log('error', error);
            }
        })
    }


}