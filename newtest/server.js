const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '0000',
  database : 'readimg'
});

// mysql연결
connection.connect();

//쿼리 실행문
connection.query("SELECT originalname FROM files WHERE thema = 'red'", function(error, results, fields){
  if(error) throw error;
  //결과를 순회하며  origin name정보를 출력
  results.forEach(result => {
    console.log('originalName : ', result.originalname);
  });
});

connection.end();