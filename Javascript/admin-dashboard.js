document.addEventListener("DOMContentLoaded", function() {
    const addNoticeForm = document.getElementById('add-notice-form');
    const noticeList = document.getElementById('notice-list');

    // Function to add a notice to the notice list
    function addNotice(title, content, date) {
        const noticeElement = document.createElement('div');
        noticeElement.classList.add('notice');
        
        const noticeHeading = document.createElement('h3');
        noticeHeading.textContent = title;
        noticeElement.appendChild(noticeHeading);

        const noticeDate = document.createElement('p');
        noticeDate.textContent = `Date: ${date}`;
        noticeElement.appendChild(noticeDate);

        const noticeContent = document.createElement('p');
        noticeContent.textContent = content;
        noticeContent.style.display = 'none'; // Initially hide the content
        noticeElement.appendChild(noticeContent);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Notice';
        deleteButton.addEventListener('click', function() {
            deleteNotice(title);
        });
        noticeElement.appendChild(deleteButton);

        noticeElement.addEventListener('click', function() {
            noticeContent.style.display = (noticeContent.style.display === 'none') ? 'block' : 'none';
        });

        noticeList.appendChild(noticeElement);
    }

    // Handle form submission
    addNoticeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const date = document.getElementById('date').value;

        if (title && content && date) {
            addNotice(title, content, date);

            // Save the notice to localStorage
            const notices = JSON.parse(localStorage.getItem('notices')) || [];
            notices.push({ title, content, date });
            localStorage.setItem('notices', JSON.stringify(notices));

            addNoticeForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Load existing notices from localStorage
    const savedNotices = JSON.parse(localStorage.getItem('notices')) || [];
    savedNotices.forEach(notice => addNotice(notice.title, notice.content, notice.date));

    // Function to delete a notice
    function deleteNotice(title) {
        const notices = JSON.parse(localStorage.getItem('notices')) || [];
        const updatedNotices = notices.filter(notice => notice.title !== title);
        localStorage.setItem('notices', JSON.stringify(updatedNotices));
        location.reload(); // Reload the page to reflect the changes
    }
});
