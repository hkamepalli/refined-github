import React from 'dom-chef';
import select from 'select-dom';
import features from '../libs/features';

function addJumpToBottomLink() {
	const meta = select('.gh-header-meta > .TableObject-item--primary');
	const jumpToBottomLink = select('#refined-github-jump-to-bottom-link');
	if (!meta || jumpToBottomLink) {
		return;
	}

	meta.append(
		' · ',
		<a href="#partial-timeline" id="refined-github-jump-to-bottom-link">Jump to bottom</a>
	);
}

function init() {
	addJumpToBottomLink();
}

features.add({
	id: __featureName__,
	description: 'Adds a hyperlink at the top to jump to the bottom of the page',
	screenshot: '',
	include: [
		features.isIssue,
		features.isPRConversation
	],
	load: features.onAjaxedPages,
	init
});
