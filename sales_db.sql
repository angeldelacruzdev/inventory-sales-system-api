/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100418
 Source Host           : localhost:3306
 Source Schema         : sales_db

 Target Server Type    : MySQL
 Target Server Version : 100418
 File Encoding         : 65001

 Date: 24/05/2022 17:31:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for configuration
-- ----------------------------
DROP TABLE IF EXISTS `configuration`;
CREATE TABLE `configuration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `invoice_message` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Mensaje de factura, ejemplo: Gracias por preferirnos.',
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `currency` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dni` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `address2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `phone1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kind` int NULL DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` bigint UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_48543caf637ebceeca548ca8be`(`full_name`) USING BTREE,
  INDEX `IDX_d2d717efd90709ebd3cb26b936`(`email`) USING BTREE,
  INDEX `IDX_4f83f47c3d77d87ccb066c91af`(`dni`) USING BTREE,
  INDEX `IDX_3aaa004a2034f64fe353e51440`(`company`) USING BTREE,
  INDEX `IDX_67047f2131dad8897a7e479854`(`phone1`) USING BTREE,
  INDEX `FK_83b775da14886d352de2a4cac01`(`userId`) USING BTREE,
  CONSTRAINT `FK_83b775da14886d352de2a4cac01` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `barcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `inventory_min` int NOT NULL,
  `unit` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `presentation` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price_in` decimal(14, 4) NOT NULL,
  `price_out` decimal(14, 4) NOT NULL,
  `is_active` tinyint NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `categoryId` bigint UNSIGNED NULL DEFAULT NULL,
  `userId` bigint UNSIGNED NULL DEFAULT NULL,
  `offer_price` decimal(14, 4) NOT NULL,
  `taxes` decimal(14, 4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_22cc43e9a74d7498546e9a63e7`(`name`) USING BTREE,
  INDEX `IDX_29a733971f71626611bb3808eb`(`description`(768)) USING BTREE,
  INDEX `IDX_7ac18742b02b8af41afdaa3b9a`(`barcode`) USING BTREE,
  INDEX `FK_ff0c0301a95e517153df97f6812`(`categoryId`) USING BTREE,
  INDEX `FK_329b8ae12068b23da547d3b4798`(`userId`) USING BTREE,
  CONSTRAINT `FK_329b8ae12068b23da547d3b4798` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sales
-- ----------------------------
DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `total` decimal(14, 4) NOT NULL,
  `discount` decimal(14, 4) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `personId` bigint UNSIGNED NULL DEFAULT NULL,
  `userId` bigint UNSIGNED NULL DEFAULT NULL,
  `cash` decimal(14, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_7fff6e99af6649a373a81997af0`(`personId`) USING BTREE,
  INDEX `FK_52ff6cd9431cc7687c76f935938`(`userId`) USING BTREE,
  CONSTRAINT `FK_52ff6cd9431cc7687c76f935938` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_7fff6e99af6649a373a81997af0` FOREIGN KEY (`personId`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 92 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sales_products_product
-- ----------------------------
DROP TABLE IF EXISTS `sales_products_product`;
CREATE TABLE `sales_products_product`  (
  `salesId` bigint UNSIGNED NOT NULL,
  `productId` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`salesId`, `productId`) USING BTREE,
  INDEX `IDX_869a150806b6f5ec6f2fea9e79`(`salesId`) USING BTREE,
  INDEX `IDX_0165e11f6a5d18a05fb30de63e`(`productId`) USING BTREE,
  CONSTRAINT `FK_0165e11f6a5d18a05fb30de63e0` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_869a150806b6f5ec6f2fea9e791` FOREIGN KEY (`salesId`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `hashdRt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `full_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT 1,
  `is_admin` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
