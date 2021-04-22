import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
  sub: Subscription;
  owner: any = {};
  create: boolean = true;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if (dni) {
        this.create = false;
        this.ownerService.getByDni(dni).subscribe((owner: any) => {
          if (owner._embedded.owners[0]) {
            this.owner = owner._embedded.owners[0];
            console.log(this.owner);
          } else {
            console.log('no encontro el owner');
            this.gotoList();
          }
        })
      }

    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  sendForm(form: NgForm) {
    if (this.create) {
      this.save(form)
    } else {
      this.update(form)
    }
  }

  save(form: NgForm) {  
    this.ownerService.post(form).subscribe(
      result => {
        console.log(result);
        
        this.gotoList();
      }, error => console.error(error));

  }

  update(form: NgForm) {
    let link = this.owner._links.self.href;
    this.ownerService.put(link, form).subscribe(
      result => {
        this.gotoList();
      }, error => console.error(error)
    );

  }

  delete() {
    let link = this.owner._links.self.href;
    this.ownerService.delete(link).subscribe(
      result => {
        this.gotoList();
      }, error => console.error(error)
    );

  }
}
