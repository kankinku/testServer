document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('theme-form');
  const imageContainer = document.getElementById('image-container');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const theme = formData.get('theme');

    try {
      // 서버로 테마 정보 전송
      const response = await fetch(`/theme/${theme}`);
      const images = await response.json();

      // 이미지 정보를 기반으로 HTML에 이미지 표시
      imageContainer.innerHTML = '';
      images.forEach(image => {
        const imageUrl = `../../imguploadtest/file/${image.name}`;
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = image.originalname;
        imageContainer.appendChild(imgElement);
      });
    } catch (error) {
      console.error('에러:', error);
    }
  });
});