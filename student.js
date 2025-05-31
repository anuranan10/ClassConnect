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

//real time validation
document.getElementById("firstname").addEventListener("input", function() {
    this.value = this.value.replace(/[^A-Za-z\s\-]/g, "");
});

document.getElementById("lastname").addEventListener("input", function() {
    this.value = this.value.replace(/[^A-Za-z\s\-]/g, "");
});

document.getElementById("studentID").addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
});



//connecting frontend tp backend
document.getElementById("studentform").addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop default form submission

    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const studentID = document.getElementById("studentID").value;

    // Send data to backend
    try {
        const res = await fetch("https://3a254ac9-4201-41e3-838d-f156d6044a28-00-xtkv165zfgnh.worf.replit.dev/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                studentID,
            }),
        });

        const data = await res.json();
        alert(data.message); // success/failure from backend
    } catch (error) {
        alert("❌ Something went wrong!");
        console.error(error);
    }
});
