import { Injectable } from "@angular/core";
import { HousingLocationInfo } from "./housinglocation";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  readonly url = "/assets/db.json";
  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const response = await fetch(this.url);
    const data = await response.json();
    console.log(data);

    return data.locations ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}
