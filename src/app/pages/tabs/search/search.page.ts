import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery: string = ''; // declare the searchQuery property
  filteredRestaurants: any[] = []; // declare the filteredRestaurants property

  restaurants = [
    {
      name: 'Jollof of Africa',
      type: 'African Cuisine',
      rating: 5,
      distance: 2.59,
      price: 100,
      image: 'assets/jollof1.jpeg'
    },
    {
      name: 'Kung fu Kitchen',
      type: 'Asian Cuisine',
      rating: 5,
      distance: 1.58,
      price: 95,
      image: 'assets/sushi.jpg'
    },
    {
      name: 'Ayoba Cafe Shisanyama',
      type: 'African Cuisine',
      rating: 4.4,
      distance: 1.83,
      price: 120,
      image: 'assets/Shisayanma.jpg'
    },
    {
      name: 'Spice-The Indian Kitchen',
      type: 'Asian Cuisine',
      rating: 4.1,
      distance: 0.9,
      price: 80,
      image: 'assets/Briyani.jpeg'
    }
  ];

  constructor(private navCtrl: NavController) { }

  addToCart(restaurant: any) {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = {
      name: restaurant.name,
      price: restaurant.price,
      image: restaurant.image
    };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  updateSearchResults() {
    if (this.searchQuery.trim() === '') {
      // If the search query is empty, display all restaurants
      this.filteredRestaurants = this.restaurants;
    } else {
      // If there's a search query, filter restaurants based on name, type, price, or rating
      this.filteredRestaurants = this.restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          restaurant.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          restaurant.price.toString().includes(this.searchQuery) ||
          restaurant.rating.toString().includes(this.searchQuery) ||
          restaurant.distance.toString().includes(this.searchQuery)
        );
      });
    }
  }

  ngOnInit() {
  }
}



