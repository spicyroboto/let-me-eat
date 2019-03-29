create view restaurantRestrictionsView as
select re.restaurantId, re.name, re.cuisine, re.username as Owner, dt.diningTypeName,
c.phoneNo, c.email, c.streetName, c.city, c.province, a.postalCode, a.locationTag, p.foodItemId, ri.restrictionId
from restaurant re
join dining_type dt on dt.diningTypeId = re.diningTypeId
join offered_items o on o.restaurantId = re.restaurantId
join contact_info c on c.restaurantId = re.restaurantId
join address a on a.streetName = c.streetName
join menu m on m.menuId = o.menuId
join part_of p on m.menuId = p.menuId
join food_item f on f.foodItemId = p.foodItemId
join food_item_ingredients fi on f.foodItemId = fi.foodItemId
join ingredient i on i.ingredientId = fi.ingredientId
join restriction_applies_to_ingredient ri on ri.ingredientId = fi.ingredientId
join restriction r on r.restrictionId = ri.restrictionId
group by  re.restaurantId, f.foodItemId, i.ingredientId, ri.restrictionId;

create view customerRestrictionsView as
select c.username, ce.restrictionId, r.name as restrictionName
from customer_user c
join customer_cannot_eat ce on ce.username = c.username
join restriction r on r.restrictionId = ce.restrictionId
