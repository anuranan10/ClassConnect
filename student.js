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

document.getElementById("firstname").addEventListener("input", function() {
    this.value = this.value.replace(/[^A-Za-z\s\-]/g, "");
});

document.getElementById("lastname").addEventListener("input", function() {
    this.value = this.value.replace(/[^A-Za-z\s\-]/g, "");
});

document.getElementById("studentID").addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
});