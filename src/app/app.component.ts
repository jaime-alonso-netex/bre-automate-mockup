import { Component, Inject, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { SidenavButtonComponent, SidenavComponent, SidenavMenuButtonComponent, StatusType, TableComponent, ToolbarComponent } from '@netexknowledge/admin-components';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Input } from '@angular/core';
import { debounceTime, delay, fromEvent } from 'rxjs';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'simple-component',
  template: `<p>{{ data }}</p>`,
  standalone: true
})
export class SimpleComponent {
  @Input() text: string = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidenavComponent,
    SidenavButtonComponent,
    SidenavMenuButtonComponent,
    TableComponent,
    ToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {

  currentPage = 1;
  hasMorePages = true;
  selectable = false;
  sidenavOpen = false;
  status!: StatusType;
  title = 'demo-app';
  users: User[] = [];

  @ViewChild('mainDiv') mainDiv!: ElementRef;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers('loading-data');
  }

  ngAfterViewInit(): void {
    fromEvent(this.mainDiv.nativeElement, 'scroll')
      .pipe(debounceTime(1000))
      .subscribe(() => this.onMainDivScroll());
  }
  
  onSidenavExpanded() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  loadUsers(status: StatusType) {

    if (!this.hasMorePages) { return; }

    this.status = status;

    this.usersService.getUsers(this.currentPage).pipe(
      delay(1000)
    ).subscribe((response) => {
      this.users = [...this.users, ...response.data];
      this.status = 'loaded-data';
      this.hasMorePages = response.hasMore;
      this.currentPage++;
    });
  }

  onMainDivScroll(): void {
    const mainDiv = this.mainDiv.nativeElement;
    if (mainDiv.scrollTop + mainDiv.clientHeight >= mainDiv.scrollHeight &&
      this.status !== 'loading-data') {
      this.loadUsers('adding-data');
    }
  }
}