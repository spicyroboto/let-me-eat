-- depends on which database is being used. SHOULD BE SET BY USER OF THIS SCRIPT BEFORE RUNNING!
USE heroku_e52fec4ca086f6b;

SET sql_mode='NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE Ingredient (
ingredientId INTEGER PRIMARY KEY,
ingredientName CHAR(20)
);

CREATE TABLE Food_Item (
foodItemId INTEGER PRIMARY KEY,
name CHAR(100),
calories INTEGER,
price REAL
);

CREATE TABLE Food_Item_Ingredients (
foodItemId INTEGER,
ingredientId INTEGER,
PRIMARY KEY(foodItemId, ingredientId),
FOREIGN KEY (foodItemId) REFERENCES Food_Item(foodItemId),
FOREIGN KEY (ingredientId) REFERENCES Ingredient(ingredientId)
);

CREATE TABLE Menu (
menuId INTEGER PRIMARY KEY,
menuType CHAR(40)
);

CREATE TABLE Part_Of (
menuId INTEGER,
foodItemId INTEGER,
PRIMARY KEY(menuId, foodItemId),
FOREIGN KEY (menuId) REFERENCES Menu(MenuId),
FOREIGN KEY (foodItemId) REFERENCES Food_Item(foodItemId)
);

CREATE TABLE Restriction (
restrictionId INTEGER PRIMARY KEY,
name char(20),
isAllergy BIT
);

CREATE TABLE Restriction_Applies_To_Ingredient (
restrictionId INTEGER,
ingredientId INTEGER,
PRIMARY KEY(restrictionId, ingredientId),
FOREIGN KEY (restrictionId) REFERENCES Restriction(restrictionId) ON DELETE CASCADE,
FOREIGN KEY (ingredientId) REFERENCES Ingredient(ingredientId) ON DELETE CASCADE
);

CREATE TABLE Customer_User (
username CHAR(20) PRIMARY KEY,
password VARCHAR(500),
isVerified BIT,
email CHAR(40) UNIQUE
);

CREATE TABLE Customer_Cannot_Eat (
username CHAR(20),
restrictionId INTEGER,
PRIMARY KEY(username, restrictionId),
FOREIGN KEY (username) REFERENCES Customer_User(username) ON DELETE
CASCADE,
FOREIGN KEY (restrictionId) REFERENCES Restriction(restrictionId) ON DELETE CASCADE
);

CREATE TABLE Address (
streetName CHAR(100),
city CHAR(20),
province CHAR(2),
postalCode CHAR(6),
locationTag CHAR(20),
PRIMARY KEY (streetName, city, province)
);

CREATE TABLE Dining_Type (
diningTypeId INTEGER PRIMARY KEY,
diningTypeName CHAR(20)
);

CREATE TABLE Owner_User (
username CHAR(20) PRIMARY KEY,
password VARCHAR(500),
email CHAR(40) UNIQUE
);

CREATE TABLE Restaurant (
restaurantId INTEGER PRIMARY KEY AUTO_INCREMENT,
name CHAR(40),
cuisine CHAR(20),
username CHAR(20) NOT NULL UNIQUE,
diningTypeId INTEGER,
FOREIGN KEY (username) REFERENCES Owner_User(username) ON DELETE CASCADE,
FOREIGN KEY (diningTypeId) REFERENCES Dining_Type(diningTypeId)
);

CREATE TABLE Contact_Info (
phoneNo CHAR(30),
email CHAR(50),
streetName CHAR(100),
city CHAR(20),
province CHAR(2),
restaurantId INTEGER PRIMARY KEY,
FOREIGN KEY (streetName, city, province) REFERENCES Address(streetName,
city, province),
FOREIGN KEY (restaurantId) REFERENCES Restaurant(restaurantId) ON DELETE
CASCADE
);

CREATE TABLE Offered_Items (
restaurantId INTEGER,
menuId INTEGER,
PRIMARY KEY (restaurantId, menuId),
FOREIGN KEY (restaurantid) REFERENCES Restaurant(restaurantId) ON DELETE CASCADE,
FOREIGN KEY (menuId) REFERENCES Menu(menuId) ON DELETE CASCADE
);

CREATE TABLE User_Review (
reviewId INTEGER PRIMARY KEY AUTO_INCREMENT,
upvotes INTEGER,
reliabilityIndex CHAR(20),
comments VARCHAR(100),
datePosted DATE,
username CHAR(20),
restaurantId INTEGER,
FOREIGN KEY (username) REFERENCES Customer_User(username),
FOREIGN KEY (restaurantId) REFERENCES Restaurant(restaurantId) ON DELETE CASCADE
);

INSERT INTO Ingredient VALUES(0, 'milk');
INSERT INTO Ingredient VALUES(1, 'egg');
INSERT INTO Ingredient VALUES(2, 'peanut');
INSERT INTO Ingredient VALUES(3, 'soy');
INSERT INTO Ingredient VALUES(4, 'fish');
INSERT INTO Ingredient VALUES(5, 'corn');
INSERT INTO Ingredient VALUES(6, 'cheese');
INSERT INTO Ingredient VALUES(7, 'pork');
INSERT INTO Ingredient VALUES(8, 'chicken');
INSERT INTO Ingredient VALUES(9, 'beef');
INSERT INTO Ingredient VALUES(10, 'carrot');
INSERT INTO Ingredient VALUES(11, 'celery');
INSERT INTO Ingredient VALUES(12, 'wheat');
INSERT INTO Ingredient VALUES(13, 'mustard');
INSERT INTO Ingredient VALUES(14, 'rice');
INSERT INTO Ingredient VALUES(15, 'butter');
INSERT INTO Ingredient VALUES(16, 'hot pepper');
-- ingredients added for shellfish allergy, non-Kosher and Haram
INSERT INTO Ingredient VALUES(17, 'crab');
INSERT INTO Ingredient VALUES(18, 'lobster');
INSERT INTO Ingredient VALUES(19, 'shrimp');
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Ingredient VALUES(20, 'gai lan');
INSERT INTO Ingredient VALUES(21, 'avocado');
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Ingredient VALUES(22, 'lettuce');
INSERT INTO Ingredient VALUES(23, 'onion');
INSERT INTO Ingredient VALUES(24, 'tomato');
INSERT INTO Ingredient VALUES(25, 'beans');

