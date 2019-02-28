var search
var searchWrapper
var result
window.addEventListener("load", () =>
{
    searchWrapper = document.getElementsByClassName("headbar-searchWrapper")[0]
    search = document.getElementsByClassName("headbar-search-box")[0]
    result = document.getElementsByClassName("headbar-search-result")[0]

    search.addEventListener("focus", () =>
    {
        searchWrapper.style.backgroundColor = "white"

        result.style.display = "block"

        searchWrapper.style.borderTopLeftRadius = "1em"
        searchWrapper.style.borderTopRightRadius = "1em"
        searchWrapper.style.borderBottomLeftRadius = "0"
        searchWrapper.style.borderBottomRightRadius = "0"
    })
    search.addEventListener("focusout", () =>
    {
        searchWrapper.style.backgroundColor = "#32325d"

        searchWrapper.style.borderTopLeftRadius = "10em"
        searchWrapper.style.borderTopRightRadius = "10em"
        searchWrapper.style.borderBottomLeftRadius = "10em"
        searchWrapper.style.borderBottomRightRadius = "10em"

        result.style.display = "none"
    })
    search.addEventListener("keydown", function()
    {
        preformSearch(search.value)
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

    search.placeholder = "Search " + contentPages[select].getAttribute("data-searchlabel")
})

var current = 0
var contentPages = document.getElementsByClassName("content-section")
function switchPage(from, index)
{
    contentPages[from].style.display = "none"
    contentPages[index].style.display = "block"

    if(contentPages[index].getAttribute("data-searchlabel"))
    {
        search.placeholder = "Search " + contentPages[index].getAttribute("data-searchlabel")
    }
    else
    {
        search.placeholder = "Search"
    }
}

function preformSearch(searchContent)
{
    loadDocument("api/search/", null, "?searchdata=" + searchContent, function(success, data, _)
    {
        if(success)
        {
            data = JSON.parse(data)
            if(data)
            {
                if(data["auth_status"] === true)
                {
                    result.innerHTML = ""
                    for (let index = 0; index < data["people"].length; index++) {
                        const element = data["people"][index];

                        var node = document.createElement("div")
                        node.appendChild(document.createTextNode(element))
                        node.className = "headbar-search-result-node"
                        result.appendChild(node)
                    }
                }
            }
        }
    })
}