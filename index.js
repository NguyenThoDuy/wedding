function readCommentsFromFile() {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'comments.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const comments = JSON.parse(xhr.responseText);
                    const wishBox = document.querySelector('.wish-box');
                    comments.forEach(comment => {
                        console.log(comment.id)
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