INSERT INTO Food_Item VALUES(0, 'Thunder Dog', 700, 9.99);
INSERT INTO Food_Item VALUES(1, 'UBC Yogurt', 400, 8.99);
INSERT INTO Food_Item VALUES(2, 'Chinese soy milk', 150, 5.25);
INSERT INTO Food_Item VALUES(3, 'UBC Res Breakfeast Combo', 500, 10.25);
INSERT INTO Food_Item VALUES(4, 'Fancy Pork Bun', 220, 4.75);
INSERT INTO Food_Item VALUES(5, 'Point Grey Seafood Plate', 470, 16.50);
INSERT INTO Food_Item VALUES(6, 'UBC Res Lasagna', 510, 7.99);
INSERT INTO Food_Item VALUES(7, 'Pacific Fish Plate', 380, 15.25);
INSERT INTO Food_Item VALUES(8, 'Japanese Curry Chicken and Rice', 490, 10.10);
INSERT INTO Food_Item VALUES(9, 'Japanese Curry Beef and Rice', 540, 10.10);
INSERT INTO Food_Item VALUES(10, 'Butter Chicken', 480, 12.40);
INSERT INTO Food_Item VALUES(11, 'UBC Super Burger', 650, 12.99);
INSERT INTO Food_Item VALUES(12, 'Pork Belly Noodles', 680, 13.45);
INSERT INTO Food_Item VALUES(13, 'UBC Signature Beef Steak', 710, 14.55);
INSERT INTO Food_Item VALUES(14, 'UBC Spicy Chicken Burger', 550, 12.10);
INSERT INTO Food_Item VALUES(15, 'UBC Ultimate Burrito', 520, 14.15);
INSERT INTO Food_Item VALUES(16, 'UBC Best Brownie', 150, 6.15);
INSERT INTO Food_Item VALUES(17, 'UBC Cheesecake ', 160, 5.19);
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Food_Item VALUES(18, 'Spicy Shrimps', 480, 10.98);
INSERT INTO Food_Item VALUES(19, 'Roasted Pork on Rice', 850, 11.80);
INSERT INTO Food_Item VALUES(20, 'B.B.Q Chicken and Pork Combo', 1020, 12.98);
INSERT INTO Food_Item VALUES(21, 'Shrimp Dumplings', 400, 6.98);
INSERT INTO Food_Item VALUES(22, 'Sliced Beef with Gai Lan', 775, 11.98);
INSERT INTO Food_Item VALUES(23, 'Togo California Combo', 490, 10.50);
INSERT INTO Food_Item VALUES(24, 'Green Salad', 210, 4.50);
INSERT INTO Food_Item VALUES(25, 'Maki Sushi Combo', 485, 11.50);
INSERT INTO Food_Item VALUES(26, 'Beef Box', 720, 11.50);
INSERT INTO Food_Item VALUES(27, 'Salmon Box', 610, 11.50);
INSERT INTO Food_Item VALUES(28, 'Veggie Roll', 240, 5.00);
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Food_Item VALUES(29, 'Falafel Wrap', 570, 7.40);
INSERT INTO Food_Item VALUES(30, 'Al Basha Plate', 830, 12.95);
INSERT INTO Food_Item VALUES(31, 'Veggie Lover', 330, 11.50);
INSERT INTO Food_Item VALUES(32, 'Crab Singapore Chili', 1040, 88.00);
INSERT INTO Food_Item VALUES(33, 'Tiger Shrimps Sambal', 550, 21.99);
INSERT INTO Food_Item VALUES(34, 'Curry Boneless Chicken', 760, 22.00);
INSERT INTO Food_Item VALUES(35, 'Sambal Green Beans', 310, 16.50);
INSERT INTO Food_Item VALUES(36, 'Mixed Steamed Vegetables', 320, 15.00);

