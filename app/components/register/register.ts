import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {BaseHttpService} from '../../services/base-http';
import * as constants from '../../config/constants';

@Component({
  selector: 'df-register',
  templateUrl: './components/register/register.html',
  styleUrls: ['./components/register/register.css'],
  providers: [BaseHttpService],
  directives: [ROUTER_DIRECTIVES]
})

export class RegisterCmp {
	form: ControlGroup;

	constructor (private httpService: BaseHttpService, private formBuilder: FormBuilder, private _router: Router) {
		this.form = formBuilder.group({
			first_name: new Control('', Validators.required),
			last_name: new Control(''),
			email: new Control('', Validators.required),
			password: new Control('', Validators.required)
		});
	}

	private storeToken(data) {
		this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
		localStorage.setItem('session_token', data.session_token);
		this._router.navigate(['Home']);
	}

	register () {
		var self = this;
		this.httpService.http
			.post(constants.DSP_INSTANCE_URL + '/api/v2/user/register?login=true', JSON.stringify(this.form.value))
			.subscribe((response) => {
				self.storeToken(response.json());
			}, (error) => {
				alert('Error, cannot register. Try again')
			});
	}
}
