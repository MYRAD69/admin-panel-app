import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  };
}

@Directive({
  selector: '[appIsNumber]'
})
export class IsNumberDirective {

  constructor() { }

}
