"use strict";
exports.AUTH_ACTION_TYPES = {
    GITHUB_AUTH: 'GITHUB_AUTH',
    CHANGE_NAME: 'CHANGE_NAME',
};
exports.authInitialState = {
    authToken: window.localStorage.getItem('authToken') || false,
    authenticated: false,
    username: '',
};
exports.authStore = function (state, action) {
    if (state === void 0) { state = exports.authInitialState; }
    switch (action.type) {
        case exports.AUTH_ACTION_TYPES.GITHUB_AUTH:
            localStorage.setItem('authToken', action.payload.token);
            return Object.assign(state, { authToken: action.payload.token, authenticated: true });
        case exports.AUTH_ACTION_TYPES.CHANGE_NAME:
            return Object.assign(state, { username: action.payload.username });
        default:
            return state;
    }
};
//# sourceMappingURL=auth.store.js.map