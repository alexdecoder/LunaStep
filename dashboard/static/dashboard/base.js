window.addEventListener("load", () =>
{
    var searchWrapper = document.getElementsByClassName("headbar-search")[0]
    var search = document.getElementsByClassName("headbar-search-box")[0]

    search.addEventListener("focus", () =>
    {
        searchWrapper.style.backgroundColor = "white"
        searchWrapper.style.boxShadow = "0 0 5px 3px #32325d" 
    })
    search.addEventListener("focusout", () =>
    {
        searchWrapper.style.backgroundColor = "#32325d"
        searchWrapper.style.boxShadow = "none" 
    })

    var select = 0
    var navbarLinks = document.getElementsByClassName("navbar-node")
    for (let index = 0; index < navbarLinks.length; index++) {
        const element = navbarLinks[index];
        element.addEventListener("click", function()
        {
            navbarLinks[select].style.color = "#6b7c93"

            switchPage(select, index)

            select = index
            element.style.color = "#43458b"
        })
    }
    navbarLinks[select].style.color = "#43458b"
    contentPages[select].style.display = "block"
})

var current = 0
var contentPages = document.getElementsByClassName("content-section")
function switchPage(from, index)
{
    contentPages[from].style.display = "none"
    contentPages[index].style.display = "block"
}