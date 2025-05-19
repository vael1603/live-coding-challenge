import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './services/items.service';
import { Item } from './state/items/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  searchText = '';
  title = 'live-coding-challenge';

  list: Item[] = [];
  productSuggestionList = signal<Item[]>([])

  private itemsService = inject(ItemsService);
  ngOnInit() {
    // this.store.dispatch(ItemsActions.loadItems());
    this.searchProduct()
  }
  
  getTransactions() {
    this.itemsService.getSearchText(this.searchText).subscribe((res: any)=> {
      this.list = res;
    });
  }

  searchProduct() {
    this.itemsService.getSearchText(this.searchText).subscribe((res: any)=> {
      this.productSuggestionList.set(res);
    });
  }

  setSearchText(txt: string) {
    this.searchText = txt;
  }
}
