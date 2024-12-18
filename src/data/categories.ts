interface Item {
  name: string;
  image: string;
}

interface SubCategory {
  name: string;
  items: Item[];
}

interface Category {
  name: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    name: "Tops",
    subcategories: [
      {
        name: "T-Shirts",
        items: [
          { name: "Red T-Shirt", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465751/item/goods_17_465751_3x4.jpg?width=400" },
          { name: "Blue T-Shirt", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465751/item/goods_61_465751_3x4.jpg?width=400" },
        ]
      },
      {
        name: "Hoodies",
        items: [
          { name: "Grey Hoodie", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/475855/sub/goods_475855_sub14_3x4.jpg?width=400" },
          { name: "Black Hoodie", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/456261/item/goods_09_456261_3x4.jpg?width=400" },
        ]
      }
    ]
  },
  {
    name: "Bottoms",
    subcategories: [
      {
        name: "Jeans",
        items: [
          { name: "Blue Jeans", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464744/item/goods_64_464744_3x4.jpg?width=400" },
          { name: "Black Jeans", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/471374/sub/goods_471374_sub14_3x4.jpg?width=400" },
        ]
      },
      {
        name: "Shorts",
        items: [
          { name: "Denim Shorts", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464945001/sub/goods_464945001_sub14_3x4.jpg?width=400" },
          { name: "Khaki Shorts", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/467052/item/goods_33_467052_3x4.jpg?width=400" },
        ]
      }
    ]
  },
  {
    name: "Shoes",
    subcategories: [
      {
        name: "Sneakers",
        items: [
          { name: "White Sneakers", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/340740/3407401060_zm.jpg" },
          { name: "Black Sneakers", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/190032/1900327270_zm.jpg" },
        ]
      },
      {
        name: "Boots",
        items: [
          { name: "Brown Boots", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/149501/1495016020_zm.jpg" },
          { name: "Black Boots", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/141179/1411797060_zm.jpg" },
        ]
      }
    ]
  }
];

export type { Category, SubCategory, Item };