import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsService } from './services/items.service';
import { of } from 'rxjs';
import { Item } from './state/items/models';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let itemsService: jasmine.SpyObj<ItemsService>;

  const mockItems: Item[] = [
    { paymentMethod: 'Credit Card', grossAmount: 150, netAmount: 145, transactionDate: new Date().toISOString(), id: '01', product: 'cargardor' },
    { paymentMethod: 'Cash', grossAmount: 200, netAmount: 195, transactionDate: new Date().toISOString(), id:'02', product: 'mochila'},
  ];

  beforeEach(async () => {
    const itemsServiceSpy = jasmine.createSpyObj('ItemsService', ['getSearchText']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ItemsService, useValue: itemsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    itemsService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTransactions() and update list', () => {
    itemsService.getSearchText.and.returnValue(of(mockItems));

    component.searchText = 'someText';
    component.getTransactions();

    expect(itemsService.getSearchText).toHaveBeenCalledWith('someText');
    expect(component.list.length).toBe(2);
    expect(component.list[0].paymentMethod).toBe('Credit Card');
  });

  it('should call searchProduct() and update productSuggestionList', () => {
    itemsService.getSearchText.and.returnValue(of(mockItems));

    component.searchText = 'cash';
    component.searchProduct();

    expect(itemsService.getSearchText).toHaveBeenCalledWith('cash');
    expect(component.productSuggestionList()).toEqual(mockItems);
  });

  it('should update searchText when setSearchText is called', () => {
    component.setSearchText('testing');
    expect(component.searchText).toBe('testing');
  });
});
