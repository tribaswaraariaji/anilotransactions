-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2021 at 09:13 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `anilo`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(10) NOT NULL,
  `productID` int(10) NOT NULL,
  `productQty` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phoneNumber` varchar(16) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(100) NOT NULL,
  `paymentProof` blob DEFAULT NULL,
  `orderStatus` varchar(10) DEFAULT NULL,
  `shippingID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `productID`, `productQty`, `name`, `phoneNumber`, `email`, `address`, `paymentProof`, `orderStatus`, `shippingID`) VALUES
(12, 3, 1, 'Ari', '085719996931', 'tbariaji@gmail.com', 'Jalan Rawamangun', 0x617364616173, 'Confirmed', 91),
(17, 2, 1, 'Ari', '085719996931', 'tbariaji@gmail.com', 'Jalan Rawamangun', NULL, NULL, 92),
(21, 1, 2, 'Ari', '085719996931', 'tbariaji@gmail.com', 'Jalan Rawamangun', NULL, NULL, NULL),
(22, 2, 5, 'Ari', '085719996931', 'tbariaji@gmail.com', 'Jalan Rawamangun', NULL, NULL, NULL),
(23, 2, 11, 'Ari', '085719996931', 'tbariaji@gmail.com', 'Jalan Rawamangun', NULL, NULL, NULL),
(29, 2, 14, 'Ari', '085719996931', 'tbariaji@gmail.com', 'Jalan Rawamangun', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productID` int(10) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `productQty` int(10) NOT NULL,
  `productPrice` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productName`, `productQty`, `productPrice`) VALUES
(1, 'Bakwan', 20, 3000),
(2, 'Pisang Goreng', 1, 3000),
(3, 'Kentang Goreng', 0, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `shippingID` int(10) NOT NULL,
  `orderID` int(10) NOT NULL,
  `shippingStatus` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`shippingID`, `orderID`, `shippingStatus`) VALUES
(91, 12, 'Shipped'),
(92, 17, 'Shipped');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(10) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `role`, `name`) VALUES
(1, 'admin', '$2b$10$D.m.xizQYR.QZ2DIsRsdUOPZDbwddBp5OdnSZf8knfIYOEhBs9gdG', 'admin', 'admin'),
(2, 'customer', '$2b$10$D.m.xizQYR.QZ2DIsRsdUOPZDbwddBp5OdnSZf8knfIYOEhBs9gdG', 'customer', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `shippingID` (`shippingID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`shippingID`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `shippingID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shippingID`) REFERENCES `shipping` (`shippingID`);

--
-- Constraints for table `shipping`
--
ALTER TABLE `shipping`
  ADD CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
