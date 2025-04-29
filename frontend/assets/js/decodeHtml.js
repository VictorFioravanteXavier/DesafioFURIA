export function decodeHTML(htmlString) {
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText || "";
}