INSERT INTO Food_Item_Ingredients VALUES(0, 6);
INSERT INTO Food_Item_Ingredients VALUES(0, 7);
INSERT INTO Food_Item_Ingredients VALUES(0, 12);
INSERT INTO Food_Item_Ingredients VALUES(0, 13);
INSERT INTO Food_Item_Ingredients VALUES(1, 0);
INSERT INTO Food_Item_Ingredients VALUES(2, 3);
INSERT INTO Food_Item_Ingredients VALUES(3, 0);
INSERT INTO Food_Item_Ingredients VALUES(3, 1);
INSERT INTO Food_Item_Ingredients VALUES(3, 6);
INSERT INTO Food_Item_Ingredients VALUES(3, 8);
INSERT INTO Food_Item_Ingredients VALUES(3, 10);
INSERT INTO Food_Item_Ingredients VALUES(3, 12);
INSERT INTO Food_Item_Ingredients VALUES(4, 7);
INSERT INTO Food_Item_Ingredients VALUES(5, 2);
INSERT INTO Food_Item_Ingredients VALUES(5, 4);
INSERT INTO Food_Item_Ingredients VALUES(5, 12);
-- now food item #5 has shellfish
INSERT INTO Food_Item_Ingredients VALUES(5, 17);
INSERT INTO Food_Item_Ingredients VALUES(6, 2);
INSERT INTO Food_Item_Ingredients VALUES(6, 6);
INSERT INTO Food_Item_Ingredients VALUES(6, 15);
INSERT INTO Food_Item_Ingredients VALUES(7, 4);
INSERT INTO Food_Item_Ingredients VALUES(7, 5);
INSERT INTO Food_Item_Ingredients VALUES(7, 10);
INSERT INTO Food_Item_Ingredients VALUES(7, 15);
INSERT INTO Food_Item_Ingredients VALUES(8, 8);
INSERT INTO Food_Item_Ingredients VALUES(8, 10);
INSERT INTO Food_Item_Ingredients VALUES(8, 11);
INSERT INTO Food_Item_Ingredients VALUES(8, 12);
INSERT INTO Food_Item_Ingredients VALUES(8, 14);
INSERT INTO Food_Item_Ingredients VALUES(9, 9);
INSERT INTO Food_Item_Ingredients VALUES(9, 10);
INSERT INTO Food_Item_Ingredients VALUES(9, 11);
INSERT INTO Food_Item_Ingredients VALUES(9, 12);
INSERT INTO Food_Item_Ingredients VALUES(9, 14);
INSERT INTO Food_Item_Ingredients VALUES(10, 2);
INSERT INTO Food_Item_Ingredients VALUES(10, 8);
INSERT INTO Food_Item_Ingredients VALUES(10, 15);
INSERT INTO Food_Item_Ingredients VALUES(11, 6);
INSERT INTO Food_Item_Ingredients VALUES(11, 9);
INSERT INTO Food_Item_Ingredients VALUES(11, 12);
INSERT INTO Food_Item_Ingredients VALUES(11, 13);
INSERT INTO Food_Item_Ingredients VALUES(12, 2);
INSERT INTO Food_Item_Ingredients VALUES(12, 5);
INSERT INTO Food_Item_Ingredients VALUES(12, 7);
INSERT INTO Food_Item_Ingredients VALUES(12, 11);
INSERT INTO Food_Item_Ingredients VALUES(13, 5);
INSERT INTO Food_Item_Ingredients VALUES(13, 9);
INSERT INTO Food_Item_Ingredients VALUES(13, 10);
INSERT INTO Food_Item_Ingredients VALUES(13, 15);
INSERT INTO Food_Item_Ingredients VALUES(14, 6);
INSERT INTO Food_Item_Ingredients VALUES(14, 8);
INSERT INTO Food_Item_Ingredients VALUES(14, 12);
INSERT INTO Food_Item_Ingredients VALUES(14, 13);
INSERT INTO Food_Item_Ingredients VALUES(14, 16);
INSERT INTO Food_Item_Ingredients VALUES(15, 2);
INSERT INTO Food_Item_Ingredients VALUES(15, 5);
INSERT INTO Food_Item_Ingredients VALUES(15, 6);
INSERT INTO Food_Item_Ingredients VALUES(15, 9);
INSERT INTO Food_Item_Ingredients VALUES(15, 11);
INSERT INTO Food_Item_Ingredients VALUES(15, 12);
INSERT INTO Food_Item_Ingredients VALUES(15, 16);
INSERT INTO Food_Item_Ingredients VALUES(16, 0);
INSERT INTO Food_Item_Ingredients VALUES(16, 1);
INSERT INTO Food_Item_Ingredients VALUES(16, 2);
INSERT INTO Food_Item_Ingredients VALUES(17, 0);
INSERT INTO Food_Item_Ingredients VALUES(17, 1);
INSERT INTO Food_Item_Ingredients VALUES(17, 6);
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Food_Item_Ingredients VALUES(18, 16);
INSERT INTO Food_Item_Ingredients VALUES(18, 19);
INSERT INTO Food_Item_Ingredients VALUES(19, 7);
INSERT INTO Food_Item_Ingredients VALUES(19, 14);
INSERT INTO Food_Item_Ingredients VALUES(20, 7);
INSERT INTO Food_Item_Ingredients VALUES(20, 8);
INSERT INTO Food_Item_Ingredients VALUES(20, 10);
INSERT INTO Food_Item_Ingredients VALUES(21, 12);
INSERT INTO Food_Item_Ingredients VALUES(21, 19);
INSERT INTO Food_Item_Ingredients VALUES(22, 9);
INSERT INTO Food_Item_Ingredients VALUES(22, 20);
INSERT INTO Food_Item_Ingredients VALUES(23, 1);
INSERT INTO Food_Item_Ingredients VALUES(23, 3);
INSERT INTO Food_Item_Ingredients VALUES(23, 4);
INSERT INTO Food_Item_Ingredients VALUES(23, 10);
INSERT INTO Food_Item_Ingredients VALUES(23, 13);
INSERT INTO Food_Item_Ingredients VALUES(23, 14);
INSERT INTO Food_Item_Ingredients VALUES(23, 17);
INSERT INTO Food_Item_Ingredients VALUES(24, 10);
INSERT INTO Food_Item_Ingredients VALUES(24, 11);
INSERT INTO Food_Item_Ingredients VALUES(24, 16);
INSERT INTO Food_Item_Ingredients VALUES(24, 21);
INSERT INTO Food_Item_Ingredients VALUES(25, 2);
INSERT INTO Food_Item_Ingredients VALUES(25, 10);
INSERT INTO Food_Item_Ingredients VALUES(25, 11);
INSERT INTO Food_Item_Ingredients VALUES(25, 13);
INSERT INTO Food_Item_Ingredients VALUES(25, 14);
INSERT INTO Food_Item_Ingredients VALUES(25, 19);
INSERT INTO Food_Item_Ingredients VALUES(25, 21);
INSERT INTO Food_Item_Ingredients VALUES(26, 9);
INSERT INTO Food_Item_Ingredients VALUES(26, 14);
INSERT INTO Food_Item_Ingredients VALUES(27, 4);
INSERT INTO Food_Item_Ingredients VALUES(27, 14);
INSERT INTO Food_Item_Ingredients VALUES(28, 5);
INSERT INTO Food_Item_Ingredients VALUES(28, 10);
INSERT INTO Food_Item_Ingredients VALUES(28, 11);
INSERT INTO Food_Item_Ingredients VALUES(28, 13);
INSERT INTO Food_Item_Ingredients VALUES(28, 21);
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Food_Item_Ingredients VALUES(29, 6);
INSERT INTO Food_Item_Ingredients VALUES(29, 9);
INSERT INTO Food_Item_Ingredients VALUES(29, 12);
INSERT INTO Food_Item_Ingredients VALUES(29, 22);
INSERT INTO Food_Item_Ingredients VALUES(30, 6);
INSERT INTO Food_Item_Ingredients VALUES(30, 8);
INSERT INTO Food_Item_Ingredients VALUES(30, 12);
INSERT INTO Food_Item_Ingredients VALUES(30, 22);
INSERT INTO Food_Item_Ingredients VALUES(30, 23);
INSERT INTO Food_Item_Ingredients VALUES(30, 24);
INSERT INTO Food_Item_Ingredients VALUES(31, 10);
INSERT INTO Food_Item_Ingredients VALUES(31, 22);
INSERT INTO Food_Item_Ingredients VALUES(31, 23);
INSERT INTO Food_Item_Ingredients VALUES(31, 24);
INSERT INTO Food_Item_Ingredients VALUES(32, 16);
INSERT INTO Food_Item_Ingredients VALUES(32, 17);
INSERT INTO Food_Item_Ingredients VALUES(32, 21);
INSERT INTO Food_Item_Ingredients VALUES(33, 16);
INSERT INTO Food_Item_Ingredients VALUES(33, 19);
INSERT INTO Food_Item_Ingredients VALUES(33, 24);
INSERT INTO Food_Item_Ingredients VALUES(34, 8);
INSERT INTO Food_Item_Ingredients VALUES(34, 22);
INSERT INTO Food_Item_Ingredients VALUES(35, 5);
INSERT INTO Food_Item_Ingredients VALUES(35, 10);
INSERT INTO Food_Item_Ingredients VALUES(35, 16);
INSERT INTO Food_Item_Ingredients VALUES(35, 21);
INSERT INTO Food_Item_Ingredients VALUES(35, 22);
INSERT INTO Food_Item_Ingredients VALUES(35, 23);
INSERT INTO Food_Item_Ingredients VALUES(35, 25);
INSERT INTO Food_Item_Ingredients VALUES(36, 10);
INSERT INTO Food_Item_Ingredients VALUES(36, 5);
INSERT INTO Food_Item_Ingredients VALUES(36, 22);
INSERT INTO Food_Item_Ingredients VALUES(36, 23);
INSERT INTO Food_Item_Ingredients VALUES(36, 24);

