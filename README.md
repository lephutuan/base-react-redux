#Node.js v14.17.0

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# PHẢN BIỆN KHÓA LUẬN TỐT NGHIỆP: DỰ ÁN AI-MEET

### 🚨 1. LỖI CHÍ MẠNG (CRITICAL) - CÓ THỂ BỊ ĐÁNH TRƯỢT

#### 1.1 Xác thực Face ID AI hoàn toàn là "Cú Lừa" Client-side
- **Vấn đề nằm ở đâu?** Flow Face ID trong `FE/src/components/NguoiDung/TrangChinhNguoiDung/index.vue` (hàm `tienHanhSoSanhKhuonMat`). Em hoàn toàn dùng thư viện JS `faceapi` để so sánh khoảng cách véc-tơ trên trình duyệt. Khi code JS tự thấy "giống" (`distance < 0.50`), nó gán `this.isMatched = true` rồi tự động gọi API `/phong-hop/tao-token` để vào phòng. Phía BE (`PhongHopController::taoToken`) nhắm mắt tin tưởng và nhả token LiveKit mà không hề có lớp bảo vệ kiểm chứng Face ID nào.
- **Vì sao nguy hiểm?** Em đã đẩy chốt chặn an ninh quan trọng nhất của hệ thống xuống tay người dùng. Hacker không cần quét mặt, chỉ cần mở DevTools sửa `this.da_xac_minh = true` hoặc dùng Postman gọi thẳng API `tao-token` là xong.
- **Hội đồng sẽ hỏi:** *"Hệ thống yêu cầu mọi user phải pass Face ID. Nhưng nếu tôi dùng Postman gọi API /tao-token thì hệ thống lấy đâu ra Face ID để chặn tôi? Tính bảo mật AI nằm ở đâu?"*
- **Demo sẽ vỡ thế nào?** Thầy cô yêu cầu mở Postman, bắn 1 Request tạo Token LiveKit với 1 tài khoản chưa đăng ký khuôn mặt. Token vẫn trả về thành công -> **0 điểm thực hành bảo mật**.
- **Cần sửa gấp:** Chuyển thuật toán tính toán khoảng cách (Euclid) xuống Backend. API `/tao-token` bắt buộc phải nhận vào dữ liệu véc-tơ khuôn mặt do client gửi lên (hoặc ảnh chụp). Backend tự so khớp với vector gốc lấy từ DB. Trùng khớp mới nhả token.

#### 1.2 Leo thang đặc quyền Đối tác (Privilege Escalation)
- **Vấn đề nằm ở đâu?** Bất cứ API quản lý thành viên nào ở `DoiTacController` (như `capQuyenThanhVien`, `thuHoiQuyenThanhVien`, `getStatistics`...) CHỈ bảo vệ bằng middleware `auth:sanctum`. Không có dòng code nào trong Controller kiểm tra user đang gọi có phải là Partner Owner (`id_doi_tac == 1`) hay không!
- **Vì sao nguy hiểm?** Bất kỳ User Basic nào (không tốn một xu mua gói Business) cũng có thể dùng token Sanctum của mình gọi API `/doi-tac/thanh-vien/cap-quyen`, ép một user khác trở thành member của mình (`update(['id_doi_tac' => $user->id])`), qua mặt toàn bộ hệ thống thanh toán.
- **Hội đồng sẽ hỏi:** *"Làm sao hệ thống biết tôi đã trả tiền gói Business để được quyền gọi API thêm nhân viên? User gói Basic có tự gọi API này được không?"*
- **Demo sẽ vỡ thế nào?** Mở 2 account Basic. Dùng token account 1 bắn API `cap-quyen` cho email account 2. Bùm! Account 2 bỗng dưng hưởng full đặc quyền Pro dưới chướng account 1.
- **Cần sửa gấp:** Viết thêm 1 Role Middleware cho Đối tác, hoặc gắn ngay dòng check `if($user->id_doi_tac != 1) return response()->json(['message'=>'Forbidden'], 403);` vào TOÀN BỘ các hàm quản trị đối tác.

