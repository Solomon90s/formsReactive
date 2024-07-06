import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private validatorsService: ValidatorsService) {}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)  ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: [ '', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  });

  isValidField( field: string ) {
    return this.validatorsService.isValidField(this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
