
window.onload = function ()
{
    document.getElementById('submit-email').onclick = function(e) {
        e.preventDefault();
        var form = document.getElementById('signup-form');
        var email = form.elements["email-entry"].value;
        var emailIsValid = validateEmail(email);
        if (!emailIsValid) {
            document.getElementById("email-entry").classList.add("invalid-input");
        } else {
            document.getElementById("email-entry").classList.remove("invalid-input");
        }

        var name = form.elements["name-entry"].value;
        var nameIsValid = !!name;
        if (!nameIsValid) {
            document.getElementById("name-entry").classList.add("invalid-input");
        } else {
            document.getElementById("name-entry").classList.remove("invalid-input");
        }

        var company = form.elements["company-entry"].value || 'N/A';
        if (emailIsValid && nameIsValid) {
            withSavedEntries(function (entries) {
                console.log(entries);
                appendEntry(entries, {
                    email: email,
                    name: name,
                    company: company
                })
            });
        }
    };


    document.getElementById('submit-test').onclick = function(e) {
        withSavedEntries(function (entries) {
            console.log(entries);
            appendEntry(entries, {
                email: '123@123.com',
                name: 'Silas',
                company: 'Test'
            })
        });
    };

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function withSavedEntries(callback) {
        var req = new XMLHttpRequest();
        var url = "https://www.jsonstore.io/59b4f19a3b03df16ee353558d9d81347e924ae1f5759c33edbb3c3f2f78c9c28";

        req.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var resp = JSON.parse(this.responseText);
                callback(resp.result || [0]);
            }
        };
        req.open("GET", url, true);
        req.send();
    }

    function appendEntry(entries, entry) {
        entries.push(entry);

        var req = new XMLHttpRequest();
        var url = "https://www.jsonstore.io/59b4f19a3b03df16ee353558d9d81347e924ae1f5759c33edbb3c3f2f78c9c28";
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    document.getElementById('signup-form').style.display = 'none';
                    document.getElementById('signup-submitted').style.display = 'inline';
                } else {
                    console.log('Submission failed');
                }
            }
        };
        req.open("POST", url, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(entries));
    }
};