-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `nDepartmentID` tinyint NOT NULL AUTO_INCREMENT,
  `cName` varchar(64) NOT NULL,
  PRIMARY KEY (`nDepartmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Engineering '),(2,'Marketing'),(3,'Finance'),(4,'Human Resources'),(5,'Research and Development'),(6,'Sales'),(8,'IT'),(12,'Kyrie Irving CLUB');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_proy`
--

DROP TABLE IF EXISTS `emp_proy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_proy` (
  `nEmployeeID` smallint NOT NULL,
  `nProjectID` tinyint NOT NULL,
  PRIMARY KEY (`nEmployeeID`,`nProjectID`),
  KEY `nProjectID` (`nProjectID`),
  CONSTRAINT `emp_proy_ibfk_1` FOREIGN KEY (`nEmployeeID`) REFERENCES `employee` (`nEmployeeID`) ON DELETE CASCADE,
  CONSTRAINT `emp_proy_ibfk_2` FOREIGN KEY (`nProjectID`) REFERENCES `project` (`nProjectID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_proy`
--

LOCK TABLES `emp_proy` WRITE;
/*!40000 ALTER TABLE `emp_proy` DISABLE KEYS */;
INSERT INTO `emp_proy` VALUES (1,1),(5,1),(3,3),(14,3),(4,4),(14,4),(1,5),(8,5),(15,5),(2,6),(8,6),(15,6),(3,7),(16,7),(3,8),(16,8),(4,9),(11,9),(4,10),(18,10),(5,11),(18,11),(5,12),(13,12),(6,13),(14,13),(15,14),(16,15),(8,16),(18,17),(11,20);
/*!40000 ALTER TABLE `emp_proy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `nEmployeeID` smallint NOT NULL AUTO_INCREMENT,
  `cFirstName` varchar(64) NOT NULL,
  `cLastName` varchar(64) NOT NULL,
  `cEmail` varchar(320) NOT NULL,
  `dBirth` date NOT NULL,
  `nDepartmentID` tinyint NOT NULL,
  PRIMARY KEY (`nEmployeeID`),
  KEY `nDepartmentID` (`nDepartmentID`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`nDepartmentID`) REFERENCES `department` (`nDepartmentID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'John','Doe','john.doe@example.com','1985-06-15',1),(2,'Jane','Smith','jane.smith@example.com','1990-04-22',2),(3,'Michael','Brown','michael.brown@example.com','1982-12-10',3),(4,'Emily','Davis','emily.davis@example.com','1993-03-30',4),(5,'David','Wilson','david.wilson@example.com','1987-09-14',5),(6,'Emma','Taylor','emma.taylor@example.com','1995-07-21',6),(8,'Olivia','Martinez','olivia.martinez@example.com','1992-08-27',8),(11,'Ethan','White','ethan.white@example.com','1983-02-17',1),(13,'Liam','Rodriguez','liam.rodriguez@example.com','1986-12-25',3),(14,'Isabella','Lewis','isabella.lewis@example.com','1993-07-09',4),(15,'Noah','Walker','noah.walker@example.com','1989-05-29',5),(16,'Mia','Allen','mia.allen@example.com','1996-01-12',6),(18,'Charlotte','Scott','charlotte.scott@example.com','1990-11-30',8),(21,'Lucas','Gonzalez','lucas.gonzalez@example.com','1982-04-16',1),(22,'Harper','Nelson','harper.nelson@example.com','1990-06-19',2),(23,'Benjamin','Carter','benjamin.carter@example.com','1986-10-07',2),(24,'Evelyn','Mitchell','evelyn.mitchell@example.com','1995-12-29',4),(27,'Navid mirage_love','thelegend27','mail@mail.com','2000-01-01',1),(28,'Daniel','IGL legend27','legend@mail.com','2000-01-01',1),(33,'I used to be','hello world','hwwh@mail.com','2000-01-01',1),(34,'valde','mar','vm@mail.com','2000-01-01',1),(35,'new employee27','191919','new@emp.dk','2000-01-01',2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `nProjectID` tinyint NOT NULL AUTO_INCREMENT,
  `cName` varchar(128) NOT NULL,
  PRIMARY KEY (`nProjectID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'AI Research Initiative #3'),(3,'Financial Audit 2024'),(4,'Talent Acquisition Strategy'),(5,'Cloud Migration'),(6,'Customer Engagement Program'),(7,'Cybersecurity Overhaul'),(8,'Market Expansion Plan'),(9,'Supply Chain Optimization'),(10,'Green Energy Initiative'),(11,'Mobile App Development'),(12,'Corporate Branding'),(13,'Data Analytics Platform'),(14,'Client Retention Strategy'),(15,'International Partnerships'),(16,'Infrastructure Upgrade'),(17,'Software Automation'),(18,'Employee Training Program'),(19,'Legal Compliance Review'),(20,'Strategic Business Planning'),(21,'Ziba burfday'),(23,'heyo');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03 10:06:50
