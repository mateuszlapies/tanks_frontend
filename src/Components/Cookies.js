export function GetCookie(name) {
    return document.cookie.split("; ").filter(q => q.split("=")[0] === name);
}
