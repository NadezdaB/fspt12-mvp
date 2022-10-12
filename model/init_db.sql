DROP TABLE if exists `Bike_stations`;
CREATE TABLE `Bike_stations`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` TEXT NOT NULL,
    `Address` TEXT NOT NULL,
    `x_coord` DECIMAL(8, 2) NOT NULL,
    `y_coord` DECIMAL(8, 2) NOT NULL,
    `station ID` INT NOT NULL, 
     PRIMARY KEY(id)
);

DROP TABLE if exists `Journey_data`;
CREATE TABLE `Journey_data`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `departureTime` DATETIME NOT NULL,
    `returnTime` DATETIME NOT NULL,
    `departureStationID` INT NOT NULL,
    `returnStationID` INT NOT NULL,
    `CoveredDistance(m)` BIGINT NOT NULL,
    `Duration(sec)` BIGINT NOT NULL,
    PRIMARY KEY (id)
);
