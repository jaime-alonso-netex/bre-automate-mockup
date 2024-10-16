import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, forwardRef, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'test-datepicker',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestDatepickerComponent),
      multi: true
    }
  ],
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule
  ],
  templateUrl: './test-datepicker.component.html',
  styleUrl: './test-datepicker.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TestDatepickerComponent implements ControlValueAccessor {

  constructor(public injector: Injector) { }

  @Input({ required: true }) id!:string;
  @Input({ required: true }) label!:string;
  @Input() placeholder!: string;
  @Input() hint!:string;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() errorMsg!:string;
  @Input() value!:string;

  @Output() dateChange = new EventEmitter<Date>();
  @Output() dateInput = new EventEmitter<Date>();

  // CustomValueAccesor implementation
  control = new FormControl();
  // value: any;
  onChange: any = () => { };
  onTouched: any = () => { };

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null) as NgControl;
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
      })
    }
  }
  writeValue(value: any): void {
    this.value=value
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}


