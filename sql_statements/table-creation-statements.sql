CREATE TABLE Ingredient (
ingredientId INTEGER PRIMARY KEY,
ingredientName CHAR(20)
);

CREATE TABLE Food_Item (
foodItemId INTEGER PRIMARY KEY,
name CHAR(20),
calories INTEGER,
price REAL
);

CREATE TABLE Food_Item_Ingredients (
foodItemId INTEGER,
ingredientId INTEGER,
PRIMARY KEY(foodItemId, ingredientId),
FOREIGN KEY (foodItemId) REFERENCES Food_Item,
FOREIGN KEY (ingredientId) REFERENCES Ingredient
);

CREATE TABLE Menu (
menuId INTEGER PRIMARY KEY,
menuType CHAR(40)
);

CREATE TABLE Part_Of (
menuId INTEGER,
foodId INTEGER,
PRIMARY KEY(menuId,foodId),
FOREIGN KEY menuId REFERENCES Menu,
FOREIGN KEY foodItemId REFERENCES Food_Item
);

CREATE TABLE Restriction (
restrictionId INTEGER PRIMARY KEY,
name char(20),
isAllergy BIT
);

CREATE TABLE Restriction_Applies_To_Food_Item (
foodItemId INTEGER,
restrictionId INTEGER,
PRIMARY KEY(foodItemId, restrictionId),
FOREIGN KEY (foodItemId) REFERENCES Food_Item,
FOREIGN KEY (restrictionId) REFERENCES Restriction
);

CREATE TABLE Customer_User (
username CHAR(20) PRIMARY KEY,
password CHAR(20),
isVerified BIT,
email CHAR(40) UNIQUE,
);

CREATE TABLE Customer_Cannot_Eat (
username CHAR(20),
restrictionId INTEGER,
PRIMARY KEY(username, restrictionId),
FOREIGN KEY (username) REFERENCES Customer_User ON DELETE
CASCADE,
FOREIGN KEY (restrictionId) REFERENCES Restriction ON DELETE CASCADE
);

CREATE TABLE Address (
streetName CHAR(100),
city CHAR(20),
province CHAR(2),
postalCode CHAR(6),
PRIMARY KEY (streetName, city, province)
);

CREATE TABLE Dining_Type (
diningTypeId INTEGER PRIMARY KEY,
diningTypeName CHAR(20)
);

CREATE TABLE Owner_User (
username CHAR(20) PRIMARY KEY,
password CHAR(20),
email CHAR(40) UNIQUE
);

CREATE TABLE Restaurant (
restaurantId INTEGER PRIMARY KEY,
name CHAR(40),
cuisine CHAR(20),
username CHAR(20) NOT NULL UNIQUE,
diningTypeId INTEGER,
FOREIGN KEY username REFERENCES Owner_User ON DELETE CASCADE,
FOREIGN KEY diningTypeId REFERENCES Dining_Type
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
FOREIGN KEY restaurantid REFERENCES Restaurant,
FOREIGN KEY menuId REFERENCES Menu
);

CREATE TABLE User_Review (
reviewId INTEGER PRIMARY KEY,
upvotes INTEGER,
downvotes INTEGER,
reliabilityIndex CHAR(20),
comments VARCHAR(100),
datePosted DATE,
username CHAR(20),
restaurantId INTEGER,
FOREIGN KEY username REFERENCES Customer_User(username),
FOREIGN KEY restaurantId REFERENCES Restaurant(restaurantId),
);
