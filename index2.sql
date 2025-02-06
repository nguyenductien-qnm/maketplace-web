CREATE TABLE SinhVien (
    MaSV INT PRIMARY KEY,
    HoTen VARCHAR(100),
    NgaySinh DATE,
    GioiTinh VARCHAR(10),
    DiaChi VARCHAR(255)
);

CREATE TABLE MonHoc (
    MaMH INT PRIMARY KEY,
    TenMH VARCHAR(100),
    SoTiet INT,
    HeSoMon FLOAT
);

CREATE TABLE Diem (
    MaSV INT,
    MaMH INT,
    DiemThi FLOAT,
    PRIMARY KEY (MaSV, MaMH),
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV),
    FOREIGN KEY (MaMH) REFERENCES MonHoc(MaMH)
);


1. Lấy danh sách tất cả sinh viên

SELECT * FROM SinhVien;

2. Lấy tên và địa chỉ của sinh viên có mã số 1

SELECT HoTen, DiaChi FROM SinhVien WHERE MaSV = 1;

3. Tìm sinh viên có điểm môn Toán (MaMH = 101) lớn hơn 8

SELECT SV.* 
FROM SinhVien SV 
JOIN Diem D ON SV.MaSV = D.MaSV
WHERE D.MaMH = 101 AND D.DiemThi > 8;

4. Cập nhật điểm môn Hóa của sinh viên có mã số 2 thành 7

UPDATE Diem 
SET DiemThi = 7 
WHERE MaSV = 2 AND MaMH = 103;

5. Xóa sinh viên có mã số 3 khỏi bảng SinhVien

DELETE FROM SinhVien WHERE MaSV = 3;

6. Tìm tất cả sinh viên có giới tính là Nữ hoặc bé hơn 18 tuổi

SELECT * FROM SinhVien 
WHERE GioiTinh = 'Nữ' OR YEAR(CURDATE()) - YEAR(NgaySinh) < 18;

7. Thêm một sinh viên mới vào bảng SinhVien

INSERT INTO SinhVien (MaSV, HoTen, NgaySinh, GioiTinh, DiaChi) 
VALUES (6, 'Nguyen Van A', '2006-12-05', 'Nam', 'Da Nang');

8. Liệt kê tên các môn học có số tiết lớn hơn 30

SELECT TenMH FROM MonHoc WHERE SoTiet > 30;

9. Tìm sinh viên có điểm trung bình của tất cả môn học >= 7

SELECT SV.*, AVG(D.DiemThi) AS DiemTrungBinh
FROM SinhVien SV
JOIN Diem D ON SV.MaSV = D.MaSV
GROUP BY SV.MaSV
HAVING AVG(D.DiemThi) >= 7;

10. Lấy danh sách các sinh viên chưa có điểm môn Lý (MaMH = 102)

SELECT SV.* 
FROM SinhVien SV
WHERE SV.MaSV NOT IN (SELECT MaSV FROM Diem WHERE MaMH = 102);

11. Tính tổng số tiết học của tất cả các môn học

SELECT SUM(SoTiet) AS TongSoTiet FROM MonHoc;

12. Sắp xếp danh sách sinh viên theo tên từ A-Z

SELECT * FROM SinhVien ORDER BY HoTen ASC;

13. Lấy danh sách sinh viên có điểm thi môn Hóa thấp hơn 6

SELECT SV.* 
FROM SinhVien SV
JOIN Diem D ON SV.MaSV = D.MaSV
WHERE D.MaMH = 103 AND D.DiemThi < 6;

14. Cập nhật địa chỉ của sinh viên có mã số 1 thành “Bắc Ninh”

UPDATE SinhVien 
SET DiaChi = 'Bắc Ninh' 
WHERE MaSV = 1;

15. Tìm sinh viên có điểm môn Toán và môn Lý đều lớn hơn 8

SELECT SV.* 
FROM SinhVien SV
JOIN Diem D1 ON SV.MaSV = D1.MaSV AND D1.MaMH = 101 AND D1.DiemThi > 8
JOIN Diem D2 ON SV.MaSV = D2.MaSV AND D2.MaMH = 102 AND D2.DiemThi > 8;

16. Thêm môn học mới vào bảng MonHoc

INSERT INTO MonHoc (MaMH, TenMH, SoTiet, HeSoMon)
VALUES (104, 'Lịch sử Sinh học', 35, 1.2);

17. Tìm sinh viên có điểm môn Lý thấp nhất

SELECT SV.*, D.DiemThi 
FROM SinhVien SV
JOIN Diem D ON SV.MaSV = D.MaSV
WHERE D.MaMH = 102 
ORDER BY D.DiemThi ASC 
LIMIT 1;

18. Xóa môn học có mã số 103 khỏi bảng MonHoc

DELETE FROM MonHoc WHERE MaMH = 103;

19. Tìm sinh viên có điểm cao nhất môn Toán

SELECT SV.*, D.DiemThi 
FROM SinhVien SV
JOIN Diem D ON SV.MaSV = D.MaSV
WHERE D.MaMH = 101 
ORDER BY D.DiemThi DESC 
LIMIT 1;

20. Tính điểm trung bình của tất cả các sinh viên cho từng môn học

SELECT D.MaMH, M.TenMH, AVG(D.DiemThi) AS DiemTrungBinh
FROM Diem D
JOIN MonHoc M ON D.MaMH = M.MaMH
GROUP BY D.MaMH, M.TenMH;

Lưu ý:
 • Điều kiện mã môn học: Toán = 101, Lý = 102, Hóa = 103, theo đề bài. Nếu mã môn khác thì cần chỉnh sửa.
 • Hàm AVG(DiemThi) để tính trung bình điểm.
 • Hàm SUM(SoTiet) để tính tổng số tiết học.
 • Sử dụng JOIN để lấy dữ liệu từ nhiều bảng liên quan.

Nếu có lỗi hoặc cần giải thích thêm, cứ hỏi nhé!