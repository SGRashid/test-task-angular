import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const ulr = 'https://jsonplaceholder.typicode.com/todos/';

interface ITodoItem {
  completes: boolean;
  id: number;
  title: string;
  userId: number;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private maxItemCount = 10;
  private subscription = new Subscription();

  public showOnlyFavorite = false;
  public todoList: ITodoItem[];
  public todoListForDisplay: ITodoItem[];
  public searchString: string;
  public favoriteList: number[] = [];

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
        this.favoriteList = localStorage.favoriteList
          ? JSON.parse(localStorage.favoriteList)
          : [];

        this.todoList = res
          .slice(0, this.maxItemCount)
          .map(el => ({...el, isFavorite: this.favoriteList.includes(el.id)}));
        this.todoListForDisplay = this.todoList;
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
    if (!searchString) {
      this.searchString = '';
    }
    return searchString
      ? todoList.filter(item => item.title.match(searchString))
      : this.todoList;
  }

  addOrRemoveFavorite(item): void {
    if (item.isFavorite) {
      item.isFavorite = false;
      this.favoriteList = this.favoriteList.filter(el => el !== item.id);
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
      return;
    }

    item.isFavorite = true;
    this.favoriteList.push(item.id);
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }

}
