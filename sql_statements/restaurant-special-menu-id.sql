alter table Restaurant
add column specialMenuId integer unique default NULL after diningTypeId;

alter table Restaurant
add foreign key (specialMenuId) references menu(menuId) on delete set null;