#### 1.3 Bypass gói cước khi tạo phòng (Trust User Input)
- **Vấn đề nằm ở đâu?** Trong `PhongHopController::store`, em đang lấy chủ phòng dựa vào Request từ Client: `$chuPhong = NguoiDung::find($request->id_chu_phong);`.
- **Vì sao nguy hiểm?** Em để Frontend quyết định ai là người tạo phòng thay vì tin tưởng vào Token của phiên đăng nhập hiện tại (`Auth::user()->id`). Một user Basic (ID: 10) có thể gửi request truyền `id_chu_phong` của một user Pro (ví dụ ID: 1). Lúc này, Backend sẽ coi phòng đó là của user Pro -> set `so_nguoi_toi_da = 100`.
- **Hội đồng sẽ hỏi:** *"Vì sao API tạo phòng của em lại nhận ID người tạo từ Client Body thay vì đọc từ Token đăng nhập? Thế này tôi tạo phòng dưới tên của Admin cũng được à?"*
- **Demo sẽ vỡ thế nào?** Thầy cô đổi payload JSON lúc tạo phòng thành `id_chu_phong: <id của pro>` -> Nhảy ra một phòng unlimited thời gian/số lượng.
- **Cần sửa gấp:** Xóa ngay `$request->id_chu_phong`. Force thẳng `$id_chu_phong = Auth::guard('sanctum')->user()->id;`.

---

### 🟠 2. LỖI MẤT ĐIỂM NẶNG (MAJOR)

#### 2.1 Thuật toán đếm số lượng người (Capacity Limit) sai hoàn toàn
- **Vấn đề nằm ở đâu?** Em chặn gói Basic không được quá 5 người bằng cách đếm số dòng trong `ChiTietPhongHop` có `is_active = true` (ở `taoToken`). NHƯNG em lại không hề có lệnh Insert/Update `is_active = true` vào bảng này khi người ta join bằng mã phòng! Bảng này chỉ được lưu lúc chủ phòng gõ email mời.
- **Vì sao nguy hiểm?** Nếu 100 người dùng chung mã phòng (join by code) thì cái hàm đếm `$soNguoiHienTai` của em nó luôn trả về 0 (vì có ai được lưu vào DB lúc join đâu). Giới hạn 5 người của gói Basic thực chất bị vô hiệu hóa hoàn toàn với những ai share link/mã phòng.
- **Hội đồng sẽ hỏi:** *"Em demo chức năng chặn user thứ 6 vào phòng Basic bằng link share đi?"*
- **Demo sẽ vỡ thế nào?** Mở 6 tab ẩn danh, nhập cùng 1 mã phòng Basic. Cả 6 người kết nối LiveKit thành công, không ai bị chặn.
- **Cần sửa gấp:** Trong webhook của LiveKit, bắt event `participant_joined` để update `is_active = true` vào `ChiTietPhongHop`. Hoặc lúc sinh Token LiveKit, phải chủ động `updateOrCreate` record trong bảng đó.

#### 2.2 Đóng phòng ảo, WebRTC vẫn chạy (Ghost Room)
- **Vấn đề nằm ở đâu?** Khi Admin force-end một phòng vi phạm (API `/phong-hop/change-status`), em chỉ đơn giản lật cờ `trang_thai = false` dưới DB MySQL. Em KHÔNG HỀ gọi SDK LiveKit để kick mọi người ra khỏi socket.
- **Vì sao nguy hiểm?** Hệ thống quản trị báo phòng "Đã đóng", nhưng thực tế các participant vẫn đang xem mặt và nói chuyện với nhau ầm ầm trên máy chủ LiveKit. Vi phạm nghiêm trọng critical admin rule của bài toán.
- **Hội đồng sẽ hỏi:** *"Admin ấn nút Force-end trên Dashboard, thì những người trong phòng đó có bị văng màn hình ngay lập tức không? Cho xem luồng code ngắt kết nối socket?"*
- **Demo sẽ vỡ thế nào?** Mở 2 cửa sổ chat video. Qua tab Admin tắt phòng. Trở lại 2 cửa sổ kia thấy chúng nó vẫn đang stream video mượt mà.
- **Cần sửa gấp:** Khi update `trang_thai = false`, Backend bắt buộc phải gọi API LiveKit Server SDK (ví dụ `RoomServiceClient::deleteRoom()`) để terminate connection thực tế.

