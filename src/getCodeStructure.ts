import * as vscode from 'vscode';

/**
 * Prints in the console the symbols structure of the current active file.
 * @returns nothing
 */
export function getCodeStructureOfCurrentFile(): void {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) {
        console.log("VS Code has no current active editor.");
        return;
    }
    
    showSymbolsOfDocument(activeEditor.document);
}

/**
 * Prints out in the console the structure of all the symbols of a specified document
 * @param document the document for which the symbols must be printed out
 * @returns void
 */
async function showSymbolsOfDocument(document: vscode.TextDocument) {
    let symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', document.uri);
    if (!symbols) {
        vscode.window.showErrorMessage(`Getting structure of the document '${document.fileName}' failed.`);
        return;
    }
    
    console.log(`Info of the document '${document.fileName}':`);
    let moduleSymbolsStructure: SymbolsStructure | undefined = getStructureOfSymbols(symbols);
    console.log(JSON.stringify(moduleSymbolsStructure, null, 4));
}

/**
 * Interface used to have a recursive structure.
 */
interface SymbolsStructure {
    [key: string]: SymbolsStructure | vscode.DocumentSymbol;
}

/**
 * Recursive function that covers all the symbols children in order to get the full structure of the file code.
 * @param symbols The symbols list to cover.
 * @returns a dictionnary that contains all the symbols data, in hierarchy.
 */
function getStructureOfSymbols(symbols: vscode.DocumentSymbol[]): SymbolsStructure | undefined {
    if (!symbols.length) return undefined;
    
    let symbolsStructure: SymbolsStructure = {};
    symbols.forEach((symbol) => {
        let value = getStructureOfSymbols(symbol.children);
        symbolsStructure[symbol.name] = (value === undefined) ? symbol : {"symbol": symbol, "children": value};
    });

    return symbolsStructure;
}