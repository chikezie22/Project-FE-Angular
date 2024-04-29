import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit{
  searchText :string = '';
 users:{id:number, email:string, first_name:string, last_name:string, avatar:string}[] = []
  currentPage: number = 1;
  totalPages!:number
  filteredUsers: any[] = []; // Array to store filtered users

  constructor(private userService: UserService, private router:Router){

  }
  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
    console.log(this.users);
    console.log('Current Page:', this.currentPage);
  }

  ngAfterViewInit(): void {
    console.log(this.users);
  }

  onSearchText(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  filterUsers(): void {
    if (this.searchText.trim() !== '') {
      // Filter users based on search text (user ID)
      this.filteredUsers = this.users.filter(user => user.id.toString().includes(this.searchText.trim()));
    } else {
      // If search text is empty, show all users
      this.filteredUsers = [...this.users];
    }
  }

  fetchUsers(page: number): void {
   this.userService.getUsers(page)
   .subscribe({
      next: (data:any) => {
        this.users= data.data
        this.totalPages = data.total_pages;
        console.log(data);
        console.log(this.users);
        
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onNextPage() {
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      this.currentPage = nextPage; // Increment the current page number
      this.fetchUsers(this.currentPage); // Fetch users for the next page
    } else {
      // Handle case where there's no next page (optional)
      console.log("No next page available.");
      return
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement the current page number
      this.fetchUsers(this.currentPage); // Fetch users for the previous page
    }
  }

  redirectToUserDetails(user: any) {
    // Navigate to the user details page with the user object as a route parameter
    this.router.navigate(['/user', user.id] );
    console.log(user.id);
  }

}
