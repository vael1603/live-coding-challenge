import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';

import { HttpTestingController} from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should fetch users', () => {
    const mockUsers = [{
        "id": "txn_00002",
        "product": "Cargador Negra USB-C PD",
        "grossAmount": 309.31,
        "netAmount": 206.36,
        "paymentMethod": "wire_transfer",
        "transactionDate": "2024-09-27T06:21:58.599Z",
        "details": {
          "cbu": "0123456789012345678901"
        }
      }
    ];
    const searchText = 'car'
    service.getSearchText(searchText).subscribe(items => {
      expect(items).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`http://localhost:8080/transactions?q=${searchText}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