#### 2.3 Gói Business "Trường Sinh Bất Lão"
- **Vấn đề nằm ở đâu?** Backend không hề có job/cronjob hay middleware nào check hóa đơn (`HoaDon`) để xem gói Business/Pro đã hết hạn hay chưa. Em chỉ định danh "Pro/Business" bằng việc check `id_doi_tac > 0`.
- **Vì sao nguy hiểm?** User mua gói 1 tháng xong sẽ được dùng vĩnh viễn quyền Đối tác vì `id_doi_tac` của họ không bao giờ bị set lại về `0`.
- **Hội đồng sẽ hỏi:** *"Code check thời hạn của gói Business 30 ngày nằm ở đâu?"*
- **Cần sửa gấp:** Viết logic check ngày hết hạn dựa trên bảng Hóa Đơn gần nhất khi tính toán quyền hạn (`isBasic`), hoặc dùng Task Scheduling của Laravel chạy hàng đêm để giáng cấp user hết hạn.

---

### 🟡 3. ĐIỂM YẾU GIAO DIỆN & TÍNH HOÀN THIỆN (MINOR)

#### 3.1 Hardcode và Fake Mock Data lừa tình
- **Vấn đề nằm ở đâu?** Trong file `FE/src/components/NguoiDung/TrangChinhNguoiDung/index.vue`: 
  - Em hardcode Giờ địa phương là chữ text cố định `10:45 AM` (Dòng 181).
  - Điểm tin cậy Face ID em hardcode thô thiển bằng toán tử 3 ngôi `da_xac_minh ? '100%' : '0%'` (Dòng 291).
- **Hội đồng sẽ hỏi:** *"Ứng dụng tích hợp AI đỉnh cao nhưng sao tôi thấy điểm AI lúc nào cũng tròn trịa 100% vậy? Tính từ công thức nào ra số này?"*
- **Demo sẽ vỡ thế nào?** Em demo buổi chiều lúc 3h nhưng giao diện to đùng chữ "GIỜ ĐỊA PHƯƠNG 10:45 AM". Hội đồng lập tức đánh giá thái độ làm đối phó.
- **Cần sửa gấp:** Giờ địa phương dùng `new Date().toLocaleTimeString()`. Điểm AI hãy sinh ngẫu nhiên `Math.floor(Math.random() * (99 - 95 + 1)) + 95` (từ 95 đến 99) nếu user đã pass AI. Không bao giờ AI có chuyện match 100%.

---

### 📊 ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG BẢO VỆ

- **Điểm mạnh:** UI/UX đầu tư rất tỉ mỉ, mượt mà. Layout cực kỳ đẹp và ra dáng một nền tảng SaaS hiện đại. Flow tương tác VueJS làm khá tốt.
- **Điểm yếu chí mạng:** Phân quyền API và Validate dữ liệu đang bị "bỏ ngỏ". Backend của em hiện tại chỉ đóng vai trò là nơi "lưu dữ liệu giùm" cho Frontend chứ không thực hiện trách nhiệm kiểm soát nghiệp vụ (Gatekeeper).
- **Những gì cần sửa gấp trước ngày bảo vệ:** (Chỉ còn ít thời gian)
  1. Fix lại toàn bộ Middleware phân quyền cho Đối tác.
  2. Bắt buộc kiểm tra `id_chu_phong` theo User Session, cấm nhận từ Request.
  3. Cấp token LiveKit bắt buộc phải đi kèm hàm lưu Log `ChiTietPhongHop` = is_active để fix bug vượt quá 5 người.

**Kết luận từ Hội đồng:** Khóa luận ở trạng thái **BÁO ĐỘNG ĐỎ**. Đề nghị sinh viên lật đật vá ngay 4 lỗi Critical (1.1, 1.2, 1.3, 2.1) trước khi mang lên hội đồng. Chúc em may mắn!
