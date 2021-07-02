import { Component, OnInit } from '@angular/core';
import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';

@Serializable()
export class ApiPaginationFilters {

  public page: number = 1;

  @JsonProperty()
  public offset?: number;

  constructor(
    @JsonProperty()
    public limit: number,
  ) {
  }

  public nextPage(): void {
    this.setPage(this.page + 1);
  }

  public setPage(page: number): void {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
  }

  public previousPage(): void {
    if (this.page === 1) {
      return;
    }
    this.setPage(this.page + 1);
  }

}

@Serializable()
export class EosagoArchiveParams extends ApiPaginationFilters {

  @JsonProperty()
  public state?: string;

  @JsonProperty({
    name: 'start_date',
  })
  public startDate?: string;

  @JsonProperty({
    name: 'end_date',
  })
  public endDate?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app-angular';

  public ngOnInit(): void {
    const params = new EosagoArchiveParams(5);
    console.log(params);
    console.log(serialize(params));
  }
}
