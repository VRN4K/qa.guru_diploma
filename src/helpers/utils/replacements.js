export function replaceSpecificSymbolsForLink(string) {
    const symbolsForReplace = [' ', '\'', '\"'];
    symbolsForReplace.forEach((element) => string = string.replaceAll(element, '-'));
    return string;
}