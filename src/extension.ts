import * as vscode from 'vscode';
import * as getCodeStructure from './getCodeStructure';
import * as catWebview from './webview/webviewHelloWorld';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "codemaps-vscode" is now active!');
	activateCommands(context);
}

/**
 * Activates the commands for the extension.
 * 
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activateCommands(context: vscode.ExtensionContext) {
	/**
	 * Structure to associate each command ID to a function.
	 * @param {string} commandId - The ID of the command.
	 * @param {Function} functionToCall - The function to call when the command is executed.
	*/
	let commandsToLink = {
		/* eslint-disable @typescript-eslint/naming-convention */
		'codemaps-vscode.getCodeStructureOfCurrentFile': getCodeStructure.getCodeStructureOfCurrentFile,
		'catCoding.start': catWebview.catCodingHelloWorld,
		/* eslint-enable @typescript-eslint/naming-convention */
	};

	/**
	 * Registers the commands and adds them to the extension's subscriptions.
	 */
	for (const [commandId, functionToCall] of Object.entries(commandsToLink)) {
		console.log(`commandId: ${commandId}, functionToCall: ${functionToCall}`);
		context.subscriptions.push(vscode.commands.registerCommand(commandId, () => { functionToCall(context); }));
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
