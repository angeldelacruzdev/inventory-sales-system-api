/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100418
 Source Host           : localhost:3306
 Source Schema         : sales_db

 Target Server Type    : MySQL
 Target Server Version : 100418
 File Encoding         : 65001

 Date: 15/05/2022 17:36:13
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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_22cc43e9a74d7498546e9a63e7`(`name` ASC) USING BTREE,
  INDEX `IDX_29a733971f71626611bb3808eb`(`description`(768) ASC) USING BTREE,
  INDEX `IDX_7ac18742b02b8af41afdaa3b9a`(`barcode` ASC) USING BTREE,
  INDEX `FK_ff0c0301a95e517153df97f6812`(`categoryId` ASC) USING BTREE,
  INDEX `FK_329b8ae12068b23da547d3b4798`(`userId` ASC) USING BTREE,
  CONSTRAINT `FK_329b8ae12068b23da547d3b4798` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
