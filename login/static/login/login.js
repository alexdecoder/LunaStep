window.onload = () =>
{
    var loginButton = document.getElementsByClassName("contentDialogWrapper-form-login")[0]
    var errorLabel = document.getElementsByClassName("contentDialog-error")[0]
    loginButton.addEventListener("click", () =>
    {
        if(document.getElementsByTagName("input")[1].value != "" && document.getElementsByTagName("input")[2].value != "")
        {
            headers = [{name: "username", value: document.getElementsByTagName("input")[1].value}, {name: "password", value: document.getElementsByTagName("input")[2].value}];
            loadDocument("verlogin/", headers, "", (success, data, _) =>
            {
                if(success)
                {
                    if(data == "valid")
                    {
                        window.open("../", "_self")
                    }
                    else if(data == "incorrect")
                    {
                        document.getElementsByTagName("input")[1].style.borderColor = "#fa755a"
                        document.getElementsByTagName("input")[2].style.borderColor = "#fa755a"

                        errorLabel.innerHTML = "Incorrect username or password"
                    }
                    else
                    {
                        document.getElementsByTagName("input")[1].style.borderColor = "#fa755a"
                        document.getElementsByTagName("input")[2].style.borderColor = "#fa755a"

                        errorLabel.innerHTML = "Unknown error: " + data
                    }
                }
            })
        }
        else
        {
            document.getElementsByTagName("input")[1].style.borderColor = "#fa755a"
            document.getElementsByTagName("input")[2].style.borderColor = "#fa755a"

            errorLabel.innerHTML = "All fields are required"
        }
    })
}