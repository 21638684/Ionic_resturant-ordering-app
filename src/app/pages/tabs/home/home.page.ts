import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  // fixed deliviry price
  deliveryPrice: number = 50;

  constructor(private navCtrl: NavController) {}

  // Method to add item to cart
  addToCart(itemName: string) {
    // Retrieve cart data from local storage
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const item = {
      name: itemName,
      price: this.getItemPrice(itemName), // Get the item price
      image: this.getItemImage(itemName) // Get the item image
    };

    // Add item to cart
    cart.push(item);

    // Save updated cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Method to get the price of the item based on its name
  getItemPrice(itemName: string): number {
 
    switch (itemName) {
      case 'Jollof of Africa':
        return 100;
      case 'Kung fu Kitchen':
        return 95;
      case 'Ayoba Cafe Shisanyama':
        return 120;
      case 'Spice-The Indian Kitchen':
        return 80;
      default:
        return 0; // Return 0 if item name is not recognized
    }
  }

  // Method to get the image URL of the item based on its name
  getItemImage(itemName: string): string {
 
    switch (itemName) {
      case 'Jollof of Africa':
        return 'assets/jollof1.jpeg';
      case 'Kung fu Kitchen':
        return 'assets/sushi.jpg';
      case 'Ayoba Cafe Shisanyama':
        return 'assets/Shisayanma.jpg';
      case 'Spice-The Indian Kitchen':
        return 'assets/Briyani.jpeg';
      default:
        return ''; // Return empty string if item name is not recognized
    }
  }

  ngOnInit() {

  }
}
