# Báo cáo sử dụng AI

### 1. Em đã dùng AI để hỗ trợ phần nào?
- Tạo bộ khung HTML/Bootstrap 5 cơ bản.
- Viết logic JavaScript (xử lý LocalStorage, validation).
- Gỡ lỗi code (lỗi không chuyển trang, lỗi hiển thị `undefined`).
- Gợi ý CSS tạo hiệu ứng nền kính mờ (Glassmorphism).

### 2. Prompt đã sử dụng
- *"Xây dựng trang HTML giới thiệu sự kiện, chỉ dùng HTML/CSS/JS thuần và Bootstrap."*
- *"Phần đăng ký sau khi điền thông tin và nhấn nút thì không chuyển trang."*
- *"Dòng chữ 'undefined' hiển thị trên thẻ khóa học là gì và cách khắc phục?"*

### 3. Đã chỉnh sửa gì sau khi AI sinh code?
- Dữ liệu: Sửa cấu trúc mảng của AI (thêm `instructor`, `duration`, `price`) và căn chỉnh lại JS để đọc đúng dữ liệu mới.
- Giao diện: Tự chèn ảnh thực tế, xóa bỏ các class Bootstrap gây xung đột (`bg-light`, `bg-dark`) để hiệu ứng kính mờ hiển thị chuẩn xác.

### 4. Phần nào sinh viên tự viết?
- Lên ý tưởng (CourseHub), chuẩn bị nội dung và tự khai báo mảng dữ liệu khóa học.
- Cắt ảnh minh họa và liên kết luồng chuyển trang giữa các file HTML.
- Deploy website lên GitHub Pages.

### 5. Sinh viên học được gì từ quá trình dùng AI?
- Kỹ năng Debug: Hiểu bản chất lỗi `undefined` trong JS là do gọi sai thuộc tính Object.
- CSS Nâng cao: Biết cách dùng `backdrop-filter: blur()` để làm giao diện xuyên thấu.
- Tư duy lập trình: AI giúp viết code nền tảng nhanh, nhưng sinh viên phải nắm vững kiến thức DOM/CSS để tự lắp ráp và tùy biến theo ý mình.