INSERT INTO Menu VALUES(0, "breakfast");
INSERT INTO Menu VALUES(1, "breakfast");
INSERT INTO Menu VALUES(2, "brunch");
INSERT INTO Menu VALUES(3, "lunch");
INSERT INTO Menu VALUES(4, "lunch");
INSERT INTO Menu VALUES(5, "lunch");
INSERT INTO Menu VALUES(6, "dinner");
INSERT INTO Menu VALUES(7, "dinner");
INSERT INTO Menu VALUES(8, "dinner");
INSERT INTO Menu VALUES(9, "dessert");
INSERT INTO Menu VALUES(10, "lunch");
INSERT INTO Menu VALUES(11, "lunch");
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Menu VALUES(12, "lunch");
INSERT INTO Menu VALUES(13, "dinner");
INSERT INTO Menu VALUES(14, "lunch");
INSERT INTO Menu VALUES(15, "dinner");
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Menu VALUES(16, "lunch");
INSERT INTO Menu VALUES(17, "dinner");
INSERT INTO Menu VALUES(18, "lunch");
INSERT INTO Menu VALUES(19, "dinner");

INSERT INTO Part_Of VALUES(0, 1);
INSERT INTO Part_Of VALUES(0, 2);
INSERT INTO Part_Of VALUES(0, 3);
INSERT INTO Part_Of VALUES(0, 6);
INSERT INTO Part_Of VALUES(0, 16);
INSERT INTO Part_Of VALUES(1, 1);
INSERT INTO Part_Of VALUES(1, 2);
INSERT INTO Part_Of VALUES(1, 3);
INSERT INTO Part_Of VALUES(1, 17);
INSERT INTO Part_Of VALUES(2, 0);
INSERT INTO Part_Of VALUES(2, 1);
INSERT INTO Part_Of VALUES(2, 6);
INSERT INTO Part_Of VALUES(2, 16);
INSERT INTO Part_Of VALUES(2, 17);
INSERT INTO Part_Of VALUES(3, 4);
INSERT INTO Part_Of VALUES(3, 5);
INSERT INTO Part_Of VALUES(3, 6);
INSERT INTO Part_Of VALUES(3, 7);
INSERT INTO Part_Of VALUES(4, 4);
INSERT INTO Part_Of VALUES(4, 5);
INSERT INTO Part_Of VALUES(4, 7);
INSERT INTO Part_Of VALUES(4, 10);
INSERT INTO Part_Of VALUES(4, 12);
INSERT INTO Part_Of VALUES(5, 0);
INSERT INTO Part_Of VALUES(5, 7);
INSERT INTO Part_Of VALUES(5, 8);
INSERT INTO Part_Of VALUES(5, 9);
INSERT INTO Part_Of VALUES(5, 12);
INSERT INTO Part_Of VALUES(6, 1);
INSERT INTO Part_Of VALUES(6, 11);
INSERT INTO Part_Of VALUES(6, 12);
INSERT INTO Part_Of VALUES(6, 13);
INSERT INTO Part_Of VALUES(6, 14);
INSERT INTO Part_Of VALUES(6, 15);
INSERT INTO Part_Of VALUES(7, 1);
INSERT INTO Part_Of VALUES(7, 13);
INSERT INTO Part_Of VALUES(7, 14);
INSERT INTO Part_Of VALUES(7, 15);
INSERT INTO Part_Of VALUES(8, 1);
INSERT INTO Part_Of VALUES(8, 5);
INSERT INTO Part_Of VALUES(8, 7);
INSERT INTO Part_Of VALUES(8, 10);
INSERT INTO Part_Of VALUES(8, 16);
INSERT INTO Part_Of VALUES(8, 17);
INSERT INTO Part_Of VALUES(9, 16);
INSERT INTO Part_Of VALUES(9, 17);
INSERT INTO Part_Of VALUES(10, 4);
INSERT INTO Part_Of VALUES(10, 12);
INSERT INTO Part_Of VALUES(11, 10);
INSERT INTO Part_Of VALUES(11, 15);
INSERT INTO Part_Of VALUES(11, 16);
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Part_Of VALUES(12, 18);
INSERT INTO Part_Of VALUES(12, 19);
INSERT INTO Part_Of VALUES(12, 22);
INSERT INTO Part_Of VALUES(13, 18);
INSERT INTO Part_Of VALUES(13, 19);
INSERT INTO Part_Of VALUES(13, 20);
INSERT INTO Part_Of VALUES(13, 21);
INSERT INTO Part_Of VALUES(13, 22);
INSERT INTO Part_Of VALUES(14, 23);
INSERT INTO Part_Of VALUES(14, 24);
INSERT INTO Part_Of VALUES(14, 27);
INSERT INTO Part_Of VALUES(14, 28);
INSERT INTO Part_Of VALUES(15, 25);
INSERT INTO Part_Of VALUES(15, 26);
INSERT INTO Part_Of VALUES(15, 27);
INSERT INTO Part_Of VALUES(15, 28);
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Part_Of VALUES(16, 29);
INSERT INTO Part_Of VALUES(16, 30);
INSERT INTO Part_Of VALUES(16, 31);
INSERT INTO Part_Of VALUES(17, 29);
INSERT INTO Part_Of VALUES(17, 30);
INSERT INTO Part_Of VALUES(17, 31);
INSERT INTO Part_Of VALUES(18, 34);
INSERT INTO Part_Of VALUES(18, 35);
INSERT INTO Part_Of VALUES(18, 36);
INSERT INTO Part_Of VALUES(19, 32);
INSERT INTO Part_Of VALUES(19, 33);
INSERT INTO Part_Of VALUES(19, 34);
INSERT INTO Part_Of VALUES(19, 35);
INSERT INTO Part_Of VALUES(19, 36);

