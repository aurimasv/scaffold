/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2011 Center for History and New Media
                     George Mason University, Fairfax, Virginia, USA
                     http://zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

var Zotero = Components.classes["@zotero.org/Zotero;1"]
				// Currently uses only nsISupports
				//.getService(Components.interfaces.chnmIZoteroService).
				.getService(Components.interfaces.nsISupports)
				.wrappedJSObject;

var Scaffold = new function() {
	this.onLoad = onLoad;
	this.load = load;
	this.save = save;
	this.run = run;
	this.generateTranslatorID = generateTranslatorID;
	this.testTargetRegex = testTargetRegex;
	this.onResize = onResize;
	this.populateTests = populateTests;
	this.saveTests = saveTests;
	this.runSelectedTests = runSelectedTests;
	this.updateSelectedTests = updateSelectedTests;
	this.deleteSelectedTests = deleteSelectedTests;
	this.newTestFromCurrent = newTestFromCurrent;
	this.editImportFromTest = editImportFromTest;

	var _browser, _frames, _document;
	
	var _editors = {};

	var _propertyMap = {
		'textbox-translatorID':'translatorID',
		'textbox-label':'label',
		'textbox-creator':'creator',
		'textbox-target':'target',
		'textbox-minVersion':'minVersion',
		'textbox-maxVersion':'maxVersion',
		'textbox-priority':'priority'
	};

	var _FW = '/* FW LINE 57:6869c32952b1 */ function flatten(c){var b=new Array();for(var d in c){var e=c[d];if(e instanceof Array){b=b.concat(flatten(e))}else{b.push(e)}}return b}var FW={_scrapers:new Array()};FW._Base=function(){this.callHook=function(b,c,e,a){if(typeof this["hooks"]==="object"){var d=this["hooks"][b];if(typeof d==="function"){d(c,e,a)}}};this.evaluateThing=function(f,e,c){var b=typeof f;if(b==="object"){if(f instanceof Array){var d=this.evaluateThing;var a=f.map(function(g){return d(g,e,c)});return flatten(a)}else{return f.evaluate(e,c)}}else{if(b==="function"){return f(e,c)}else{return f}}}};FW.Scraper=function(a){FW._scrapers.push(new FW._Scraper(a))};FW._Scraper=function(a){for(x in a){this[x]=a[x]}this._singleFieldNames=["abstractNote","applicationNumber","archive","archiveLocation","artworkMedium","artworkSize","assignee","audioFileType","audioRecordingType","billNumber","blogTitle","bookTitle","callNumber","caseName","code","codeNumber","codePages","codeVolume","committee","company","conferenceName","country","court","date","dateDecided","dateEnacted","dictionaryTitle","distributor","docketNumber","documentNumber","DOI","edition","encyclopediaTitle","episodeNumber","extra","filingDate","firstPage","forumTitle","genre","history","institution","interviewMedium","ISBN","ISSN","issue","issueDate","issuingAuthority","journalAbbreviation","label","language","legalStatus","legislativeBody","letterType","libraryCatalog","manuscriptType","mapType","medium","meetingName","nameOfAct","network","number","numberOfVolumes","numPages","pages","patentNumber","place","postType","presentationType","priorityNumbers","proceedingsTitle","programTitle","programmingLanguage","publicLawNumber","publicationTitle","publisher","references","reportNumber","reportType","reporter","reporterVolume","rights","runningTime","scale","section","series","seriesNumber","seriesText","seriesTitle","session","shortTitle","studio","subject","system","thesisType","title","type","university","url","version","videoRecordingType","volume","websiteTitle","websiteType"];this._makeAttachments=function(p,b,g,t){if(g instanceof Array){g.forEach(function(k){this._makeAttachments(p,b,k,t)},this)}else{if(typeof g==="object"){var o=g.urls||g.url;var m=g.types||g.type;var f=g.titles||g.title;var q=g.snapshots||g.snapshot;var j=this.evaluateThing(o,p,b);var n=this.evaluateThing(f,p,b);var s=this.evaluateThing(m,p,b);var d=this.evaluateThing(q,p,b);if(!(j instanceof Array)){j=[j]}for(var l in j){var c=j[l];var h;var e;var r;if(s instanceof Array){h=s[l]}else{h=s}if(n instanceof Array){e=n[l]}else{e=n}if(d instanceof Array){r=d[l]}else{r=d}t.attachments.push({url:c,title:e,type:h,snapshot:r})}}}};if(this.itemTrans!==undefined){this.makeItems=this.itemTrans.makeItems}else{this.makeItems=function(o,b,m,c,l){var q=new Zotero.Item(this.itemType);q.url=b;for(var h in this._singleFieldNames){var n=this._singleFieldNames[h];if(this[n]){var g=this.evaluateThing(this[n],o,b);if(g instanceof Array){q[n]=g[0]}else{q[n]=g}}}var r=["creators","tags"];for(var f in r){var p=r[f];var d=this.evaluateThing(this[p],o,b);if(d){for(var e in d){q[p].push(d[e])}}}this._makeAttachments(o,b,this["attachments"],q);c(q,this,o,b);l([q])}}};FW._Scraper.prototype=new FW._Base;FW.MultiScraper=function(a){FW._scrapers.push(new FW._MultiScraper(a))};FW._MultiScraper=function(a){for(x in a){this[x]=a[x]}this._mkSelectItems=function(e,d){var b=new Object;for(var c in e){b[d[c]]=e[c]}return b};this._selectItems=function(d,c,e){var b=new Array();Zotero.selectItems(this._mkSelectItems(d,c),function(f){for(var g in f){b.push(g)}e(b)})};this._mkAttachments=function(g,d,f){var b=this.evaluateThing(this["attachments"],g,d);var c=new Object();if(b){for(var e in f){c[f[e]]=b[e]}}return c};this._makeChoices=function(f,p,c,d,h){if(f instanceof Array){f.forEach(function(k){this._makeTitlesUrls(k,p,c,d,h)},this)}else{if(typeof f==="object"){var m=f.urls||f.url;var e=f.titles||f.title;var n=this.evaluateThing(m,p,c);var j=this.evaluateThing(e,p,c);var l=(j instanceof Array);if(!(n instanceof Array)){n=[n]}for(var g in n){var b=n[g];var o;if(l){o=j[g]}else{o=j}h.push(b);d.push(o)}}}};this.makeItems=function(j,b,g,c,f){if(this.beforeFilter){var k=this.beforeFilter(j,b);if(k!=b){this.makeItems(j,k,g,c,f);return}}var e=[];var h=[];this._makeChoices(this["choices"],j,b,e,h);var d=this._mkAttachments(j,b,h);this._selectItems(e,h,function(m){if(!m){f([])}else{var l=[];var n=this.itemTrans;Zotero.Utilities.processDocuments(m,function(q){var p=q.documentURI;var o=n;if(o===undefined){o=FW.getScraper(q,p)}if(o===undefined){}else{o.makeItems(q,p,d[p],function(r){l.push(r);c(r,o,q,p)},function(){})}},function(){f(l)})}})}};FW._MultiScraper.prototype=new FW._Base;FW.DelegateTranslator=function(a){return new FW._DelegateTranslator(a)};FW._DelegateTranslator=function(a){for(x in a){this[x]=a[x]}this._translator=Zotero.loadTranslator(this.translatorType);this._translator.setTranslator(this.translatorId);this.makeItems=function(g,d,b,f,c){var e;Zotero.Utilities.HTTP.doGet(d,function(h){this._translator.setHandler("itemDone",function(k,j){e=j;if(b){j.attachments=b}});if(this.preProcess){h=this.preProcess(h)}this._translator.setString(h);this._translator.translate();f(e)},function(){c([e])})}};FW.DelegateTranslator.prototype=new FW._Scraper;FW._StringMagic=function(){this._filters=new Array();this.addFilter=function(a){this._filters.push(a);return this};this.split=function(a){return this.addFilter(function(b){return b.split(a).filter(function(c){return(c!="")})})};this.replace=function(c,b,a){return this.addFilter(function(d){if(d.match(c)){return d.replace(c,b,a)}else{return d}})};this.prepend=function(a){return this.replace(/^/,a)};this.append=function(a){return this.replace(/$/,a)};this.remove=function(b,a){return this.replace(b,"",a)};this.trim=function(){return this.addFilter(function(a){return Zotero.Utilities.trim(a)})};this.trimInternal=function(){return this.addFilter(function(a){return Zotero.Utilities.trimInternal(a)})};this.match=function(a,b){if(!b){b=0}return this.addFilter(function(d){var c=d.match(a);if(c===undefined||c===null){return undefined}else{return c[b]}})};this.cleanAuthor=function(b,a){return this.addFilter(function(c){return Zotero.Utilities.cleanAuthor(c,b,a)})};this.key=function(a){return this.addFilter(function(b){return b[a]})};this.capitalizeTitle=function(){if(arguments.length>0&&arguments[0]==true){return this.addFilter(function(a){return Zotero.Utilities.capitalizeTitle(a,true)})}else{return this.addFilter(function(a){return Zotero.Utilities.capitalizeTitle(a)})}};this.unescapeHTML=function(){return this.addFilter(function(a){return Zotero.Utilities.unescapeHTML(a)})};this.unescape=function(){return this.addFilter(function(a){return unescape(a)})};this._applyFilters=function(c,e){for(i in this._filters){c=flatten(c);c=c.filter(function(a){return((a!==undefined)&&(a!==null))});for(var d=0;d<c.length;d++){try{if((c[d]===undefined)||(c[d]===null)){continue}else{c[d]=this._filters[i](c[d],e)}}catch(b){c[d]=undefined;Zotero.debug("Caught exception "+b+"on filter: "+this._filters[i])}}c=c.filter(function(a){return((a!==undefined)&&(a!==null))})}return flatten(c)}};FW.PageText=function(){return new FW._PageText()};FW._PageText=function(){this._filters=new Array();this.evaluate=function(c){var b=[c.documentElement.innerHTML];b=this._applyFilters(b,c);if(b.length==0){return false}else{return b}}};FW._PageText.prototype=new FW._StringMagic();FW.Url=function(){return new FW._Url()};FW._Url=function(){this._filters=new Array();this.evaluate=function(d,c){var b=[c];b=this._applyFilters(b,d);if(b.length==0){return false}else{return b}}};FW._Url.prototype=new FW._StringMagic();FW.Xpath=function(a){return new FW._Xpath(a)};FW._Xpath=function(a){this._xpath=a;this._filters=new Array();this.text=function(){var b=function(c){if(typeof c==="object"&&c.textContent){return c.textContent}else{return c}};this.addFilter(b);return this};this.sub=function(b){var c=function(f,e){var d=e.evaluate(b,f,null,XPathResult.ANY_TYPE,null);if(d){return d.iterateNext()}else{return undefined}};this.addFilter(c);return this};this.evaluate=function(f){var e=f.evaluate(this._xpath,f,null,XPathResult.ANY_TYPE,null);var d=e.resultType;var c=new Array();if(d==XPathResult.STRING_TYPE){c.push(e.stringValue)}else{if(d==XPathResult.ORDERED_NODE_ITERATOR_TYPE||d==XPathResult.UNORDERED_NODE_ITERATOR_TYPE){var b;while((b=e.iterateNext())){c.push(b)}}}c=this._applyFilters(c,f);if(c.length==0){return false}else{return c}}};FW._Xpath.prototype=new FW._StringMagic();FW.detectWeb=function(e,b){for(var c in FW._scrapers){var d=FW._scrapers[c];var f=d.evaluateThing(d.itemType,e,b);var a=d.evaluateThing(d.detect,e,b);if(a.length>0&&a[0]){return f}}return undefined};FW.getScraper=function(b,a){var c=FW.detectWeb(b,a);return FW._scrapers.filter(function(d){return(d.evaluateThing(d.itemType,b,a)==c)&&(d.evaluateThing(d.detect,b,a))})[0]};FW.doWeb=function(c,a){var b=FW.getScraper(c,a);b.makeItems(c,a,[],function(f,e,g,d){e.callHook("scraperDone",f,g,d);if(!f.title){f.title=""}f.complete()},function(){Zotero.done()});Zotero.wait()};';

	function onLoad(e) {
		if(e.target !== document) return;
		_document = document;

		_browser = Components.classes["@mozilla.org/appshell/window-mediator;1"]
						   .getService(Components.interfaces.nsIWindowMediator)
						   .getMostRecentWindow("navigator:browser");

		_browser.document.getElementById("content").tabContainer.addEventListener("TabSelect",
			_updateFrames, true);
		_browser.document.getElementById("appcontent").addEventListener("pageshow",
			_updateFrames, true);
		_updateFrames();
		
		var importWin = document.getElementById("editor-import").contentWindow;
		var codeWin = document.getElementById("editor-code").contentWindow;
		var testsWin = document.getElementById("editor-tests").contentWindow;
		
		_editors["import"] = importWin.editor;
		_editors["code"] = codeWin.editor;
		_editors["tests"] = testsWin.editor;

		_editors["code"].getSession().setUseWorker(false);
		_editors["code"].getSession().setMode(new codeWin.JavaScriptMode);
		_editors["code"].getSession().setUseSoftTabs(false);

		_editors["tests"].getSession().setUseWorker(false);
		_editors["tests"].getSession().setMode(new testsWin.JavaScriptMode);
		_editors["tests"].getSession().setUseSoftTabs(false);
		
		_editors["import"].getSession().setMode(new importWin.TextMode);

		// Set resize handler
		_document.addEventListener("resize", this.onResize, false);
		
		// Boilerplate for framework translators
		document.getElementById('checkbox-framework').addEventListener("command",
			function() {
				var usesFW = document.getElementById('checkbox-framework').checked;
				/* Code to set compat for framework translators
				if (!usesFW) {
					for each(var browser in ["gecko", "chrome", "safari"]) {
						document.getElementById('checkbox-'+browser).checked = true;
					}
				*/
				
				// If code hasn't been added, put the boilerplate in
				// We could be fancy here and see if detectWeb / doWeb are set
				if (usesFW && _editors["code"].getSession().getValue().trim() == "")
					_editors["code"].getSession().setValue("function detectWeb(doc, url) { return FW.detectWeb(doc, url); }\nfunction doWeb(doc, url) { return FW.doWeb(doc, url); }");
			}, true);
		
		// Disable editing if external editor is enabled, enable when it is disabled
		document.getElementById('checkbox-editor-external').addEventListener("command",
			function() {
				var external = document.getElementById('checkbox-editor-external').checked;
				_editors["code"].setReadOnly(external);
				_editors["tests"].setReadOnly(external);
			}, true);

		generateTranslatorID();
	}

	function onResize() {
		// We try to let ACE resize itself
		_editors["import"].resize();
		_editors["code"].resize();
		_editors["tests"].resize();

		return true;
	}

	/*
	 * load translator from database
	 */
	function load(translatorID) {
		var translator = false;
		if (translatorID === undefined) {
			var io = new Object();
			io.dataIn = _getDocument().location.href;
			window.openDialog("chrome://scaffold/content/load.xul",
				"_blank","chrome,modal", io);
			translator = io.dataOut;
		} else {
			translator = Zotero.Translators.get(translatorID);
		}

		// No translator was selected in the dialog.
		if (!translator) return false;

		for(var id in _propertyMap) {
			document.getElementById(id).value = translator[_propertyMap[id]];
		}

		//Strip JSON metadata
		var lastUpdatedIndex = translator.code.indexOf('"lastUpdated"');
		var header = translator.code.substr(0, lastUpdatedIndex + 50);
		var m = /^\s*{[\S\s]*?}\s*?[\r\n]+/.exec(header);
		// Detect the minified framework and strip it
		var usesFW = (translator.code.substr(m[0].length).indexOf("/* FW LINE ") !== -1);
		if(usesFW) var fixedCode = translator.code
						.substr(m[0].length)
						.replace(/\/\* FW LINE [^\n]*\n/,'');
		else var fixedCode = translator.code.substr(m[0].length);
		// load tests into test editing pane, but clear it first
		_editors["tests"].getSession().setValue('');
		_loadTests(fixedCode);
		// and remove them from the translator code
		var testStart = fixedCode.indexOf("/** BEGIN TEST CASES **/");
		var testEnd   = fixedCode.indexOf("/** END TEST CASES **/");
		if (testStart !== -1 && testEnd !== -1)
			fixedCode = fixedCode.substr(0,testStart) + fixedCode.substr(testEnd+23);
		
		// Set up the test running pane
		populateTests();

		// Convert whitespace to tabs
		_editors["code"].getSession().setValue(normalizeWhitespace(fixedCode));
		// Then go to line 1
		_editors["code"].gotoLine(1);
		
		document.getElementById('checkbox-framework').checked = usesFW;
		
		// Reset configOptions and displayOptions before loading
		document.getElementById('textbox-configOptions').value = '';
		document.getElementById('textbox-displayOptions').value = '';

		var configOptions, displayOptions;
		if(translator.configOptions) {
		    configOptions = JSON.stringify(translator.configOptions);
		} 
		if(configOptions != '{}') {
		    document.getElementById('textbox-configOptions').value = configOptions;
		}
		if(translator.displayOptions) {
		    displayOptions = JSON.stringify(translator.displayOptions);
		}
		if(displayOptions != '{}') {
		    document.getElementById('textbox-displayOptions').value = displayOptions;
		}

		// get translator type; might as well have some fun here
		var type = translator.translatorType;
		var types = ["import", "export", "web", "search"];
		for(var i=2; i<=16; i*=2) {
			var mod = type % i;
			document.getElementById('checkbox-'+types.shift()).checked = !!mod;
			if(mod) type -= mod;
		}
		
		// get browser support
		var browserSupport = translator.browserSupport;
		if(!browserSupport) browserSupport = "g";
		const browsers = {gecko:"g", chrome:"c", safari:"s", ie:"i", bookmarklet:"b", server:"v"};
		for (var browser in browsers) {
			document.getElementById('checkbox-'+browser).checked = browserSupport.indexOf(browsers[browser]) !== -1;
		}

	}

	function _getMetadataObject() {
		var metadata = {
			translatorID: document.getElementById('textbox-translatorID').value,
			label: document.getElementById('textbox-label').value,
			creator: document.getElementById('textbox-creator').value,
			target: document.getElementById('textbox-target').value,
			minVersion: document.getElementById('textbox-minVersion').value,
			maxVersion: document.getElementById('textbox-maxVersion').value,
			priority: parseInt(document.getElementById('textbox-priority').value)
		};

		if(document.getElementById('textbox-configOptions').value != '') {
		    metadata.configOptions = JSON.parse(document.getElementById('textbox-configOptions').value);
		}
		if(document.getElementById('textbox-displayOptions').value != '') {
		    metadata.displayOptions = JSON.parse(document.getElementById('textbox-displayOptions').value);
		}

		// no option for this
		metadata.inRepository = true;

		metadata.translatorType = 0;
		if(document.getElementById('checkbox-import').checked) {
			metadata.translatorType += 1;
		}
		if(document.getElementById('checkbox-export').checked) {
			metadata.translatorType += 2;
		}
		if(document.getElementById('checkbox-web').checked) {
			metadata.translatorType += 4;
		}
		if(document.getElementById('checkbox-search').checked) {
			metadata.translatorType += 8;
		}
		
		metadata.browserSupport = "";
		if(document.getElementById('checkbox-gecko').checked) {
			metadata.browserSupport += "g";
		}
		if(document.getElementById('checkbox-chrome').checked) {
			metadata.browserSupport += "c";
		}
		if(document.getElementById('checkbox-safari').checked) {
			metadata.browserSupport += "s";
		}
		if(document.getElementById('checkbox-ie').checked) {
			metadata.browserSupport += "i";
		}
		if(document.getElementById('checkbox-bookmarklet').checked) {
			metadata.browserSupport += "b";
		}
		if(document.getElementById('checkbox-server').checked) {
			metadata.browserSupport += "v";
		}

		var date = new Date();
		metadata.lastUpdated = date.getUTCFullYear()
			+"-"+Zotero.Utilities.lpad(date.getUTCMonth()+1, '0', 2)
			+"-"+Zotero.Utilities.lpad(date.getUTCDate(), '0', 2)
			+" "+Zotero.Utilities.lpad(date.getUTCHours(), '0', 2)
			+":"+Zotero.Utilities.lpad(date.getUTCMinutes(), '0', 2)
			+":"+Zotero.Utilities.lpad(date.getUTCSeconds(), '0', 2);

		return metadata;
	}

	/*
	 * save translator to database
	 */
	function save() {
		var code = _editors["code"].getSession().getValue();
		var tests = _editors["tests"].getSession().getValue();
		code += tests;

		if(document.getElementById('checkbox-framework').checked) {
			code = _FW + '\n' + code;
		}

		var metadata = _getMetadataObject();
		if (metadata.label === "Untitled") {
			_logOutput("Can't save an untitled translator.");
			return;
		}

		Zotero.Translators.save(metadata,code);
		Zotero.Translators.init();
	}

	/*
	 * run translator
	 */
	function run(functionToRun) {
		if (document.getElementById('textbox-label').value == 'Untitled') {
			alert("Translator title not set");
			return;
		}

		_clearOutput();

		if(document.getElementById('checkbox-editor-external').checked) {
			// We don't save the translator-- we reload it instead
			var translatorID = document.getElementById('textbox-translatorID').value;
			load(translatorID);
		} else {
			save();
		}
		
		if (functionToRun == "detectWeb" || functionToRun == "doWeb") {
			_run(functionToRun, _getDocument(), _selectItems, _myItemDone, _translators, function(){});
		} else if (functionToRun == "detectImport" || functionToRun == "doImport") {
			_run(functionToRun, _getImport(), _selectItems, _myItemDone, _translatorsImport, function(){});
		}
	}

	/*
	 * run translator in given mode with given input
	 */
	function _run(functionToRun, input, selectItems, itemDone, detectHandler, done) {
		if (functionToRun == "detectWeb" || functionToRun == "doWeb") {
			var translate = new Zotero.Translate.Web();
			var utilities = new Zotero.Utilities.Translate(translate);
			// If this is a string, assume it's a URL
			if (typeof input == 'string') {
					try {
						var doc = utilities.retrieveDocument(input);
					} catch (e) {
						// Time's up!
						_logOutput("retrieveDocument timed out");
						return false;
					}
				translate.setDocument(doc);
			} else { 
				translate.setDocument(input);
			}
		} else if (functionToRun == "detectImport" || functionToRun == "doImport") {
			var translate = new Zotero.Translate.Import();
			translate.setString(input);
		}
		translate.setHandler("error", _error);
		translate.setHandler("debug", _debug);
		translate.setHandler("done", done);
		
		if (functionToRun == "detectWeb") {
			// get translator
			var translator = _getTranslator();
			// don't let target prevent translator from operating
			translator.target = null;
			// generate sandbox
			translate.setHandler("translators", detectHandler);
			// internal hack to call detect on this translator
			translate._potentialTranslators = [translator];
			translate._foundTranslators = [];
			translate._currentState = "detect";
			translate._detect();
		} else if (functionToRun == "doWeb") {
			// get translator
			var translator = _getTranslator();
			// don't let the detectCode prevent the translator from operating
			translator.detectCode = null;
			translate.setTranslator(translator);
			translate.setHandler("select", selectItems);
			translate.clearHandlers("itemDone");
			translate.setHandler("itemDone", itemDone);
			// disable output to database
			translate.translate(false);
		} else if (functionToRun == "detectImport") {
			// get translator
			var translator = _getTranslator();
			// don't let target prevent translator from operating
			translator.target = null;
			// generate sandbox
			translate.setHandler("translators", detectHandler);
			// internal hack to call detect on this translator
			translate._potentialTranslators = [translator];
			translate._foundTranslators = [];
			translate._currentState = "detect";
			translate._detect();
		} else if (functionToRun == "doImport") {
			// get translator
			var translator = _getTranslator();
			// don't let the detectCode prevent the translator from operating
			translator.detectCode = null;
			translate.setTranslator(translator);
			translate.clearHandlers("itemDone");
			translate.clearHandlers("collectionDone");
			translate.setHandler("itemDone", itemDone);
			translate.setHandler("collectionDone", function(obj, collection) {
				_logOutput("Collection: "+ collection.name + ", "+collection.children.length+" items");
			});
			// disable output to database
			translate.translate(false);
		}
	}

	/*
	 * generate translator GUID
	 */
	function generateTranslatorID() {
		document.getElementById("textbox-translatorID").value = _generateGUID();
	}

	/*
	 * test target regular expression against document URL
	 */
	function testTargetRegex() {
		var testDoc = _getDocument();
		var url = Zotero.Proxies.proxyToProper(testDoc.location.href);

		try {
			var targetRe = new RegExp(document.getElementById('textbox-target').value, "i");
		} catch(e) {
			_logOutput("Regex parse error:\n"+JSON.stringify(e, null, "\t"));
		}

		_logOutput(targetRe.test(url));
	}

	/*
	 * called to select items
	 */
	function _selectItems(obj, itemList) {
		var io = { dataIn:itemList, dataOut:null }
		var newDialog = window.openDialog("chrome://zotero/content/ingester/selectitems.xul",
			"_blank","chrome,modal,centerscreen,resizable=yes", io);

		return io.dataOut;
	}

	/*
	 * called if an error occurs
	 */
	function _error(obj, error) {
		if(error && error.lineNumber &&
				error.fileName == obj.translator[0].label ) {
			_editors["code"].gotoLine(error.lineNumber-2);	// subtract two lines for metadata and FW
		}
	}

	/*
	 * logs translator output (instead of logging in the console)
	 */
	function _debug(obj, string) {
		_logOutput(string);
	}

	/*
	 * logs item output
	 */
	function _myItemDone(obj, item) {
		Zotero.debug("Item returned");
		
		item = _sanitizeItem(item);

		_logOutput("Returned item:\n"+Zotero_TranslatorTester._generateDiff(item, Zotero_TranslatorTester._sanitizeItem(item, true)));
	}

	/*
	 * prints information from detectCode to window
	 */
	 function _translators(obj, translators) {
	 	if(translators && translators.length != 0) {
			_logOutput('detectWeb returned type "'+translators[0].itemType+'"');
	 	} else {
			_logOutput('detectWeb did not match');
		}
			
	 }

	/*
	 * prints information from detectCode to window, for import
	 */
	 function _translatorsImport(obj, translators) {
	 	if(translators && translators.length != 0 && translators[0].itemType) {
			_logOutput('detectImport matched');
	 	} else {
			_logOutput('detectImport did not match');
		}
	 }

	/*
	 * logs debug info (instead of console)
	 */
	function _logOutput(string) {
		var date = new Date();
		var output = document.getElementById('output');

		// use JSON.stringify on non-strings
		if(typeof string != "string") {
			string = JSON.stringify(string, null, "\t");
		}

		if(output.value) output.value += "\n";
		output.value += Zotero.Utilities.lpad(date.getHours(), '0', 2)
				+":"+Zotero.Utilities.lpad(date.getMinutes(), '0', 2)
				+":"+Zotero.Utilities.lpad(date.getSeconds(), '0', 2)
				+" "+string.replace(/\n/g, "\n         ");
		// move to end
		output.inputField.scrollTop = output.inputField.scrollHeight;
	}

	/*
	 * gets import text for import translator
	 */
	function _getImport() {
		var text = _editors["import"].getSession().getValue();
		return text;
	}

	/*
	 * transfers metadata to the translator object
	 * Replicated from translator.js
	 */
	function _metaToTranslator(translator, metadata) {
		for each(var p in ["translatorID", "translatorType", "label", "creator", "target",
			"minVersion", "maxVersion", "priority", "lastUpdated", "inRepository", "configOptions",
			"displayOptions", "browserSupport"]) {
			translator[p] = metadata[p];
		}
		
		// Compile regexp for web translators
		if ((translator.translatorType & 4) && translator.target) {
			try {
				translator.webRegexp = new RegExp(translator.target, "i");
			} catch(e) {
				_logOutput("Could not compile target regexp: " + e);
			}
		}

		if(!translator.configOptions) translator.configOptions = {};
		if(!translator.displayOptions) translator.displayOptions = {};
		if(!translator.browserSupport) translator.browserSupport = "g";
	}

	/*
	 * gets translator data from the metadata pane
	 */
	function _getTranslator() {
		//create a barebones translator
		var translator = new Object();
		var metadata = _getMetadataObject();

		//copy metadata into the translator object
		_metaToTranslator(translator, metadata);

		var locFW = document.getElementById('checkbox-framework').checked ? _FW + "\n" : "\n";
		metadata = JSON.stringify(metadata) + ";\n";

		translator.code = metadata + locFW + _editors["code"].getSession().getValue();

		// make sure translator gets run in browser in Zotero >2.1
		if(Zotero.Translator.RUN_MODE_IN_BROWSER) {
			translator.runMode = Zotero.Translator.RUN_MODE_IN_BROWSER;
		}

		return translator;
	}

	/*
	 * loads the translator's tests from the pane
	 */
	function _loadTests(code) {
		var testStart = code.indexOf("/** BEGIN TEST CASES **/");
		var testEnd   = code.indexOf("/** END TEST CASES **/"); 
		if (testStart !== -1 && testEnd !== -1) {
			test = code.substring(testStart + 24, testEnd);
			test = test.replace(/var testCases = /,'');
			// The JSON parser doesn't like final semicolons
			if (test.lastIndexOf(';') == (test.length-1))
				test = test.slice(0,-1);
			try {
				var testObject = JSON.parse(test);
				_writeTests(JSON.stringify(testObject, null, "\t")); // Don't modify current tests
				return testObject;
			} catch (e) {
				_logOutput("Exception parsing JSON");
				return false;
			}
		} else {
			return false;
		}
	}

	/*
	 * writes tests back into the translator
	 */
	function _writeTests(testString) {
		var code = "/** BEGIN TEST CASES **/\nvar testCases = "
				+ testString + "\n/** END TEST CASES **/";
		_editors["tests"].getSession().setValue(code);
	}
	
	/* clear tests pane */
	function _clearTests() {
		var listbox = document.getElementById("testing-listbox");
		var count = listbox.itemCount;
		while(count-- > 0){
			listbox.removeItemAt(0);
		}
	}

	/* turns an item into a test-safe item
	 * does not check if all fields are valid
	 */
	function _sanitizeItem(item) {
		// Clear attachment document objects
		if (item && item.attachments && item.attachments.length) {
			for (var i=0; i<item.attachments.length; i++) {
				if (item.attachments[i].document)
					item.attachments[i].document = "[object]";
			}
		}
		return item;
	}
	
	/* sanitizes all items in a test
	 */
	function _sanitizeItemsInTest(test) {
		if(test.items && typeof test.items != 'string' && test.items.length) {
			for(var i=0, n=test.items.length; i<n; i++) {
				test.items[i] = Zotero_TranslatorTester._sanitizeItem(test.items[i]);
			}
		}
		return test;
	}
	
	/* stringifies an array of tests
	 * Output is the same as JSON.stringify (with pretty print), except that
	 * Zotero.Item objects are stringified in a deterministic manner (mostly):
	 *   * Certain important fields are placed at the top of the object
	 *   * Certain less-frequently used fields are placed at the bottom
	 *   * Remaining fields are sorted alphabetically
	 *   * tags are always sorted alphabetically
	 *   * Some fields, like those inside creator objects, notes, etc. are not sorted
	 */
	function _stringifyTests(value, level) {
		if(!level) level = 0;
		
		if(typeof(value) == 'function' || typeof(value) == 'undefined' || value === null) {
			return level ? undefined : '';
		}
		
		if(typeof(value) !== 'object') return JSON.stringify(value, null, "\t");
		
		if(value instanceof Array) {
			let str = '[';
			for(let i=0; i<value.length; i++) {
				let val = _stringifyTests(value[i], level+1);
				
				if(val === undefined) val = 'undefined';
				else val = val.replace(/\n/g, "\n\t"); // Indent
				
				str += (i?',':'') + "\n\t" + val;
			}
			return str + (str.length > 1 ? "\n]" : ']');
		}
		
		if(!value.itemType) {
			// Not a Zotero.Item object
			var str = '{';
			for(let i in value) {
				let val = _stringifyTests(value[i], level+1);
				if(val === undefined) continue;
				
				val = val.replace(/\n/g, "\n\t");
				str += (str.length > 1 ? ',':'') + "\n\t" + JSON.stringify(''+i) + ': ' + val;
			}
			return str + (str.length > 1 ? "\n}" : '}');
		}
		
		// Zotero.Item object
		const topFields = ['itemType', 'title', 'caseName', 'nameOfAct', 'subject',
			'creators', 'date', 'dateDecided', 'issueDate', 'dateEnacted'];
		const bottomFields = ['attachments', 'tags', 'notes', 'seeAlso'];
		let otherFields = Object.keys(value);
		let presetFields = topFields.concat(bottomFields);
		for(let i=0; i<presetFields.length; i++) {
			let j = otherFields.indexOf(presetFields[i]);
			if(j == -1) continue;
			
			otherFields.splice(j, 1);
		}
		let fields = topFields.concat(otherFields.sort()).concat(bottomFields);
		
		let str = '{';
		for(let i=0; i<fields.length; i++) {
			let rawVal = value[fields[i]];
			if(!rawVal) continue;
			
			let val;
			if(fields[i] == 'tags') {
				val = _stringifyTests(rawVal.sort(), level+1);
			} else {
				val = _stringifyTests(rawVal, level+1);
			}
			
			if(val === undefined) continue;
			
			val = val.replace(/\n/g, "\n\t");
			str += (str.length > 1 ? ',':'') + "\n\t" + JSON.stringify(fields[i]) + ': ' + val;
		}
		
		return str + "\n}";
	}
	
	/*
	 * adds a new test from the current input/translator
	 * web or import only for now
	 */
	function newTestFromCurrent(type) {
		_clearOutput();
		var input, label;
		if (type == "web" && !document.getElementById('checkbox-web').checked) {
			_logOutput("Current translator isn't a web translator");
			return false;
		} else if (type == "import" && !document.getElementById('checkbox-import').checked) {
			_logOutput("Current translator isn't an import translator");
			return false;
		}

		if (type == "web") {
			input = _getDocument();
			label = Zotero.Proxies.proxyToProper(input.location.href);
		} else if (type == "import") {
			input = _getImport();
			label = input;
		} else {
			return false;
		}

		var listbox = document.getElementById("testing-listbox");
		var listitem = document.createElement("listitem");
		var listcell = document.createElement("listcell");
		listcell.setAttribute("label", label);
		listitem.appendChild(listcell);
		listcell = document.createElement("listcell");
		listcell.setAttribute("label", "Creating...");
		listitem.appendChild(listcell);
		listbox.appendChild(listitem);

		if (type == "web") {
			// Creates the test. The test isn't saved yet!
			var tester = new Zotero_TranslatorTester(_getTranslator(), type, _debug);
			tester.newTest(input, function (obj, newTest) { // "done" handler for do
				if(newTest) {
					listcell.setAttribute("label", "New unsaved test");
					listitem.setUserData("test-string", JSON.stringify(_sanitizeItemsInTest(newTest)), null);
				} else {
					listcell.setAttribute("label", "Creation failed");
				}
			});
		}

		if (type == "import") {
			var test = {"type" : "import", "input" : input, "items" : []};

			// Creates the test. The test isn't saved yet!
			// TranslatorTester doesn't handle these correctly, so we do it manually
			_run("doImport", input, null, function(obj, item) {
				if(item) {
					test.items.push(Zotero_TranslatorTester._sanitizeItem(item));
				} 
			}, null, function(){
					listcell.setAttribute("label", "New unsaved test");
					listitem.setUserData("test-string", JSON.stringify(test), null);
			});
		}
	}

	/*
	 * populate tests pane
	 */
	function populateTests() {
		_clearTests();
		var tests = _loadTests(_editors["tests"].getSession().getValue());
		// We've got tests, let's display them
		var listbox = document.getElementById("testing-listbox");
		for each (var test in tests) {
			var listitem = document.createElement("listitem");
			var listcell = document.createElement("listcell");
			if (test.type == "web")
				listcell.setAttribute("label", test.url);
			else if (test.type == "import")
				// trim label to improve performance
				listcell.setAttribute("label", test.input.substr(0,80));
			else continue; // unknown test type
			listitem.appendChild(listcell);
			listcell = document.createElement("listcell");
			listcell.setAttribute("label", "Not run");
			listitem.appendChild(listcell);
			// Put the serialized JSON in user data
			listitem.setUserData("test-string", JSON.stringify(test), null);
			listbox.appendChild(listitem);
		}
	}

	
	/*
	 * Save tests back to translator, and save the translator
	 */
	function saveTests() {
		var tests = [];
		var item;
		var i = 0;
		var listbox = document.getElementById("testing-listbox");
		var count = listbox.itemCount;
		while(i < count){
			item = listbox.getItemAtIndex(i);
			if(item.getElementsByTagName("listcell")[1].getAttribute("label") === "New unsaved test") {
				item.getElementsByTagName("listcell")[1].setAttribute("label", "New test");
			}
			var test = item.getUserData("test-string");
			if(test) tests.push(JSON.parse(test));
			i++;
		}
		_writeTests(_stringifyTests(tests));
		save();
	}

	/*
	 * Delete selected test(s), from UI
	 */
	function deleteSelectedTests() {
		var listbox = document.getElementById("testing-listbox");
		var count = listbox.selectedCount;
		while (count--) {
			var item = listbox.selectedItems[0];
			listbox.removeItemAt(listbox.getIndexOfItem(item));
		}
	}

	/*
	 * Load the import input for the first selected test in the import pane,
	 * from the UI.
	 */	
	function editImportFromTest() {
		var listbox = document.getElementById("testing-listbox");
		var item = listbox.selectedItems[0];
		var test = JSON.parse(item.getUserData("test-string"));
		if (test.input === undefined) {
			_logOutput("Can't edit import data for a non-import test.");
		}
		_editors["import"].getSession().setValue(test.input);
	}
	
	/*
	 * Run selected test(s)
	 */
	function runSelectedTests() {
		_clearOutput();
		
		var listbox = document.getElementById("testing-listbox");
		var items = listbox.selectedItems;
		if(!items || items.length == 0) return false; // No action if nothing selected
		var i;
		var webtests = [];
		var importtests = [];
		for (i in items) {
			items[i].getElementsByTagName("listcell")[1].setAttribute("label", "Running");
			var test = JSON.parse(items[i].getUserData("test-string"));
			test["ui-item"] = items[i];
			if (test.type == "web") webtests.push(test);
			if (test.type == "import") importtests.push(test);
		}
		
		if (webtests.length > 0) {
			var webtester = new Zotero_TranslatorTester(_getTranslator(), "web", _debug);
			webtester.setTests(webtests);
			webtester.runTests(function(obj, test, status, message) {
				test["ui-item"].getElementsByTagName("listcell")[1].setAttribute("label", message);
			});
		}
		
		if (importtests.length > 0 ) {
			var importtester = new Zotero_TranslatorTester(_getTranslator(), "import", _debug);
			importtester.setTests(importtests);
			importtester.runTests(function(obj, test, status, message) {
				test["ui-item"].getElementsByTagName("listcell")[1].setAttribute("label", message);
			});
		}
	}
	
	/*
	 * Update selected test(s)
	 */
	function updateSelectedTests() {
		_clearOutput();
		var listbox = document.getElementById("testing-listbox");
		var items = listbox.selectedItems.slice();
		if(!items || items.length == 0) return false; // No action if nothing selected
		var i;
		var tests = [];
		for (i in items) {
			items[i].getElementsByTagName("listcell")[1].setAttribute("label", "Updating");
			var test = JSON.parse(items[i].getUserData("test-string"));
			tests.push(test);
		}
		
		var updater = new TestUpdater(tests);
		updater.updateTests(function(newTests) {
			for(var i in newTests) {
				var message;
				if(newTests[i]) {
					message = "Test updated";
					Zotero.debug(newTests[i]);
					items[i].setUserData("test-string", JSON.stringify(newTests[i]), null);
				} else {
					message = "Update failed"
				}
				items[i].getElementsByTagName("listcell")[1].setAttribute("label", message);
			}
		});
	}
	
	var TestUpdater = function(tests) {
		this.testsToUpdate = tests.slice();
		this.newTests = [];
		this.tester = new Zotero_TranslatorTester(_getTranslator(), "web", _debug);
	}
	
	TestUpdater.prototype.updateTests = function(callback) {
		if(!this.testsToUpdate.length) {
			callback(this.newTests);
			return;
		}
		
		
		var test = this.testsToUpdate.shift();
		var me = this;
		
		if (test.type == "import") {
			test.items = [];

			// Re-runs the test.
			// TranslatorTester doesn't handle these correctly, so we do it manually
			_run("doImport", test.input, null, function(obj, item) {
				if(item) {
					test.items.push(Zotero_TranslatorTester._sanitizeItem(item));
				} 
			}, null, function() {
				me.newTests.push(test);
				me.updateTests(callback);
			});
			// Don't want to run the web portion
			return true;
		}
		
		var hiddenBrowser = Zotero.HTTP.processDocuments(test.url,
			function(doc) {
				me.tester.newTest(doc, function(obj, test) {
					Zotero.Browser.deleteHiddenBrowser(hiddenBrowser);
					me.newTests.push(_sanitizeItemsInTest(test));
					me.updateTests(callback);
				});
			},
			null,
			function(e) {
				Zotero.logError(e);
				me.newTests.push(false);
				me.updateTests(callback);
			},
			true
		);
	}

	/*
	 * Normalize whitespace to the Zotero norm of tabs
	 */
	function normalizeWhitespace(text) {
		return text.replace(/^[ \t]+/gm, function(str) {
			return str.replace(/ {4}/g, "\t");
		});
	}

	/*
	 * Clear output pane
	 */
	function _clearOutput() {
		document.getElementById('output').value = '';
	}

	/*
	 * generates an RFC 4122 compliant random GUID
	 */
	function _generateGUID() {
		var guid = "";
		for(var i=0; i<16; i++) {
			var bite = Math.floor(Math.random() * 255);

			if(i == 4 || i == 6 || i == 8 || i == 10) {
				guid += "-";

				// version
				if(i == 6) bite = bite & 0x0f | 0x40;
				// variant
				if(i == 8) bite = bite & 0x3f | 0x80;
			}
			var str = bite.toString(16);
			guid += str.length == 1 ? '0' + str : str;
		}
		return guid;
	}

	/*
	 * updates list of available frames
	 */
	function _updateFrames() {
		var doc = _browser.document.getElementById("content").contentDocument;
		// No need to run if Scaffold isn't open
		var menulist = _document.getElementById("menulist-testFrame");
		if (!_document || !menulist) return true;

		menulist.removeAllItems();
		var popup = _document.createElement("menupopup");
		menulist.appendChild(popup);

		_frames = new Array();

		var frames = doc.getElementsByTagName("frame");
		if(frames.length) {
			_getFrames(frames, popup);
		} else {
			var item = _document.createElement("menuitem");
			item.setAttribute("label", "Default");
			popup.appendChild(item);

			_frames = [doc];
		}

		menulist.selectedIndex = 0;
	}

	/*
	 * recursively searches for frames
	 */
	function _getFrames(frames, popup) {
		for each(var frame in frames) {
			if(frame.contentDocument) {
				// get a good name
				var frameName;
				if(frame.title) {
					frameName = frame.title;
				} else if(frame.name) {
					frameName = frame.name;
				} else {
					frameName = frame.contentDocument.location.href;
				}

				// add frame
				var item = _document.createElement("menuitem");
				item.setAttribute("label", frameName);
				popup.appendChild(item);
				_frames.push(frame.contentDocument);

				// see if frame has its own frames
				var subframes = frame.contentDocument.getElementsByTagName("frame");
				if(subframes.length) _getFrames(subframes, popup);
			}
		}
	}

	/*
	 * gets selected frame/document
	 */
	function _getDocument() {
		return _frames[_document.getElementById("menulist-testFrame").selectedIndex];
	}
}

window.addEventListener("load", function(e) { Scaffold.onLoad(e); }, false);
