document.querySelectorAll('.image-container img').forEach(image => {
    image.onclick = () => {
        document.querySelector('.pop-image').style.display = 'block';
        document.querySelector('.pop-image img').src = image.getAttribute('src');
    }
});

document.querySelector('.pop-image span').onclick = () => {
    document.querySelector('.pop-image').style.display = 'none';
}

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // ป้องกันการทำงานปกติของลิงก์

    // เก็บค่าจากฟอร์ม
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const donation = document.getElementById('donation').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('text').value;

    // ตรวจสอบว่าฟิลด์ที่จำเป็นทั้งหมดถูกกรอกแล้ว
    if (name === '' || phone === '' || donation === '' || address === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน.',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'ส่งข้อมูลสําเร็จ!',
            text: 'ขอบคุณที่ส่งข้อมูล. ทีมงานจะติดต่อคุณในไม่ช้า.',
            confirmButtonText: 'OK'
        });
    }
});

