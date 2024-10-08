document.addEventListener('DOMContentLoaded', function() {
    var calendarList = document.getElementById('calendarList');

    // Function to add calendar items
    function addCalendarItem(date, dayOfWeek, holidayType) {
        var listItem = document.createElement('li');
        listItem.classList.add('calendar-item');

        // Determine the class based on the day of the week
        if (dayOfWeek === 6) { // Saturday
            listItem.classList.add('saturday');
        } else if (dayOfWeek === 5) { // Friday
            listItem.classList.add('friday');
        } else { // Other days
            listItem.classList.add('normal-day');
        }

        // Format the date
        var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        // Display the date with Nepali calendar months
        var nepaliMonth = getNepaliMonth(date.getMonth() + 1);
        var nepaliDateString = formattedDate + ' (' + nepaliMonth + ' ' + date.getDate() + ', ' + (date.getFullYear() - 57) + ')';

        // Set the text content
        listItem.textContent = nepaliDateString + ': ' + holidayType;

        // Append to the calendar list
        calendarList.appendChild(listItem);
    }

    // Function to get Nepali month
    function getNepaliMonth(month) {
        switch (month) {
            case 1: return 'Baishakh';
            case 2: return 'Jestha';
            case 3: return 'Asar';
            case 4: return 'Shrawan';
            case 5: return 'Bhadra';
            case 6: return 'Ashwin';
            case 7: return 'Kartik';
            case 8: return 'Mangsir';
            case 9: return 'Poush';
            case 10: return 'Magh';
            case 11: return 'Falgun';
            case 12: return 'Chaitra';
            default: return '';
        }
    }

    // Create calendar items for all days in 2081 BS
    var year = 2081;
    var startDate = new Date(year, 0, 1); // January 1, 2081
    var endDate = new Date(year, 11, 30); // December 30, 2081

    var currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        var dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

        if (dayOfWeek === 6) { // Saturday
            addCalendarItem(currentDate, dayOfWeek, 'Saturday (Holiday)');
        } else if (dayOfWeek === 5) { // Friday
            addCalendarItem(currentDate, dayOfWeek, 'Friday (Half Holiday)');
        } else { // Other days
            addCalendarItem(currentDate, dayOfWeek, 'Normal Day');
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
});