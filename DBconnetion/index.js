const fs = require('fs');

// 이미지 파일이 있는 디렉토리 경로
const directoryPath = '/path/to/your/image/directory';

// 디렉토리 내의 파일 목록을 가져오는 함수
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    // 이미지 파일의 목록 출력
    console.log('Image files:');
    files.forEach(function (file) {
        console.log(file); // 파일 이름 출력
    });
});