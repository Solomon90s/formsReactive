import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/shared/components/validators/email-validator.service';
// import * as customValidators  from 'src/app/shared/components/validators/validators';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator) {}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)  ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ new EmailValidator() ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: [ '', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    //! Al realizar la comprobación de esta manera tengo acceso a todo el formulario y sus campos
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo( 'password', 'password2')
    ]
  });

  isValidField( field: string ) {
    return this.validatorsService.isValidField(this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
