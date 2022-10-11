CREATE TABLE `Bike stations`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` TEXT NOT NULL,
    `Address` TEXT NOT NULL,
    `x_coord` DECIMAL(8, 2) NOT NULL,
    `y_coord` DECIMAL(8, 2) NOT NULL,
    `station ID` INT NOT NULL
);
ALTER TABLE
    `Bike stations` ADD PRIMARY KEY `bike stations_id_primary`(`id`);
ALTER TABLE
    `Bike stations` ADD UNIQUE `bike stations_station id_unique`(`station ID`);
CREATE TABLE `Journey_data`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `departureTime` DATETIME NOT NULL,
    `returnTime` DATETIME NOT NULL,
    `departureStationID` INT NOT NULL,
    `returnStationID` INT NOT NULL,
    `CoveredDistance(m)` BIGINT NOT NULL,
    `Duration(sec)` BIGINT NOT NULL
);
ALTER TABLE
    `Journey_data` ADD PRIMARY KEY `journey_data_id_primary`(`id`);