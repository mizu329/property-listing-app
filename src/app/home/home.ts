import { Component, OnInit, inject, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from "../housing-location/housing-location";
import { HousingLocationInfo } from "../housinglocation";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList; let i = index"
        [housingLocation]="housingLocation"
        [attr.data-index]="i"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.css"],
})
export class Home implements OnInit {
  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  housingService = inject(HousingService);
  cdr = inject(ChangeDetectorRef);
  async ngOnInit() {
    this.housingLocationList =
      await this.housingService.getAllHousingLocations();

    this.filteredLocationList = this.housingLocationList;
    this.cdr.detectChanges();
  }
  //検索
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