INSERT INTO Restriction VALUES(0, 'gluten', 1);
INSERT INTO Restriction VALUES(1, 'fish', 1);
INSERT INTO Restriction VALUES(2, 'shellfish', 1);
INSERT INTO Restriction VALUES(3, 'dairy products', 1);
INSERT INTO Restriction VALUES(4, 'peanuts', 1);
INSERT INTO Restriction VALUES(5, 'soy', 1);
INSERT INTO Restriction VALUES(6, 'eggs', 1);
INSERT INTO Restriction VALUES(7, 'contains meat', 0);
INSERT INTO Restriction VALUES(8, 'not Halal', 0);
INSERT INTO Restriction VALUES(9, 'not Kosher', 0);

INSERT INTO Restriction_Applies_To_Ingredient VALUES(0, 12);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(1, 4);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(2, 17);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(2, 18);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(2, 19);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(3, 0);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(3, 6);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(3, 15);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(4, 2);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(5, 3);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(6, 1);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(7, 4);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(7, 7);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(7, 8);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(7, 9);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(8, 7);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(8, 17);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(8, 18);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(8, 19);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(9, 7);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(9, 17);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(9, 18);
INSERT INTO Restriction_Applies_To_Ingredient VALUES(9, 19);

INSERT INTO Customer_User VALUES('billJoe', 'password134', 0, 'bill@gmail.com');
INSERT INTO Customer_User VALUES('dairyBoy', 'asdffff', 0, 'milk@yahoo.ca');
INSERT INTO Customer_User VALUES('imVegan111', '8903hd', 0, 'im.vegan@hotmail.com');
INSERT INTO Customer_User VALUES('John111', 'dsff8sdf0', 0, 'john111@gmail.com');
INSERT INTO Customer_User VALUES('manaaa', 'pwooas', 1, 'basdff@mail.com');
INSERT INTO Customer_User VALUES('gordonTheChef', 'gordonTheGreat101', 1, 'gordonRamsay@gmail.com');
INSERT INTO Customer_User VALUES('peanutHater', 'perr121', 0, 'peanutHater@aol.com');
INSERT INTO Customer_User VALUES('richKid', 'richRichRich', 0, 'richKid@gmail.com');
-- user added by Seif
INSERT INTO Customer_User VALUES('chubbyKid', '123', 0, 's@s.com');

