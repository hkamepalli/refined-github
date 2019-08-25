import select from 'select-dom';
import {DelegateSubscription} from 'delegate-it';
import features from '../libs/features';
import onPrMergePanelOpen from '../libs/on-pr-merge-panel-open';

function onMergePanelOpen(event: Event): void {
	if (event.type === 'session:resume') {
                throw new Error('Refined GitHub: `fix-merge-title-and-message` can’t update the title and message. It is already updated.');
	}
	// Fix merge commit title
	const mergeTitle = select('.js-issue-title')!.textContent!.trim();
	const number = select('.gh-header-number')!.textContent;
	select<HTMLInputElement>('#merge_title_field')!.value = `${mergeTitle.trim()} (${number})`;

	// Fix merge commit message
	const mergeMessage = select('.comment-form-textarea[name=\'pull_request[body]\']')!.textContent!;
	select<HTMLTextAreaElement>('#merge_message_field')!.value = mergeMessage;
	deinit();
}

let listeners: DelegateSubscription[];
function init(): void {
	listeners = [
		...onPrMergePanelOpen(onMergePanelOpen)
	];
}

function deinit(): void {
	for (const delegation of listeners) {
		delegation.destroy();
	}

	listeners.length = 0;
}

features.add({
	id: __featureName__,
	description: 'Updates title and message fields of the merge commit to the pull request title and description',
	screenshot: '',
	include: [
		features.isPRConversation
	],
	load: features.onAjaxedPages,
	init
});
