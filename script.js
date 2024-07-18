// Bài 1
function sumFromOneToOneHundred() {
    const n = 100;
    return (n * (n + 1)) / 2;
}

console.log(sumFromOneToOneHundred()); // Output: 5050

// bài 2
let array= [1,50,100, 125, 175];

let sum = 0;
for (let i = 0; i < 5; ++i) {
    sum += array[i];
}

let average = sum / 5;

console.log("Tong = " + sum);
console.log("Trung binh cong = " + average);

// Bài 3
function isPalindrome(str) {
    //Phân tích từng phần tử của chuỗi
    //chuyển thành chữ thường, tất cả kí tự khác a-z và 0-9 bị xóa
    let cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    //Tách từng phần tử, đảo ngược, ghép lại từng phần tử
    let reversedStr = str.split('').reverse().join('');

    //So sánh chuỗi có Palindrome không
    return cleanedStr == reversedStr;
}

console.log(isPalindrome("hello"));
console.log(isPalindrome("madam"));

// Bài 4
let student = {
    name: "Thong dep zai",
    age: 14,
    averagePoint: 10.0
};

function printStudentInfo(student) {
    console.log('Ten: ' + student.name);
    console.log('Tuoi: ' + student.age);
    console.log('Diem trung binh: ' + student.averagePoint);
}

printStudentInfo(student);