import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  toDelete: Array<string> = [];
  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    }
    )
  }

  addToDelete(href) {
    if (this.toDelete.includes(href)) {
      this.toDelete.splice(this.toDelete.indexOf(href), 1)
    } else {
      this.toDelete.push(href)
    }
  }

  delete() {
    for (const toDeleteOwner in this.toDelete) {
      this.ownerService.delete(this.toDelete[toDeleteOwner]).subscribe(result => {
        this.ownerService.getAll().subscribe(data => {
          this.owners = data._embedded.owners;
        })
      }, error => console.error(error))
    }
  }
}
