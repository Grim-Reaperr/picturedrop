import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Coupon {
  Id: string;
  ValidatedOn: string | null;
}

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponsComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  coupons$: Observable<Coupon[]> | null = null;

  validatedCount = 0;
  availableCount = 0;

  coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = [];

  filter: 'all' | 'validated' | 'available' = 'all';

  ngOnInit(): void {
    this.coupons$ = this.http.get<Coupon[]>('/api/coupons');
    this.coupons$.subscribe(coupons => {
      this.coupons = coupons;
      this.validatedCount = coupons.filter(c => c.ValidatedOn !== null).length;
      this.availableCount = coupons.filter(c => c.ValidatedOn === null).length;
      this.applyFilter(); // Initial alle anzeigen
    });
  }

  setFilter(type: 'all' | 'validated' | 'available') {
    this.filter = type;
    this.applyFilter();
  }

  applyFilter() {
    switch (this.filter) {
      case 'validated':
        this.filteredCoupons = this.coupons.filter(c => c.ValidatedOn !== null);
        break;
      case 'available':
        this.filteredCoupons = this.coupons.filter(c => c.ValidatedOn === null);
        break;
      default:
        this.filteredCoupons = this.coupons;
    }
  }
}
