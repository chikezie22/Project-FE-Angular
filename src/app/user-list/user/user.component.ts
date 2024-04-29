import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userDetails: any = []; // Variable to store the user details
  userSupport: any = [];
  userId!:any
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || ''; // Handle potential missing parameter
    });
    this.fetchUsers(this.userId)
  }

  fetchUsers(page: number): void {
    this.userService.getUserDetails(page)
    .subscribe({
       next: (data:any) => {
        
         this.userDetails= data.data
         this.userSupport = data.support
         console.log(this.userDetails);
         console.log(this.userSupport);
       },
       error: (error) => {
         console.error('Error fetching users:', error);
       }
     });
   }
}
