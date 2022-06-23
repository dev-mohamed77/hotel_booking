-- hotel_booking.customer definition

CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(150) NOT NULL,
  `customer_email` varchar(200) NOT NULL,
  `customer_username` varchar(200) NOT NULL,
  `customer_password` varchar(255) NOT NULL,
  `customer_admin` tinyint(1) NOT NULL DEFAULT (false),
  `customer_city` varchar(255) NOT NULL,
  `customer_country` varchar(150) NOT NULL,
  `customer_on_created` timestamp NULL DEFAULT NULL,
  `customer_on_update` timestamp NULL DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `mobile` varchar(30) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_email` (`customer_email`),
  UNIQUE KEY `customer_username` (`customer_username`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- hotel_booking.hotel definition

CREATE TABLE `hotel` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `hotel_company_id` int NOT NULL,
  `hotel_location_id` int NOT NULL,
  `hotel_name` varchar(255) NOT NULL,
  `hotel_address` varchar(255) NOT NULL,
  `hotel_description` text,
  PRIMARY KEY (`hotel_id`),
  KEY `hotel_company_id` (`hotel_company_id`),
  KEY `hotel_location_id` (`hotel_location_id`),
  CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`hotel_company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hotel_ibfk_2` FOREIGN KEY (`hotel_location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- hotel_booking.company definition

CREATE TABLE `company` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `company_description` text,
  `conpany_logo` varchar(200) DEFAULT NULL,
  `company_on_created` timestamp NULL DEFAULT NULL,
  `company_on_updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- hotel_booking.location definition

CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(150) NOT NULL,
  `loaction_latitude` float NOT NULL,
  `location_longitude` float NOT NULL,
  `customer_on_created` timestamp NULL DEFAULT NULL,
  `customer_on_update` timestamp NULL DEFAULT NULL,
  `location_description` text NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- hotel_booking.audit definition

CREATE TABLE `audit` (
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `audit_action` varchar(255) NOT NULL,
  `audit_data` json NOT NULL,
  `audit_status` varchar(20) NOT NULL,
  `audit_error` json NOT NULL,
  `audit_by` varchar(255) NOT NULL,
  `audit_on` timestamp NOT NULL,
  PRIMARY KEY (`audit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;