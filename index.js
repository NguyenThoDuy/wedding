/*https://github.com/phiphi1992/emoji-picker-element*/
// import Picker from './picker.js'
// import Database from './database.js'
// export { Picker, Database }

window.addEventListener('load', (event) => {
         // Sử dụng hàm với đường dẫn đến file JSON
     const filePath = 'comments.json';
     readCommentsFromFile();
     });
     
   
     function readCommentsFromFile() {
         const xhr = new XMLHttpRequest();
         xhr.overrideMimeType("application/json");
         xhr.open('GET', 'comments.json', true);
         xhr.onreadystatechange = function () {
             if (xhr.readyState === 4 && xhr.status === 200) {
                 try {
                     const comments = JSON.parse(xhr.responseText);
                    //  comments.forEach(comment => {
                    //      console.log('ID:', comment.id);
                    //      console.log('Name:', comment.name);
                    //      console.log('Content:', comment.content);
                    //      console.log('---------------------');
                    //  });
                    const wishBox = document.querySelector('.wish-box');
                    comments.forEach(comment => {
                        const commentHTML = '<div class="wish-box-item bg"><strong>' + comment.name.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</strong><p>' + comment.content.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</p></div>';
                        wishBox.insertAdjacentHTML('afterbegin', commentHTML);
                    });
                 } catch (error) {
                     console.error('Error parsing JSON:', error);
                 }
             }
         };
         xhr.send(null);
     } 
     
     
     
     