import * as vscode from 'vscode';

/* eslint-disable @typescript-eslint/naming-convention */
const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};
/* eslint-enable @typescript-eslint/naming-convention */

export function catCodingHelloWorld(context: vscode.ExtensionContext) {
    // Create and show a new webview
    const panel = vscode.window.createWebviewPanel(
        'catCoding', // Identifies the type of the webview. Used internally
        'Cat Coding', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
    );

    let iteration = 0;
    const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
    };

    // Set initial content
    updateWebview();

    // And schedule updates to the content every second
    const interval = setInterval(updateWebview, 1000);

    panel.onDidDispose(
        () => {
            // When the panel is closed, cancel any future updates to the webview content
            clearInterval(interval);
        },
        null,
        context.subscriptions
    );
}

function getWebviewContent(cat: keyof typeof cats) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
      <img src="${cats[cat]}" width="300" />
  </body>
  </html>`;
}