INSERT INTO Customer_Cannot_Eat VALUES('billJoe', 3);
INSERT INTO Customer_Cannot_Eat VALUES('billJoe', 8);
INSERT INTO Customer_Cannot_Eat VALUES('dairyBoy', 3);
INSERT INTO Customer_Cannot_Eat VALUES('dairyBoy', 5);
INSERT INTO Customer_Cannot_Eat VALUES('imVegan111', 7);
INSERT INTO Customer_Cannot_Eat VALUES('John111', 4);
INSERT INTO Customer_Cannot_Eat VALUES('John111', 5);
INSERT INTO Customer_Cannot_Eat VALUES('manaaa', 0);
INSERT INTO Customer_Cannot_Eat VALUES('manaaa', 1);
INSERT INTO Customer_Cannot_Eat VALUES('manaaa', 2);
INSERT INTO Customer_Cannot_Eat VALUES('manaaa', 6);
INSERT INTO Customer_Cannot_Eat VALUES('gordonTheChef', 0);
INSERT INTO Customer_Cannot_Eat VALUES('gordonTheChef', 9);
INSERT INTO Customer_Cannot_Eat VALUES('peanutHater', 4);
INSERT INTO Customer_Cannot_Eat VALUES('richKid', 1);
INSERT INTO Customer_Cannot_Eat VALUES('richKid', 2);

INSERT INTO Address VALUES('2015 Main Mall',	'Vancouver', 'BC',	'V6T1W1', 'UBC');
INSERT INTO Address VALUES('2260 West Mall',	'Vancouver', 'BC',	'V6T1Z2', 'UBC');
INSERT INTO Address VALUES('2125 Main Mall',	'Vancouver', 'BC',	'V6T1W3', 'UBC');
INSERT INTO Address VALUES('6363 Agrnomy Road',	'Vancouver',	'BC',	'V6T1D5', 'UBC');
INSERT INTO Address VALUES('2525 West Mall',	'Vancouver',	'BC',	'V6T1Z3', 'UBC');
INSERT INTO Address VALUES('2201 Main Mall',	'Vancouver',	'BC',	'V6T1W2', 'UBC');
INSERT INTO Address VALUES('2203 Main Mall',	'Vancouver',	'BC',	'V6T1W2', 'UBC');
INSERT INTO Address VALUES('6133 University Boulevard',	'Vancouver',	'BC',	'V6T1E4', 'UBC');
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Address VALUES('3337 Shrum Lane', 'Vancouver', 'BC', 'V6S0C8', 'Wesbrook Village');
INSERT INTO Address VALUES('3380 Shrum Lane', 'Vancouver', 'BC', 'V6S0B9', 'Wesbrook Village');
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Address VALUES('1937 Cornwall Ave', 'Vancouver', 'BC', 'V6J1C8', 'Kitsilano');
INSERT INTO Address VALUES('3005 W. Broadway', 'Vancouver', 'BC', 'V6K2G9', 'Kitsilano');
-- following are for dummy_owner
INSERT INTO Address VALUES('Whatever Rd', 'Vancouver', 'BC', 'A0A1B1', 'UBC');

INSERT INTO Dining_Type VALUES(0, 'cafe');
INSERT INTO Dining_Type VALUES(1, 'residence dining');
INSERT INTO Dining_Type VALUES(2, 'food truck');
INSERT INTO Dining_Type VALUES(3, 'campus partner');
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Dining_Type VALUES(4, 'off campus');

INSERT INTO Owner_User VALUES('bentoOwner', 'adfferg', 'bentoBoss@gmail.com');
INSERT INTO Owner_User VALUES('loopOwner', 'sjfle', 'loopBoss@mail.ubc.ca');
INSERT INTO Owner_User VALUES('nevilleOwner', 'eres23', 'nevilleMaster@hotmail.com');
INSERT INTO Owner_User VALUES('ocOwner', 'rttf1455', 'orchardMasterChef@outlook.com');
INSERT INTO Owner_User VALUES('feastOwner', '4455$$', 'feastOwner@gmail.com');
INSERT INTO Owner_User VALUES('hnOwner', '46465--', 'hungryN@mail.ubc.ca');
INSERT INTO Owner_User VALUES('tdhOwner', 'slfelfs1222', 'theDogHouse@gmail.com');
INSERT INTO Owner_User VALUES('gneOwner', 'qroqoi$$', 'grandNoodleUBC@aol.com');
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Owner_User VALUES('nckOwner', 'aeiou123', 'nepchikitch@gmail.com');
INSERT INTO Owner_User VALUES('togosOwner', 'sfs11##', 'contact@togosushi.ca');
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Owner_User VALUES('alOwner', 'alawesome!', 'bossOfAl@gmail.com');
INSERT INTO Owner_User VALUES('balfOwner', 'rkff3@@', 'theBestBoss@yahoo.ca');
-- following is the dummy owner which we have to manually insert to db here to ensure integrity of the script
INSERT INTO Owner_User VALUES('dummy_owner', 'haha', 'dummy_owner@dummy.com');

