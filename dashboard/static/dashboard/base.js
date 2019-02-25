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
})