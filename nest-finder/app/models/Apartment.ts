export interface Apartment {
    _id?: string;
    image: string;
    name: string;
    location: string;
    rentPrice: number;
    rentPer: 'night' | 'month';
    roomType: string; // Add this line to include room type
  }
  
  