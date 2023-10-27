import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { DataService } from '../services/data.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.scss'],
})
export class ManageRecordsComponent implements OnDestroy {
  constructor(private router: Router, private searchService: SearchService, private dataService: DataService) {
    this.subscriptions.add(
      this.searchService.watchSearchResults().subscribe((res) => {
        this.data = res ? res : [];
      })
    );
  }

  private subscriptions = new Subscription();

  data = [];
  parkNames = [
    'Garibaldi Provincial Park',
    'Golden Ears Provincial Park',
    'Joffre Lakes Provincial Park',
    'Mount Seymour Provincial Park',
  ];
  typePicklistItems = ['Any', 'Protected area'];
  statusPicklistItems = ['Any', 'Established', 'Repealed'];
  form = new UntypedFormGroup({
    text: new UntypedFormControl(null),
    type: new UntypedFormControl(null),
    status: new UntypedFormControl(this.statusPicklistItems[0]),
  });

  submit() {
    this.searchService.fetchData(this.form.value.text);
  }

  viewItem(item) {
    this.dataService.setItemValue(Constants.dataIds.CURRENT_PROTECTED_AREA, item);
    // TODO: When we have historical park names, we want to set HISTORICAL_PROTECTED_AREA here.
    this.router.navigate([this.getPathFromType(item.type), item.pk]);
  }

  editItem(item) {
    this.router.navigate([this.getPathFromType(item.type), item.pk, 'edit']);
  }

  getPathFromType(type) {
    switch (type) {
      case 'Protected area':
        return 'protected-area';
      // case 'Site':
      //   return 'site';
      // case 'Unofficial site':
      //   return 'site';
      default:
        return '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
