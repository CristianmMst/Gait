/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: gait
-- ------------------------------------------------------
-- Server version	10.11.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_051db7d37d478a69a7432df147` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES
(1,'Cristian','cristianmmst@gmail.com','$2a$12$JlqhooEQMzubV2RyCYuYSe8Hqp6OYFjze4mhlqEP59zrqTGYW/xiC');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_96db6bbbaa6f23cad26871339b` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES
(1,'3M'),
(5,'BBS'),
(2,'Devilbiss'),
(3,'Meguiar\'s'),
(4,'Osram');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8b0be371d28245da6e4f4b6187` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'Pinturas Automotrices','Pinturas y recubrimientos para personalización de autos.'),
(2,'Herramientas de Pintura','Equipos y herramientas para aplicar pintura en autos.'),
(3,'Accesorios de Personalización','Accesorios para modificar y mejorar la estética del automóvil.'),
(4,'Iluminación Automotriz','Luces LED y otros sistemas de iluminación para autos.'),
(5,'Rines y Llantas','Opciones de rines y llantas deportivas para vehículos.');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distributors`
--

DROP TABLE IF EXISTS `distributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributors` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ca7745eacdc88a1fe60688eeba` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distributors`
--

LOCK TABLES `distributors` WRITE;
/*!40000 ALTER TABLE `distributors` DISABLE KEYS */;
INSERT INTO `distributors` VALUES
(123456789,'Empresa 1','empresa1@gmail.com','$2b$08$Ehh8uOijHzGvKSXj8PQlY.LxhMVjDRUAXJlmhkzUp87pPb9FGwxHG','Medellin');
/*!40000 ALTER TABLE `distributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 0,
  `phone` varchar(20) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `distributorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_765bc1ac8967533a04c74a9f6a` (`email`),
  KEY `FK_24d98872eb52c3edb30ce96c1e9` (`roleId`),
  KEY `FK_23a5975d76d021108c639f99e5a` (`distributorId`),
  CONSTRAINT `FK_23a5975d76d021108c639f99e5a` FOREIGN KEY (`distributorId`) REFERENCES `distributors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_24d98872eb52c3edb30ce96c1e9` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES
(1033676273,'Cristian','Mora','cristianmmst@gmail.com','$2b$08$qJBE954T.ec3tevdzWF0K.g5FDF/kM0il3aZuONigXO0KgAj2aQgO',0,'3209225171',1,123456789);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `discount` decimal(5,2) NOT NULL DEFAULT 0.00,
  `description` varchar(500) NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `brandId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ea86d0c514c4ecbb5694cbf57df` (`brandId`),
  KEY `FK_ff56834e735fa78a15d0cf21926` (`categoryId`),
  CONSTRAINT `FK_ea86d0c514c4ecbb5694cbf57df` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_ff56834e735fa78a15d0cf21926` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'https://ik.imagekit.io/ProjectGait/aplicador-de-microfibra-con-bolsillo.png','Aplicador de microfibra con bolsillo',105350.00,0.00,'',0,1,1),
(2,'https://ik.imagekit.io/ProjectGait/guante-de-microfibra-para-lavado.png','Guante de microfibra para lavado',57000.00,0.00,'',0,1,1),
(3,'https://ik.imagekit.io/ProjectGait/kit-menzerna-1-litro.png','Kit Menzerna 1 Litro',366050.00,0.00,'',0,1,1),
(4,'https://ik.imagekit.io/ProjectGait/kit-menzerna-250-ml-power-lock.png','Kit Menzerna 250 ml Power Lock',167350.00,0.00,'',0,1,1),
(5,'https://ik.imagekit.io/ProjectGait/kit-menzerna-corte-medio-y-carnauba.png','Kit Menzerna corte medio y Carnauba',133050.00,0.00,'',0,1,1),
(6,'https://ik.imagekit.io/ProjectGait/kit-menzerna-heavy-cut-400-250ml.png','Kit Menzerna Heavy Cut 400 250ml',155650.00,0.00,'',0,1,1),
(7,'https://ik.imagekit.io/ProjectGait/kit-pomo-espuma-menzerna-3.png','Kit Pomo Espuma Menzerna 3',188200.00,0.00,'',0,1,1),
(8,'https://ik.imagekit.io/ProjectGait/kit-pomo-espuma-menzerna-5.png','Kit Pomo Espuma Menzerna 5',316400.00,0.00,'',0,1,1),
(9,'https://ik.imagekit.io/ProjectGait/menzerna-cut-force-pro-1-litro.png','Menzerna Cut Force Pro 1 Litro',296250.00,0.00,'',0,1,1),
(10,'https://ik.imagekit.io/ProjectGait/menzerna-kit-250ml.png','Menzerna Kit 250ml',248550.00,0.00,'',0,1,1),
(11,'https://ik.imagekit.io/ProjectGait/microfibra-para-vidrios-paquete-x-6-unidades.png','Microfibra para vidrios paquete x 6 unidades',92500.00,0.00,'',0,1,1),
(12,'https://ik.imagekit.io/ProjectGait/pano-microfibra-600gsm-x-6-unidades.png','Paño Microfibra 600gsm x 6 unidades',138600.00,0.00,'',0,1,1),
(13,'https://ik.imagekit.io/ProjectGait/pulidora-rotativa-ep812.png','Pulidora Rotativa EP812',929700.00,0.00,'',0,1,1),
(14,'https://ik.imagekit.io/ProjectGait/toalla-microfibra-waffle-de-secado-paquete-x-6-unidades.png','Toalla Microfibra Waffle de Secado paquete x 6 unidades',185000.00,0.00,'',0,1,1),
(15,'https://ik.imagekit.io/ProjectGait/brillo-y-proteccion-de-neumaticos.png','Brillo y protección de neumáticos',38250.00,0.00,'',0,1,1),
(16,'https://ik.imagekit.io/ProjectGait/cera-pulidora-humeda-650ml.png','Cera pulidora húmeda 650ml',32250.00,0.00,'',0,1,1),
(17,'https://ik.imagekit.io/ProjectGait/champu-para-autos-1lt.png','Champú para autos 1Lt',26250.00,0.00,'',0,1,1),
(18,'https://ik.imagekit.io/ProjectGait/limpiador-de-plasticos-650ml.png','Limpiador de plásticos 650ml',28900.00,0.00,'',0,1,1),
(19,'https://ik.imagekit.io/ProjectGait/limpiador-de-rines-650ml.png','Limpiador de rines 650ml',49600.00,0.00,'',0,1,1),
(20,'https://ik.imagekit.io/ProjectGait/limpiador-de-tapiceria-650ml.png','Limpiador de tapicería 650ml',31650.00,0.00,'',0,1,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_648e3f5447f725579d7d4ffdfb` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'ADMIN','Administrador con control total sobre la cuenta del distribuidor, incluyendo la gestión de empleados y productos'),
(2,'VIEWER','Empleado con acceso solo de lectura para consultar pedidos, productos y reportes'),
(3,'MODERATOR','Empleado con permisos intermedios, puede gestionar productos, ver pedidos y apoyar en la atención al cliente');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-18 14:10:28
