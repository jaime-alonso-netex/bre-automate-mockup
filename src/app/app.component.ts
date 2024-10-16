import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chip, TestChipInputComponent } from './components/test-chip-input/test-chip-input.component';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TestChipInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnChanges, OnInit {

  title = 'demo-app';
  chips: Chip[] = [
    {
      color: 'accent',
      subtext: 'Course lorem ipsum dolor sic amet consectetur',
      text: 'Course lorem ipsum dolor sic amet consectetur',
    },
    {
      color: 'accent',
      text: '20/12/2024',
      iconFontFamily: 'material-icons-outlined',
      iconFontName: 'calendar_today'
    },
    {
      color: 'accent',
      text: 'Lisa Smith lorem ipsum dolor sic amet consectetur',
      img: '../assets/images/user_image.png'
    },
    {
      color: 'light',
      text: 'Course lorem ipsum dolor sic amet consectetur',
    },
    {
      color: 'light',
      text: '20/12/2024',
      iconFontFamily: 'material-icons-outlined',
      iconFontName: 'calendar_today'
    },
    {
      color: 'light',
      text: 'Lisa Smith lorem ipsum dolor sic amet consectetur',
      img: '../assets/images/user_image.png'
    },
  ];
  // chipsText = [];
  chipsImage: Chip[] = [];
  chipsIcon: Chip[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  onAddedChip(value: string) {
    console.log('onAddedChipText', value);
    let addedChip: Chip = {
      text: value,
      color: 'accent'
    } 
    this.chips.push(addedChip);
  }
  onRemovedChip(chip: Chip) {
    console.log('onRemovedChip', chip);
  }

};