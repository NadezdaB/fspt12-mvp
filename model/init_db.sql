DROP TABLE if exists `bike_stations`;
CREATE TABLE `bike_stations`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` TEXT NOT NULL,
    `Address` TEXT NOT NULL,
    `x_coord` DOUBLE NOT NULL,
    `y_coord` DOUBLE NOT NULL,
    `station ID` INT NOT NULL,
    `capacity`INT NOT NULL, 
     PRIMARY KEY(id)
);

DROP TABLE if exists `journey_data`;
CREATE TABLE `journey_data`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `departureTime` DATETIME NOT NULL,
    `returnTime` DATETIME NOT NULL,
    `departureStationName` MEDIUMTEXT NOT NULL,
    `returnStationName` MEDIUMTEXT NOT NULL,
    `CoveredDistance` BIGINT NOT NULL,
    `Duration` BIGINT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE if exists `users`;
CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
