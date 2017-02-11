"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Include angular2 dependencies including HTTP dependencies
 * and Injectable and Inject
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
/**
 * Import the ngrx configured store
 */
var store_1 = require('@ngrx/store');
var auth_store_1 = require('./../store/auth.store');
/**
 * Include electron browser so that a new windows can be triggered for auth
 * Information about browserWindow on electron
 * https://github.com/electron/electron/blob/master/docs/api/browser-window.md
 */
var remote = require('electron').remote;
var BrowserWindow = remote.BrowserWindow;
/**
 * Basic configuration like Endpoint URL's, API version..
 */
var options = require('./../config.json');
var Authentication = (function () {
    //Inject the store to make sure state changes go through the store
    function Authentication(store, http) {
        this.store = store;
        //authenticate and call the store to update the token
        this.authWindow = new BrowserWindow({ width: 800, height: 600, show: false });
        this.http = http;
    }
    /**
     * Fires the Github Auth process by calling the github api with
     * https://github.com/login/oauth/authorize
     *
     * Listens to specific redirects ont he BrowserWindow object to handle the callback from envato
     * On will-navigate and did-get-redirect-request methods invocation will call the handleGitHubCallback(url)
     * with the url to make sure a code was received
     *
     * OnClose will reset the browserWindow object
     */
    Authentication.prototype.githubHandShake = function () {
        var _this = this;
        // Build the OAuth consent page URL
        var githubUrl = 'https://github.com/login/oauth/authorize?';
        var authUrl = githubUrl + 'client_id=' + options.github.client_id + '&scope=' + options.github.scopes;
        this.authWindow.loadURL(authUrl);
        this.authWindow.show();
        // Handle the response from GitHub
        this.authWindow.webContents.on('will-navigate', function (event, url) {
            _this.handleGitHubCallback(url);
        });
        this.authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
            _this.handleGitHubCallback(newUrl);
        });
        // Reset the authWindow on close
        this.authWindow.on('close', function () {
            this.authWindow = null;
        }, false);
    };
    /**
     * Handles the callback from the browserWindow object
     * Checks for a code in the url and a refresh token received. When token and refresh
     * token are received calls requestGithubToken
     *
     * @param {string} url
     * The url that was just called by one of the events :
     * will-navigate
     * did-get-redirect-request
     *
     */
    Authentication.prototype.handleGitHubCallback = function (url) {
        var raw_code = /code=([^&]*)/.exec(url) || null;
        var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
        var error = /\?error=(.+)$/.exec(url);
        if (code || error) {
            // Close the browser if code found or error
            this.authWindow.destroy();
        }
        // If there is a code, proceed to get token from github
        if (code) {
            this.requestGithubToken(options.github, code);
        }
        else if (error) {
            alert('Oops! Something went wrong and we couldn\'t' +
                'log you in using Github. Please try again.');
        }
    };
    /**
     * Requests a git token from the github api given the
     * code received in the authentication step before
     *
     * @param {Object} githubOptions
     * The options to be sent to this request (received from the config file)
     *
     * @param {string} githubCode
     * The code received by the authentication method
     */
    Authentication.prototype.requestGithubToken = function (githubOptions, githubCode) {
        var _this = this;
        var creds = 'client_id=' + githubOptions.client_id + '&client_secret=' + githubOptions.client_secret + '&code=' + githubCode;
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        this.http.post('https://github.com/login/oauth/access_token?' + creds, '', { headers: headers })
            .subscribe(function (response) {
            //call the store to update the authToken
            var body_object = JSON.parse(response['_body']);
            _this.requestUserData(body_object.access_token);
        }, function (err) { return console.log(err); }, function () { return console.log('Authentication Complete'); });
    };
    /**
     * API Request to get information of a user from the Github API
     *
     * @param {string} token
     * The token to be used in the request
     */
    Authentication.prototype.requestUserData = function (token) {
        var _this = this;
        //set the token
        this.store.dispatch({
            type: auth_store_1.AUTH_ACTION_TYPES.GITHUB_AUTH, payload: {
                'token': token
            }
        });
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        this.http.get('https://api.github.com/user?access_token=' + token, { headers: headers })
            .subscribe(function (response) {
            //call the store to update the authToken
            var body_object = JSON.parse(response['_body']);
            console.log(body_object);
            _this.store.dispatch({
                type: auth_store_1.AUTH_ACTION_TYPES.CHANGE_NAME, payload: {
                    'username': body_object.name
                }
            });
        }, function (err) { return console.log(err); }, function () { return console.log('Request Complete'); });
    };
    Authentication = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store, http_1.Http])
    ], Authentication);
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.js.map