export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}