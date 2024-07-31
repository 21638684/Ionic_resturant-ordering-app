import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: any[] = []; // Array to hold cart items
  deliveryInstructions: string = ''; // Variable to hold delivery instructions
  // Fixed delivery price
  deliveryPrice: number = 50;

  constructor(
    public alertController: AlertController,private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit() {
    // Retrieve cart data when the view is initialized
    this.getCartData();

    // Subscribe to route query parameters to handle reordering
  this.route.queryParams.subscribe(params => {
    const orderId = params['orderId'];

    // If orderId is provided in query params, fetch order details and populate cart
    if (orderId) {
      this.populateCartFromOrder(orderId);
    }
    });
  }

  // Method to retrieve cart data from local storage
  getCartData() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  populateCartFromOrder(orderId: string) {
    console.log('Attempting to populate cart from order:', orderId);
    // Retrieve order details from local storage
    const orderData = localStorage.getItem(orderId);
    console.log('Order data:', orderData);
    if (orderData) {
      const order = JSON.parse(orderData);
      console.log('Parsed order:', order);
      // Populate cart with items from the selected order
      this.cart = order.cart;
      console.log('Populated cart:', this.cart);
    } else {
      console.log('Order data not found for order ID:', orderId);
    }
  }
  
  
  

  // Method to calculate total price including delivery
  calculateTotalPrice(): number {
    let totalPrice = 0;

    // Calculate total price of items in cart
    this.cart.forEach(item => {
      totalPrice += item.price;
    });

    // Add delivery price
    totalPrice += this.deliveryPrice;

    return totalPrice;
  }
  

  async makePayment() {
    // Store order data with total price and date in local storage
    const totalPrice = this.calculateTotalPrice(); 
    const currentDate = new Date().toISOString(); 
    const order = { cart: this.cart, deliveryInstructions: this.deliveryInstructions, totalPrice, date: currentDate };
    // Generate a unique key for each order
    const orderId = 'order_' + Date.now();
    localStorage.setItem(orderId, JSON.stringify(order)); // Store order with unique key
  
    // Remove cart data from local storage for this specific order
    localStorage.removeItem('cart');
  
    // Remove the reordered items from local storage
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams && queryParams['orderId']) {
      localStorage.removeItem(queryParams['orderId']);
    }
  
    // Clear the cart
    this.cart = [];
  
    // Display alert with payment success message
    const alert = await this.alertController.create({
      header: 'Payment Successful',
      message: 'Your payment was successful!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/tabs/account']);
        }
      }]
    });
    await alert.present();
  }


  ionViewWillEnter() {
    this.getCartData(); // Retrieve cart data when the view is about to enter
  }
}