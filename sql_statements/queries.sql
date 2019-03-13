SELECT distinct
  food_item.name, restaurant.restaurantId, restaurant.name
FROM food_item
INNER JOIN part_of
  ON food_item.foodItemId = part_of.foodItemId
INNER JOIN offered_items
  ON part_of.menuId = offered_items.menuId
INNER JOIN restaurant
  ON offered_items.restaurantId = restaurant.restaurantId;