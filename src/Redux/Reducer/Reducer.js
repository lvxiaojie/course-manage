export const reduAlert = (state = '', action) => {
	switch (action.type) {
		case 'ALERT_SHOW':
			return {
				time: new Date(),
				messageText: action.messageText,
				hideTime: action.hideTime
			}
		default:
			return state;
	}
}

export const reduToLoading = (state = '', action) => {
	switch (action.type) {
		case 'SHOW_LOADING':
			return {
				flag: action.flag,
				time: new Date()
			}
		default:
			return state;
	}
}