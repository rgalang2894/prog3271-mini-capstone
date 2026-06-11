// Contains all types regarding users
// Notification type for user notifications (Making sure it follows our ERD design)
export interface Notification {
  id: number;
  userId: string;
  message: string;
  //reminderType: enum ReminderType {
  //Email = "Email",
  //SMS = "SMS",
  //Push = "Push",
  //}
}

// user type for user information (Making sure it follows our ERD design)
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// store inventory type for the items in the store (Making sure it follows our ERD design)
export interface StoreInventory {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// store details type for the store information (Making sure it follows our ERD design)
export interface StoreDetails {
  id: number;
  name: string;
  description: string;
  location: string;
  contactInfo: string;
}

// Plant catalog type for the plants available in the store (Making sure it follows our ERD design)
export interface PlantCatalog {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
  wateringGuide: string;
  sunlightReq: string;
  imageUrl: string;
}

// user plants type for the plants owned by the user (Making sure it follows our ERD design)
export interface UserPlants {
  id: number;
  userId: number;
  catalogId: number;
  customName: string;
  //location: enum Location {
  //Indoor = "Indoor",
  //Outdoor = "Outdoor",
  //}
  lastWatered: Date;
  dateAdded: Date;
}
