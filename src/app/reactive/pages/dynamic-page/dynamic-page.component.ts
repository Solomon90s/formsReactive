import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService ) {}

  //? Creamos el formulario inicial
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    //! Esto es un array de elementos
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });


  public newFavorite: FormControl = new FormControl('', [ Validators.required ]);

  //? Creamos un getter del array de elementos
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray
  }

  //? Método para insertar elementos en el formarray
  onAddToFavorites():void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control( newGame, Validators.required )
    );
    this.newFavorite.reset();
  }


  //? Método para borrar elemento del formarray
  onDeleteFavorite( index: number):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.formBuilder.array([]);
    this.myForm.reset();
  }


  //? Función para ejecutar la validación de los campos del formulario
  isValidField( field: string): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  //? Función para ejecutar la validación de nuestro array del formulario
  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;

  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {} ;

    for (const key of Object.keys(errors) ) {
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido';

          case 'minlength':
            return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;
      }
    }
    return null;
  }


}
