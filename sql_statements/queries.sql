SELECT distinct
  food_item.name, ingredient.ingredientName, restaurant.restaurantId, restaurant.name
FROM food_item
INNER JOIN food_item_ingredients
  ON food_item.foodItemId = food_item_ingredients.foodItemId
INNER JOIN ingredient
  ON food_item_ingredients.ingredientId = ingredient.ingredientId
INNER JOIN part_of
  ON food_item.foodItemId = part_of.foodItemId
INNER JOIN offered_items
  ON part_of.menuId = offered_items.menuId
INNER JOIN restaurant
  ON offered_items.restaurantId = restaurant.restaurantId;