INSERT INTO Restaurant VALUES(0,	'Bento Sushi',	'Japanese',	'bentoOwner',	0);
INSERT INTO Restaurant VALUES(1,	'The Loop Cafe',	'Canadian',	'loopOwner',	0);
INSERT INTO Restaurant VALUES(2,	'Neville Cafe',	'American',	'nevilleOwner',	0);
INSERT INTO Restaurant VALUES(3,	'Open Kitchen',	'International',	'ocOwner',	1);
INSERT INTO Restaurant VALUES(4,	'Feast',	'International',	'feastOwner',	1);
INSERT INTO Restaurant VALUES(5,	'Hungry Nomad',	'American',	'hnOwner',	2);
INSERT INTO Restaurant VALUES(6,	'The Dog House',	'European',	'tdhOwner',	2);
INSERT INTO Restaurant VALUES(7,	'Grand Noodle Emporium',	'Chinese',	'gneOwner',	3);
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Restaurant VALUES(8,  'Neptune Chinese Kitchen', 'Chinese', 'nckOwner', 4);
INSERT INTO Restaurant VALUES(9,  'Togo Sushi', 'Japanese', 'togosOwner', 4);
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Restaurant VALUES(10, 'Al Basha', 'Arabic', 'alOwner', 4);
INSERT INTO Restaurant VALUES(11, 'Banana Leaf', 'Malaysian', 'balfOwner', 4);
-- following are for dummy_owner
INSERT INTO Restaurant VALUES(13, 'Worst Food Ever', 'International', 'dummy_owner', 4);

INSERT INTO Contact_Info VALUES('6041110000', 'bentoSushi@mail.ubc.ca', '2015 Main Mall', 'Vancouver', 'BC', 0);
INSERT INTO Contact_Info VALUES('6041110001', 'theLoop@mail.ubc.ca', '2260 West Mall', 'Vancouver', 'BC', 1);
INSERT INTO Contact_Info VALUES('6041110002', 'neville@mail.ubc.ca', '2125 Main Mall', 'Vancouver', 'BC', 2);
INSERT INTO Contact_Info VALUES('6041110003', 'openKitchen@mail.ubc.ca', '6363 Agrnomy Road', 'Vancouver', 'BC', 3);
INSERT INTO Contact_Info VALUES('6041110004', 'feast@mail.ubc.ca', '2525 West Mall', 'Vancouver', 'BC', 4);
INSERT INTO Contact_Info VALUES('6041110005', 'hungryNomad@mail.ubc.ca', '2201 Main Mall', 'Vancouver', 'BC', 5);
INSERT INTO Contact_Info VALUES('6041110006', 'theDogHouse@mail.ubc.ca', '2203 Main Mall', 'Vancouver', 'BC', 6);
INSERT INTO Contact_Info VALUES('6041110007', 'grandNoodle@mail.ubc.ca', '6133 University Boulevard', 'Vancouver', 'BC', 7);
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO Contact_Info VALUES('6042220000', 'contact@neptuneck.com', '3337 Shrum Lane', 'Vancouver', 'BC', 8);
INSERT INTO Contact_Info VALUES('6042220001', 'contact@togosushi.ca', '3380 Shrum Lane', 'Vancouver', 'BC', 9);
-- following tuples are added for restaurants in Kitsilano
INSERT INTO Contact_Info VALUES('6043330000', 'alBasha@alBasha.com', '1937 Cornwall Ave', 'Vancouver', 'BC', 10);
INSERT INTO Contact_Info VALUES('6043330001', 'contact@bananaleaf.ca', '3005 W. Broadway', 'Vancouver', 'BC', 11);
-- following are for dummy_owner
INSERT INTO Contact_Info VALUES('7781231123', 'donotemail@yahoo.com', 'Whatever Rd', 'Vancouver', 'BC', 13);

-- some tuples are temporarily removed to make implicit 1:many relationship for Restaurant:Menu
INSERT INTO Offered_Items VALUES(0, 5);
-- INSERT INTO Offered_Items VALUES(0, 9);
-- INSERT INTO Offered_Items VALUES(1, 0);
-- INSERT INTO Offered_Items VALUES(1, 1);
INSERT INTO Offered_Items VALUES(1, 9);
-- INSERT INTO Offered_Items VALUES(2, 0);
INSERT INTO Offered_Items VALUES(2, 2);
-- INSERT INTO Offered_Items VALUES(2, 9);
-- INSERT INTO Offered_Items VALUES(3, 0);
-- INSERT INTO Offered_Items VALUES(3, 1);
-- INSERT INTO Offered_Items VALUES(3, 2);
-- INSERT INTO Offered_Items VALUES(3, 3);
INSERT INTO Offered_Items VALUES(3, 6);
-- INSERT INTO Offered_Items VALUES(3, 8);
-- INSERT INTO Offered_Items VALUES(3, 9);
-- INSERT INTO Offered_Items VALUES(4, 0);
-- INSERT INTO Offered_Items VALUES(4, 1);
-- INSERT INTO Offered_Items VALUES(4, 2);
-- INSERT INTO Offered_Items VALUES(4, 5);
INSERT INTO Offered_Items VALUES(4, 7);
-- INSERT INTO Offered_Items VALUES(4, 8);
-- INSERT INTO Offered_Items VALUES(4, 9);
-- INSERT INTO Offered_Items VALUES(5, 2);
INSERT INTO Offered_Items VALUES(5, 11);
-- INSERT INTO Offered_Items VALUES(6, 2);
INSERT INTO Offered_Items VALUES(6, 9);
INSERT INTO Offered_Items VALUES(7, 10);
-- following tuples are added for restaurants in Wesbrook Village
-- INSERT INTO Offered_Items VALUES(8, 12);
INSERT INTO Offered_Items VALUES(8, 13);
-- INSERT INTO Offered_Items VALUES(9, 14);
INSERT INTO Offered_Items VALUES(9, 15);
-- following tuples are added for restaurants in Kitsilano
-- INSERT INTO Offered_Items VALUES(10, 16);
INSERT INTO Offered_Items VALUES(10, 17);
-- INSERT INTO Offered_Items VALUES(11, 18);
INSERT INTO Offered_Items VALUES(11, 19);
-- following is for dummy_owner
INSERT INTO Offered_Items VALUES(13, 18);

