export function stringToHTMLElement<T>(string: string): T {
    return new DOMParser().parseFromString(string, "text/html").body.firstChild as T;
}
