function moveToNext(event, nextInputId) {
    if(event.key === 'Enter') {
        event.preventDefault(); //preventing default function of enter to submit

        if(nextInputId) {
            document.getElementById(nextInputId).focus();
        } else {
            document.getElementById('studentform').submit(); //submitting the form
        }
    }
}