-- reliabilityIndex = 'undecided' for 0<=upvotes<=4
--                  = 'may be reliable' for 5<=upvotes<=9
--                  = 'reliable' for upvotes>=10
INSERT INTO User_Review VALUES (0, 0, 'undecided', 'good restaurant', '2018-10-1', 'billJoe', 0);
INSERT INTO User_Review VALUES (1, 1, 'undecided', 'I do not like this one', '2019-1-2', 'dairyBoy', 1);
INSERT INTO User_Review VALUES (2, 2, 'undecided', 'I do not like their meat since I am vegan', '2019-2-3', 'imVegan111', 2);
INSERT INTO User_Review VALUES (3, 9, 'may be reliable', 'I love meat but they do not have much', '2018-5-5', 'John111', 3);
INSERT INTO User_Review VALUES (4, 300, 'reliable', 'pile of garbage', '2019-2-22', 'manaaa', 4);
INSERT INTO User_Review VALUES (5, 210, 'reliable', 'their food contains too many allergens', '2019-2-1', 'gordonTheChef', 5);
INSERT INTO User_Review VALUES (6, 99, 'reliable', 'they have too many dishes with peanut', '2018-5-5', 'peanutHater', 6);
INSERT INTO User_Review VALUES (7, 8, 'may be reliable', 'their food are just gross', '2019-2-25', 'richKid', 7);
-- following tuples are added for restaurants in Wesbrook Village
INSERT INTO User_Review VALUES (8, 44, 'reliable', 'food in general is good, but too much seafood', '2018-12-31', 'manaaa', 8);
INSERT INTO User_Review VALUES (9, 6, 'may be reliable', 'gotta thumb up for not hitting my allergies', '2018-9-5', 'dairyBoy', 8);
INSERT INTO User_Review VALUES (10, 19, 'reliable', 'food taste good, but contain a lot of allergens', '2019-3-1', 'peanutHater', 9);
INSERT INTO User_Review VALUES (11, 0, 'undecided', 'Their food taste bland', '2019-3-14', 'gordonTheChef', 9);
-- following tuples are added for restaurants in Kitsilano
INSERT INTO User_Review VALUES (12, 1, 'undecided', 'food are healthy and taste great', '2018-10-13', 'billJoe', 10);
INSERT INTO User_Review VALUES (13, 10, 'reliable', 'food are fine but a bit dry', '2018-10-13', 'gordonTheChef', 10);
INSERT INTO User_Review VALUES (14, 55, 'reliable', 'food are great but quite expesive', '2018-11-21', 'John111', 11);
INSERT INTO User_Review VALUES (15, 0, 'undecided', 'i do not see it being expensive a big deal', '2018-11-22', 'richKid', 11);
INSERT INTO User_Review VALUES (16, 3, 'may be reliable', 'another place with too much sea food', '2019-2-26', 'manaaa', 11);
-- following is for dummy owner
INSERT INTO User_Review VALUES (30, 0, 'undecided', 'this place is real bad', '2019-3-27', 'billJoe', 13);
-- following are added by Seif. Some dependent tuples missing
INSERT INTO User_Review VALUES (18, 0, 'undecided', "absolutely hated it!", '2019-02-10', 'chubbyKid', 1);
INSERT INTO User_Review VALUES (19, 0, 'undecided', "absolutely hated it!", '2019-01-10', 'chubbyKid', 2);
INSERT INTO User_Review VALUES (20, 0, 'undecided', "absolutely hated it!", '2019-03-11', 'chubbyKid', 3);
INSERT INTO User_Review VALUES (21, 0, 'undecided', "absolutely hated it!", '2019-03-12', 'chubbyKid', 4);
INSERT INTO User_Review VALUES (22, 0, 'undecided', "absolutely hated it!", '2019-03-13', 'chubbyKid', 5);
INSERT INTO User_Review VALUES (23, 0, 'undecided', "absolutely hated it!", '2019-03-14', 'chubbyKid', 6);
INSERT INTO User_Review VALUES (24, 0, 'undecided', "absolutely hated it!", '2019-03-15', 'chubbyKid', 7);
INSERT INTO User_Review VALUES (25, 0, 'undecided', "absolutely hated it!", '2019-03-16', 'chubbyKid', 8);
INSERT INTO User_Review VALUES (26, 0, 'undecided', "absolutely hated it!", '2019-03-17', 'chubbyKid', 9);
INSERT INTO User_Review VALUES (27, 0, 'undecided', "absolutely hated it!", '2019-03-18', 'chubbyKid', 10);
INSERT INTO User_Review VALUES (28, 0, 'undecided', "absolutely hated it!", '2019-03-19', 'chubbyKid', 11);

DELIMITER $$

create procedure update_reliabilityIndex (in review_id INTEGER)
begin

declare upvote_count integer;
declare new_index char(20);

select upVotes into upvote_count
from user_review
where reviewId = review_id;

if upvote_count <= 4 then
  set new_index = 'undecided';
elseif upvote_count <= 9 then
  set new_index = 'may be reliable';
else
  set new_index = 'reliable';
end if;

update user_review set reliabilityIndex = new_index where reviewId = review_id;

end$$

DELIMITER ;

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
