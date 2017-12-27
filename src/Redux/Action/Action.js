	export function alertMessage(messageText, hideTime) {
		return {
			type: 'ALERT_SHOW',
			messageText,
			hideTime
		};
	}

	export function showLoading(flag) {
		return {
			type: 'SHOW_LOADING',
			flag
		};
	}