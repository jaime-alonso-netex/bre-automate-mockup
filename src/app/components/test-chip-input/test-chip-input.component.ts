import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, inject, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Chip {
  color: 'accent' | 'light';
  text: string;
  subtext?: string;
  img?: string;
  iconFontFamily?: string,
  iconFontName?:string
}

type ChipType = 'text' | 'image' | 'icon';

/**
 * @title Chips with input
 */
@Component({
  selector: 'test-chip-input',
  templateUrl: 'test-chip-input.component.html',
  styleUrl: 'test-chip-input.component.scss',
  standalone: true,
  host:{'class': 'test-chip-input'},
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatInputModule, MatTooltipModule],
})
export class TestChipInputComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() chips: Chip[] = [];
  @Input({ transform: coerceBooleanProperty }) disabled: boolean = false;
  @Input() hint = '';
  @Input() label = 'Default label';
  @Input() subtext = 'Default subtext';
  @Input() text = 'Default text';
  @Input() placeholder = 'Default placeholder';

  @Output() addedChip = new EventEmitter<string>();
  @Output() removedChip = new EventEmitter<Chip>();

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Clear the input value
    event.chipInput!.clear();
    console.log('Added chip');
    if(event.value) {
      this.addedChip.emit(value);
    }
  }
  
  remove(chip: Chip): void {
    console.log('Removed chip');
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.removedChip.emit(chip);
  }

  getChipType(chip: Chip): ChipType {
    if(chip.img && !chip.iconFontFamily && !chip.iconFontName) {
      return 'image';
    }
    if(!chip.img && chip.iconFontFamily && chip.iconFontName) {
      return 'icon';
    }
    return 'text';
  }
}
