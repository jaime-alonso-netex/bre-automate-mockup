import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent {
  tooltip!: string;
  text = 'Mundo';
  subtext = 'Hola'

}
