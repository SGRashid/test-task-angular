import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from "rxjs";

const ulr = 'https://jsonplaceholder.typicode.com/todos/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'test-task-angular';

  private subsription = new Subscription();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const sub = this.http.get(ulr).subscribe(res => console.log(res));

    this.subsription.add(sub);
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
}
