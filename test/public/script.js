document.addEventListener("DOMContentLoaded", function() {
  fetch('../file/*')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          // 서버에서 가져온 파일 내용을 표시
          document.getElementById('fileContent').innerText = data;
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
});