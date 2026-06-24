document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const searchInput = document.getElementById('searchInput');
    // Đổi tên biến lọc để phù hợp với việc lọc theo Cấp độ (Level)
    const levelFilter = document.getElementById('categoryFilter'); 
    const resetFilterBtn = document.getElementById('resetFilter');
    const courseSelect = document.getElementById('courseSelect');
    const registerForm = document.getElementById('registerForm');
    const regTableBody = document.getElementById('regTableBody');

    // 1. RENDER DANH SÁCH (Trang courses.html)
    function renderCourses(data) {
        if (!courseList) return;
        courseList.innerHTML = '';
        data.forEach(course => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-4';
            // Đã cập nhật hiển thị Giảng viên, Thời lượng và Giá tiền, thêm ép cứng chiều cao ảnh
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${course.title}</h5>
                        <span class="badge bg-secondary mb-3 align-self-start">${course.level}</span>
                        
                        <p class="card-text small mb-1"><i class="bi bi-person-fill"></i> <strong>GV:</strong> ${course.instructor}</p>
                        <p class="card-text small mb-1"><i class="bi bi-clock-history"></i> <strong>Thời lượng:</strong> ${course.duration}</p>
                        <p class="card-text text-danger fw-bold mb-2">${course.price}</p>
                        
                        <p class="card-text text-muted small">${course.description}</p>
                        <div class="mt-auto pt-3 border-top">
                            <button class="btn btn-outline-info btn-sm" onclick="showDetail(${course.id})">Chi tiết</button>
                            <a href="register.html?courseId=${course.id}" class="btn btn-success btn-sm">Đăng ký</a>
                        </div>
                    </div>
                </div>
            `;
            courseList.appendChild(col);
        });
    }

    // 2. TÌM KIẾM VÀ LỌC (Đã sửa để lọc theo Level thay vì Category)
    function filterData() {
        let filtered = courses;
        if (searchInput.value) {
            filtered = filtered.filter(c => c.title.toLowerCase().includes(searchInput.value.toLowerCase()));
        }
        if (levelFilter.value) {
            filtered = filtered.filter(c => c.level === levelFilter.value);
        }
        renderCourses(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterData);
    if (levelFilter) levelFilter.addEventListener('change', filterData);
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', () => {
            searchInput.value = '';
            levelFilter.value = '';
            renderCourses(courses);
        });
    }

    // 3. SHOW MODAL (Đã sửa để hiển thị đúng dữ liệu mới, không còn undefined)
    window.showDetail = function(id) {
        const course = courses.find(c => c.id === id);
        if (course) {
            document.getElementById('modalTitle').innerText = course.title;
            document.getElementById('modalImage').src = course.image;
            document.getElementById('modalDesc').innerText = course.description;
            
            // Thay đổi meta info của modal
            document.getElementById('modalMeta').innerHTML = `
                <span class="badge bg-secondary">${course.level}</span> | 
                <strong>GV:</strong> ${course.instructor} | 
                <strong>Thời lượng:</strong> ${course.duration} | 
                <strong class="text-danger">${course.price}</strong>
            `;
            
            const detailModal = new bootstrap.Modal(document.getElementById('courseModal'));
            detailModal.show();
        }
    }

    // Render khởi tạo trang danh sách
    if (courseList) renderCourses(courses);

    // 4. FORM VALIDATION & LOCALSTORAGE (Trang register.html)
    if (courseSelect) {
        courses.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.title;
            opt.innerText = c.title;
            courseSelect.appendChild(opt);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Validate Tên
            const name = document.getElementById('fullname');
            if (name.value.trim().length < 3) {
                document.getElementById('nameErr').innerText = 'Tên phải có ít nhất 3 ký tự.';
                isValid = false;
            } else document.getElementById('nameErr').innerText = '';

            // Validate Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailErr').innerText = 'Email không hợp lệ.';
                isValid = false;
            } else document.getElementById('emailErr').innerText = '';

            // Validate SDT
            const phone = document.getElementById('phone');
            const phoneRegex = /^[0-9]{9,11}$/;
            if (!phoneRegex.test(phone.value)) {
                document.getElementById('phoneErr').innerText = 'SĐT từ 9-11 chữ số.';
                isValid = false;
            } else document.getElementById('phoneErr').innerText = '';

            if (isValid) {
                const regData = {
                    id: Date.now(),
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    class: document.getElementById('class').value,
                    course: courseSelect.value,
                    note: document.getElementById('note').value
                };
                
                let regs = JSON.parse(localStorage.getItem('registrations')) || [];
                regs.push(regData);
                localStorage.setItem('registrations', JSON.stringify(regs));
                
                alert('Đăng ký thành công!');
                window.location.href = 'registrations.html';
            }
        });
    }

    // 5. RENDER DANH SÁCH ĐÃ ĐĂNG KÝ (Trang registrations.html)
    function renderRegistrations() {
        if (!regTableBody) return;
        regTableBody.innerHTML = '';
        let regs = JSON.parse(localStorage.getItem('registrations')) || [];
        regs.forEach((reg, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${reg.name}</td>
                <td>${reg.email}</td>
                <td>${reg.phone}</td>
                <td>${reg.class}</td>
                <td><span class="badge bg-success">${reg.course}</span></td>
                <td>${reg.note}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteReg(${reg.id})">Xóa</button></td>
            `;
            regTableBody.appendChild(tr);
        });
    }

    window.deleteReg = function(id) {
        if(confirm('Bạn có chắc muốn xóa?')) {
            let regs = JSON.parse(localStorage.getItem('registrations')) || [];
            regs = regs.filter(r => r.id !== id);
            localStorage.setItem('registrations', JSON.stringify(regs));
            renderRegistrations();
        }
    }

    window.deleteAll = function() {
        if(confirm('Xóa TẤT CẢ đăng ký?')) {
            localStorage.removeItem('registrations');
            renderRegistrations();
        }
    }

    if (regTableBody) renderRegistrations();
});