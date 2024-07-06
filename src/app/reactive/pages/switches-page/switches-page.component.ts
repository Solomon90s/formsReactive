import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent implements OnInit {

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService) {}


  public myForm: FormGroup = this.formBuilder.group ({
    gender: ['M', [Validators.required] ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }


  //? Función para ejecutar la validación de los campos del formulario
  isValidField( field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }


  //? ngSubmit
  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);


  }

}
