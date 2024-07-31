import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HelpModalPage } from '../help-modal/help-modal.component';
import { Router } from '@angular/router';

// Define an interface for the item
interface CartItem {
  image:string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  //  customer details
  customerDetails: any = {
    name: 'Portia Shim',
    email: 'portiashim@gmail.com',
    phone: '+276456790'
  };
  isEditing: boolean = false;

  Edit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Save changes when switching from edit to save
      this.saveDetails();
    }
  }

  saveDetails() {
    // Convert customerDetails object to a string
    const customerDetailsString = JSON.stringify(this.customerDetails);
    // Save the stringified object to local storage
    localStorage.setItem('customerDetails', customerDetailsString);
    


  }
  // Array to hold past orders
  pastOrders: { id: string; date: string; cart: CartItem[]; totalPrice: number }[] = []; // Added id field to uniquely identify orders
 // Declare cart property
 cart: CartItem[] = [];
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPastOrders(); // Retrieve past orders when the Account page is initialized
  }

  async getHelp() {
    // Display modal
    const modal = await this.modalController.create({
      component: HelpModalPage,
      componentProps: {
        text: 'call 0855625642.'
      }
    });
    return await modal.present();
  }
  reorder(order: any) {
    this.router.navigate(['/cart'], {
      queryParams: {
        orderId: order.id 
      }
    });
  }
  
  
  

  // Method to retrieve past orders from local storage
  getPastOrders() {
    // Clear pastOrders array 
    this.pastOrders = [];

    // Loop through local storage to retrieve past orders
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('order_')) {
        const orderData = localStorage.getItem(key);
        if (orderData) {
          const order = JSON.parse(orderData);
          order.id = key; // Assign unique order id
          this.pastOrders.push(order);
        }
      }
    }
  }

  ionViewWillEnter() {
    this.getPastOrders(); // Retrieve past orders data when the view is about to enter
  }
}
