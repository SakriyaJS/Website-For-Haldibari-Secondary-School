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

            // Fetch the existing notices JSON file
            fetch('/notices/notices.json')
                .then(response => response.json())
                .then(notices => {
                    notices.push({ title, content, date });
                    // Update the JSON file with new notices (requires server-side code)
                    updateNoticesFile(notices);
                });

            addNoticeForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Load existing notices from the JSON file
    fetch('/notices/notices.json')
        .then(response => response.json())
        .then(notices => {
            notices.forEach(notice => addNotice(notice.title, notice.content, notice.date));
        });

    // Function to delete a notice (requires server-side code)
    function deleteNotice(title) {
        fetch('/notices/notices.json')
            .then(response => response.json())
            .then(notices => {
                const updatedNotices = notices.filter(notice => notice.title !== title);
                updateNoticesFile(updatedNotices);
            });
    }

    // Function to update the notices JSON file (requires server-side code)
    function updateNoticesFile(notices) {
        fetch('/update-notices.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notices)
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                console.error('Failed to update notices file.');
            }
        });
    }
});
