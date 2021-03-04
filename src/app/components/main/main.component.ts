import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const ulr = 'https://jsonplaceholder.typicode.com/todos/';

interface ITodoItem {
  completes: boolean;
  id: number;
  title: string;
  userId: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private maxItemCount = 10;
  private subscription = new Subscription();

  public todoList: ITodoItem[];
  public todoListForDisplay: ITodoItem[];
  public searchString: string;
  public favoritList: number[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTodoList(): void {
    const sub = this.http.get(ulr).subscribe(
      (res: ITodoItem[]) => {
        this.todoList = res.slice(0, this.maxItemCount);
        this.todoListForDisplay = this.todoList;
        console.log(this.todoList);
        sub.unsubscribe();
      },
      err => alert(err)
    );

    this.subscription.add(sub);
  }

  showMore(): void {
    this.maxItemCount += 5;
    this.getTodoList();
  }

  search(searchString: string, todoList: ITodoItem[]): ITodoItem[] {
    return searchString
      ? todoList.filter(item => item.title.match(searchString))
      : this.todoList;
  }

  addOrRemoveFavorite(id: number): void {
    if (this.favoritList.includes(id)) {
      this.favoritList.filter(el => el !== id);
      return;
    }

    this.favoritList.push(id);
  }

  isFavorite = (id: number): boolean => this.favoritList.includes(id);

}
