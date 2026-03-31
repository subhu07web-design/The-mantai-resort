import { MenuItem, RestaurantInfo, Review } from './types';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "THE MANDAI RESORT",
  rating: 3.7,
  reviewsCount: 307,
  category: "Family Restaurant",
  address: "Gaon Mahal Road, Hatilung, Jorhatia, Assam 787031",
  phone: "+91 94357 11611",
  hours: "Open daily, 10:00 AM - 9:00 PM",
  services: ["Unlimited buffet", "Outdoor seating", "Vegetarian options available", "Family-friendly"],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "919435711611"
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // Chinese
  {
    id: "c1",
    name: "Chicken Chow Mein",
    description: "Stir-fried noodles with succulent chicken and fresh vegetables.",
    price: 180,
    category: "Chinese",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774962098/chickn_chaw_mean_ptx3md.jpg"
  },
  {
    id: "c3",
    name: "Fried Rice",
    description: "Aromatic basmati rice stir-fried with chicken and soy sauce.",
    price: 150,
    category: "Chinese",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774774716/burnt_garlic_fried_rice_pu47v1.jpg"
  },
  {
    id: "c4",
    name: "Chicken Lollipop",
    description: "Crispy chicken wings served with spicy Schezwan sauce.",
    price: 220,
    category: "Chinese",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774962714/chiken_lolipop_jx8qel.jpg"
  },
  // Indian Main Course
  {
    id: "i1",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked overnight with butter and spices.",
    price: 180,
    category: "Indian",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774962793/dal_makhni_ehcawn.jpg"
  },
  {
    id: "i2",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken and authentic spices.",
    price: 250,
    category: "Indian",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774963151/chickn_biriyani_cw9sav.jpg"
  },
  {
    id: "i3",
    name: "Mutton Curry",
    description: "Traditional Assamese style mutton curry with rich gravy.",
    price: 350,
    category: "Indian",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774963264/motton_curry_mhek2o.jpg"
  },
  {
    id: "i4",
    name: "Pulao",
    description: "Light and aromatic rice cooked with ghee and whole spices.",
    price: 120,
    category: "Indian",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774963362/pulao_eut8qc.jpg"
  },
  {
    id: "i5",
    name: "Curry",
    description: "Seasonal vegetable curry with a blend of local spices.",
    price: 140,
    category: "Indian",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774963353/curry_nfnnd1.jpg"
  },
  // Combos
  {
    id: "co1",
    name: "Fried Rice + Pork Fry",
    description: "A hearty combo of chicken fried rice and crispy pork fry.",
    price: 320,
    category: "Combos",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774963833/fried_rice_with_pork_fry_mantai_cp6bkh.webp"
  },
  {
    id: "co2",
    name: "Fried Rice Pork Fry + Mutton Curry",
    description: "The ultimate non-veg platter for the meat lovers.",
    price: 450,
    category: "Combos",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774964168/fried_rice_porkfry_and_motton_q9km2i.jpg"
  },
  // Snacks
  {
    id: "s1",
    name: "French Fries",
    description: "Golden and crispy potato fries served with dip.",
    price: 90,
    category: "Snacks",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774964246/french_fries_a20kpw.jpg"
  },
  {
    id: "s2",
    name: "Chicken Roll",
    description: "Juicy chicken wrapped in a soft paratha with onions and sauces.",
    price: 110,
    category: "Snacks",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774964329/chickn_roll_vutpyi.jpg"
  },
  // Desserts
  {
    id: "d1",
    name: "Black Forest Cake of the Day",
    description: "Rich chocolate cake layered with cream and cherries.",
    price: 120,
    category: "Desserts",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774964623/black_cake_pqbkum.jpg"
  },
  // Beverages
  {
    id: "b1",
    name: "Cool Coffee",
    description: "Refreshing cold coffee with a dash of chocolate syrup.",
    price: 80,
    category: "Beverages",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774964713/cool_coffe_zeset1.jpg"
  },
  {
    id: "b2",
    name: "Keventers Juice Strawberry",
    description: "Sweet and creamy strawberry juice from Keventers.",
    price: 100,
    category: "Beverages",
    image: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774964969/strawberry_juice_gv3pe0.jpg"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Anjali Sarma",
    rating: 4,
    comment: "Great place for family dinner. The outdoor seating is very pleasant.",
    date: "2024-03-15"
  },
  {
    id: "r2",
    name: "Rajesh Borah",
    rating: 3,
    comment: "Food is good but service can be a bit slow during peak hours.",
    date: "2024-03-10"
  },
  {
    id: "r3",
    name: "Priyanka Das",
    rating: 5,
    comment: "The Mutton Curry is a must-try! Authentic taste of Assam.",
    date: "2024-03-05"
  }
];

export const GALLERY_IMAGES = [
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774966741/mantai_gallery_img_7_gdb2zx.webp", category: "Food" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774966730/mantai_gallery_img_6_pcuwbh.webp", category: "Ambience" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774966697/mantai_gallry_img_5_rv7chs.webp", category: "Ambience" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774966679/mantai_gallery_img_3_dzovn4.webp", category: "Ambience" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774965332/mantai_front_bannerimg_pbx0jr.webp", category: "Ambience" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774966649/mantai_ggallry_img1_leb03l.webp", category: "Ambience" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774966687/mantai_gallery_img_4_zcip3y.webp", category: "Ambience" },
  { url: "https://res.cloudinary.com/duy2rot8s/image/upload/v1774968379/mntai_galleryimg_8_tjyp0u.webp", category: "Ambience" },
];
