<<<<<<< HEAD
import { IInputs, IOutputs } from "./generated/ManifestTypes";
var sanitizeHtml = require('sanitize-html')

export class SanitizedControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _sanitisedHtml: HTMLDivElement = document.createElement("div");
	private _pureHtml: HTMLDivElement = document.createElement("div");
=======
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import "sanitize-html";
import sanitize = require("sanitize-html");

export class SanitizedControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private divElement: HTMLDivElement = document.createElement("div");
>>>>>>> e1a3b2f56670b651a331485e10b2802d0cc4ef50

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {

		var options = {
			allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
				'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
				'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe'],
			disallowedTagsMode: 'discard',
			allowedAttributes: {
				a: ['href', 'name', 'target'],
				// We don't currently allow img itself by default, but this
				// would make sense if we did. You could add srcset here,
				// and if you do the URL is checked for safety
				img: ['src']
			},
			// Lots of these won't come up by default because we don't allow them
			selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
			// URL schemes we permit
			allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
			allowedSchemesByTag: {},
			allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
			allowProtocolRelative: true
		};

		// Add control initialization code
		this._sanitisedHtml.innerHTML = sanitizeHtml(context.parameters.htmlInput.raw || "", options);
		container.appendChild(this._sanitisedHtml);

		// this._pureHtml.innerHTML = context.parameters.htmlInput.raw || "";
		// container.appendChild(this._pureHtml);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}