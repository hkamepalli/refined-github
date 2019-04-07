import select from 'select-dom';
import features from '../libs/features';

function init() {
	const button = select('.merge-message .btn-group-merge [type=button]');
	if (!button) {
		return false;
	}
	button.addEventListener('click', () => {
		// Fix merge commit title
		const mergeTitle = select('.js-issue-title').textContent;
		const number = select('.gh-header-number').textContent;
		select<HTMLTextAreaElement>('#merge_title_field').value = `${mergeTitle.trim()} (${number})`;

		// Fix merge commit message
		const mergeMessage = select('.comment-form-textarea[name=\'pull_request[body]\']').textContent;
		select<HTMLTextAreaElement>('#merge_message_field').value = mergeMessage;
	});
}

features.add({
	id: 'fix-merge-title-and-message',
	include: [
		features.isPRConversation
	],
	load: features.onAjaxedPages,
	init
});
