

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
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const comments = JSON.parse(xhr.responseText);
                        
                        // Sắp xếp các comments theo trường id từ lớn đến bé
                        comments.sort((a, b) => b.id - a.id);
    
                        const wishBox = document.querySelector('.wish-box');
                        comments.forEach(comment => {
                            let commentHTML = '';
                            if (comment.id % 2 === 0) {
                                commentHTML = '<div class="wish-box-item bg"><strong>' + comment.name.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</strong><p>' + comment.content.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</p></div>';
                            } else {
                                commentHTML = '<div class="wish-box-item"><strong>' + comment.name.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</strong><p>' + comment.content.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</p></div>';
                            }
                            wishBox.insertAdjacentHTML('afterbegin', commentHTML);
                        });
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                } else {
                    console.error('Failed to load comments. Status:', xhr.status);
                }
            }
        };
        
        xhr.send();
    }
    

    function addComment(name, content) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', 'comments.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    let comments = JSON.parse(xhr.responseText);
                    // Tìm id lớn nhất trong danh sách comments
                    let maxId = 0;
                    comments.forEach(comment => {
                        if (comment.id > maxId) {
                            maxId = comment.id;
                        }
                    });
                    // Tăng giá trị của id lên 1 cho comment mới
                    const newComment = {
                        id: maxId + 1,
                        name: name,
                        content: content
                    };
                    // Thêm comment mới vào danh sách comments
                    comments.push(newComment);
                    
                    // Ghi lại danh sách comments mới vào file JSON
                    saveCommentsToFile(comments);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        };
        xhr.send(null);
    }
    
    function saveCommentsToFile(comments) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('POST', 'save_comments.php', true); // Đặt địa chỉ URL của file PHP hoặc API để lưu danh sách comments
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Comments saved successfully.');
                    // Sau khi lưu thành công, bạn có thể làm bất kỳ xử lý nào khác ở đây, như hiển thị thông báo hoặc làm mới giao diện.
                } else {
                    console.error('Failed to save comments. Status:', xhr.status);
                }
            }
        };
        xhr.send(JSON.stringify(comments));
    }
    
    
    document.addEventListener('DOMContentLoaded', function() {
        const wishForm = document.getElementById('wish-form-add-comment');
        if (wishForm) {
            wishForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Ngăn chặn hành động mặc định của submit form
    
                // Lấy thông tin từ các trường input trong form
                const name = document.getElementById('name-input').value;
                const content = document.getElementById('content-input').value;
    
                // Gọi hàm addComment với thông tin vừa lấy được
                addComment(name, content);
    
                // Optional: reset form sau khi submit
                wishForm.reset();
            });
        }
    });
    
    
     
     
     
     