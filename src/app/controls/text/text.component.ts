import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';

import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'fbc-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true,
    },
  ],
})
export class TextComponent implements OnInit, ControlValueAccessor {
  @Input() name = '';
  @Input() label = '';

  textControl = new FormControl('');
  private onTouched = () => {};
  private onChanged = (c: any) => {};

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const injectedControl = this.injector.get(NgControl);

    if (injectedControl instanceof FormControlName) {
      this.textControl = this.injector
        .get(FormGroupDirective)
        .getControl(injectedControl as FormControlName);
    } else {
      this.textControl = (injectedControl as FormControlDirective)
        .form as FormControl;
    }
  }

  writeValue(obj: any): void {
    //this.textControl.patchValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.textControl.disable({ emitEvent: false });
    else this.textControl.enable({ emitEvent: false });
  }
}
