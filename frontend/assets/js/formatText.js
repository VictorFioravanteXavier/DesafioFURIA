export function formatText(text) {
    text = removeAspas(text);
    text = removeHTML(text)

    return text
}

function removeAspas(text) {
    return text.replace(/```/g, '');
}

function removeHTML(text) {
    return text.replace('html', '')
}