import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

const ulr = 'https://jsonplaceholder.typicode.com/todos/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subsription = new Subscription();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const sub = this.http.get(ulr)
      .subscribe(res => console.log(res));

    this.subsription.add(sub);
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

}
