import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'test-span-tooltip',
  standalone: true,
  imports: [ MatTooltip],
  templateUrl: './test-span-tooltip.component.html',
  styleUrl: './test-span-tooltip.component.scss'
})
export class TestSpanTooltipComponent {

  @ViewChild('labelElement') labelElement!: ElementRef<HTMLSpanElement>;
  @ViewChild(MatTooltip) tooltip!: MatTooltip;

  @Input() label!: string;

  tooltipDisabled!: boolean;

  ngAfterViewInit() {
    // Modify the matTooltipDisabled property after the view is initialized
    setTimeout(() => {
      this.tooltipDisabled = this.checkOverflow(); // Or any other condition
    });
  }

  // ngAfterViewInit() { 
    //   this.checkOverflow(element);
    // }
    
    checkOverflow() {
      const element = this.labelElement.nativeElement;
      console.log('checkOverflow', element.scrollWidth > element.clientWidth);
    return element.scrollWidth < element.clientWidth;
  }

}
