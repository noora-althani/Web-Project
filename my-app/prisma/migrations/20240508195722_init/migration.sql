-- CreateTable
CREATE TABLE "Seller" (
    "sellerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seller_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "manufacturerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturer_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Car" (
    "carID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model_name" TEXT NOT NULL,
    "year" DATETIME NOT NULL,
    "price" DECIMAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "manufacturerIDFK" INTEGER NOT NULL,
    "sellerIDFK" INTEGER NOT NULL,
    CONSTRAINT "Car_sellerIDFK_fkey" FOREIGN KEY ("sellerIDFK") REFERENCES "Seller" ("sellerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_manufacturerIDFK_fkey" FOREIGN KEY ("manufacturerIDFK") REFERENCES "Manufacturer" ("manufacturerID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contact_info" (
    "contact_infoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mobile_num" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "customerIDFk" INTEGER NOT NULL,
    CONSTRAINT "Contact_info_customerIDFk_fkey" FOREIGN KEY ("customerIDFk") REFERENCES "Customer" ("customerID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Shipping_addres" (
    "addresID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zone" INTEGER NOT NULL,
    "str" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "house_num" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "customerIDFK" INTEGER NOT NULL,
    CONSTRAINT "Shipping_addres_customerIDFK_fkey" FOREIGN KEY ("customerIDFK") REFERENCES "Customer" ("customerID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bank_account" (
    "accountID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_balance" DECIMAL NOT NULL,
    "iban" TEXT NOT NULL,
    "customerIDFK" INTEGER NOT NULL,
    CONSTRAINT "Bank_account_customerIDFK_fkey" FOREIGN KEY ("customerIDFK") REFERENCES "Customer" ("customerID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "orderID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_num" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "carIDFK" INTEGER NOT NULL,
    "customerIDFK" INTEGER NOT NULL,
    CONSTRAINT "Order_carIDFK_fkey" FOREIGN KEY ("carIDFK") REFERENCES "Car" ("carID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_customerIDFK_fkey" FOREIGN KEY ("customerIDFK") REFERENCES "Customer" ("customerID") ON DELETE RESTRICT ON UPDATE CASCADE
);
