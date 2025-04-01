const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

const port = 8000;
app.use(bodyParser.json());
app.use(cors());

let users = []
let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'loogin',
        port: 8820
    })
}



const validateData = (userData) => {
    let errors = []
    if(!userData.firstname){
        errors.push ('กรุณากรอกชื่อ')
    }
    if(!userData.lastname){
        errors.push ('กรุณากรอกนามสกุล')
    }
    if(!userData.noTable){
        errors.push ('กรุณากรอกรหัสโต๊ะ')
    }
    if(!userData.date){
        errors.push ('กรุณากรอกวันที่')
    }
    if(!userData.status){
        errors.push ('กรุณากรอกสถานะการจอง')
    }
    if(!userData.gmail){
        errors.push ('กรุณากรอกอีเมล')
    }
    return errors
}

// path = GET /users สำหรับอ่านข้อมูล users ทั้งหมด
app.get('/booking', async (req, res) => {
    const results = await conn.query(
        "SELECT employeeID, firstname, lastname, noTable, status, gmail, DATE_FORMAT(date, '%Y-%m-%d') as date FROM booking"
    );
    res.json(results[0]);
});

//ดึงข้อมูล จาก date ที่เราต้องการ
app.get('/booking/date/:date', async (req, res) => {
    try {
        let bookingDate = req.params.date; // รับค่าจากพารามิเตอร์ URL
        const [results] = await conn.query(
            "SELECT employeeID, firstname, lastname, noTable, status, gmail, DATE_FORMAT(date, '%Y-%m-%d') as date FROM booking WHERE DATE(date) = ?",
            [bookingDate]
        );

        if (results.length === 0) {
            throw { statusCode: 404, message: 'No bookings found for this date' };
        }

        res.json(results);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(error.statusCode || 500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});


//path = GET /users/id สำหรับดึง users รายคนออกมา
app.get('/booking/:employeeID', async (req, res) => {
    try {
        let id = req.params.employeeID;
        const [results] = await conn.query(
            "SELECT employeeID, firstname, lastname, noTable, status, gmail, DATE_FORMAT(date, '%Y-%m-%d') as date FROM booking WHERE employeeID = ?",
            [id]
        );

        if (results.length === 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json(results[0]);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(error.statusCode || 500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});


//path = POST /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/booking', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }
        // ตรวจสอบว่า noTable อยู่ระหว่าง 1-9 หรือไม่
        if (user.noTable < 1 || user.noTable > 9) {
            throw {
                message: 'หมายเลขโต๊ะต้องอยู่ระหว่าง 1-9 เท่านั้น',
                errors: ['กรุณาเลือกหมายเลขโต๊ะใหม่']
            };
        }

        //  ตรวจสอบว่าโต๊ะนี้ถูกจองไปแล้วในวันเดียวกันหรือไม่
        const [existingBooking] = await conn.query(
            'SELECT * FROM booking WHERE noTable = ? AND date = ?',
            [user.noTable, user.date]
        );
        if (existingBooking.length > 0) {
            throw {
                message: 'โต๊ะนี้ถูกจองแล้วในวันนี้',
                errors: ['กรุณาเลือกโต๊ะหรือวันอื่น']
            };
        }



        // บันทึกข้อมูลลงฐานข้อมูล
        const results = await conn.query('INSERT INTO booking SET ?', user);
        res.json({
            message: 'Create user successfully',
            data: results[0]
        });
    } catch (error) {
        const errorMessage = error.message || 'เกิดข้อผิดพลาด';
        const errors = error.errors || [];
        console.error('error message: ', error.message);
        res.status(400).json({
            message: errorMessage,
            errors: errors
        });
    }
});

//path = PuT /users/:id สำหรับแก้ไข users ที่มี id
app.put('/booking/:employeeID',async (req, res) => {
    try {
      let id = req.params.employeeID;
      let updateUser = req.body;
      const results = await conn.query('UPDATE booking SET ? WHERE employeeID = ?', 
        [updateUser, id]
      );
      res.json({
        message: 'Update user successfully',
        data: results[0]
      });
    } catch (error) {
      console.error('error : ', error.message)
      res.status(500).json({
        message: 'something went wrong',
        errorMessage: error.message
      })
    }
  
    
  });

//path = DELETE /users/:id สำหรับลบ users ที่มี id
app.delete('/booking/:employeeID', async(req, res) => {
    try {
      let id = req.params.employeeID;
      const results = await conn.query('DELETE FROM booking WHERE employeeID= ?', parseInt(id));/*parseIntเช็คว่าเป็นตัวเลข*/ 
      res.json({
        message: 'Delete user successfully',
        data: results[0]
      });
    } catch (error) {
      console.error('error : ', error.message)
      res.status(500).json({
        message: 'something went wrong',
        errorMessage: error.message
      })
    }
  })
  




app.listen(port, async (req, res) => {
    await initMySQL();
    console.log("Http Server is running on port" +port);
});


