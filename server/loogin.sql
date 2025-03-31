-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db:3306
-- Generation Time: Mar 31, 2025 at 04:39 PM
-- Server version: 5.7.44
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `employeeID` int(10) NOT NULL,
  `date` date NOT NULL,
  `noTable` int(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`employeeID`, `date`, `noTable`, `status`, `firstname`, `lastname`, `gmail`) VALUES
(1, '2024-12-23', 1, 1, 'qwd', 'qwd', 'qwd'),
(2, '2025-03-14', 2, 1, 'ert', 'rt', 'rt'),
(3, '2025-03-21', 2, 1, 'ert', 'rt', 'rt'),
(4, '2025-03-14', 2, 1, 'ert', 'rt', 'rt'),
(5, '2025-03-15', 5, 1, 'q', 'q', 'q'),
(6, '2025-03-15', 7, 1, 'q', 'q', 'q'),
(7, '2025-03-15', 1, 1, 'dfs', 'adsfa', 'afdaf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`employeeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `employeeID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
