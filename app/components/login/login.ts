import {Component, Inject} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {BaseHttpService} from '../../services/base-http';
import * as constants from '../../config/constants';
import {Profile} from '../../models/profile';

@Component({
  selector: 'df-login',
  templateUrl: './components/login/login.html',
  styleUrls: ['./components/login/login.css'],
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [BaseHttpService]
})

export class LoginCmp {

	form: ControlGroup;
	email: Control = new Control('', Validators.required);
	password: Control = new Control('', Validators.required);

	static profile: Profile = new Profile();

	constructor (formBuilder: FormBuilder, private httpService: BaseHttpService, private _router: Router) {
		this.form = formBuilder.group({
			email: this.email,
			password: this.password
		});
	}

	private storeToken (data) {
		this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
		localStorage.setItem('session_token', data.session_token);
		this._router.navigate(['Home']);
	}

	forgot () {
		if (!this.email.value) {
			alert('Please enter your email.');
			return;
		}


		var doc: any = {
			email: this.email.value,
			reset: true
		};

		this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/system/admin/password', JSON.stringify(doc))
			.subscribe((data) => {
				alert('A password reset email has been sent to the provided email address.');
			}, (error) => {
				this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/user/password', JSON.stringify(doc))
					.subscribe((data) => {
						alert('A password reset email has been sent to the provided email address.');
					}, (error) => {
						alert('Error, cannot reset password. Try again')
					});				
			});
	}

	formSubmit () {
		var self = this;
		this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/system/admin/session', JSON.stringify(this.form.value))
			.subscribe((data) => {
				self.storeToken(data.json());
			}, (error) => {
				this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/user/session', JSON.stringify(this.form.value))
					.subscribe((data) => {
						self.storeToken(data.json());
					}, (error) => {
						alert('Error, cannot login. Try again')
					});
			});
	}
}
