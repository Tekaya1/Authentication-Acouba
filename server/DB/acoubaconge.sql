-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2022 at 04:38 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acoubaconge`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `AdminName` varchar(255) NOT NULL,
  `AdminEmail` varchar(255) NOT NULL,
  `AdminPassword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `AdminName`, `AdminEmail`, `AdminPassword`) VALUES
(1, 'Admin', 'admin@acoba.com', '$2b$10$uOJtj7.n.qxsCW9Ktjr8MuRBdms5Yy.FF.Gn0Zdn/3tX10wmTVrbq');

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `SurName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Phone` int(8) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  `SpecialCode` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `Name`, `SurName`, `username`, `password`, `Email`, `Phone`, `Gender`, `image`, `Date`, `SpecialCode`) VALUES
(189, 'tekayaa123', 'ghassen', 'Tekaya@', '$2b$10$VhSFp0WN7PdsMRVIlyb95e3bVJ5KgyV3QM/meropg9olKbiBji0N2', 'a@a.com', 22505540, 'Male', '715409wallpaperflare.com_wallpaper.jpg', '2022-08-26 09:44:16', 'b80xmjof38v@##+%$*+#%&!*#!$%&#=#!=+%*#&**@%=+@%*%=%@&@*!@$$%*#*#=@$@++%==&**&#$+$+@+=fpbj05g7cv$*$++!#@%@#$!$@&@*+++#*%+*');

-- --------------------------------------------------------

--
-- Table structure for table `congerequest`
--

CREATE TABLE `congerequest` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `TypeConge` varchar(255) NOT NULL,
  `Requests` varchar(10000) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Name` varchar(255) NOT NULL,
  `SurName` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `RequestTime` datetime NOT NULL DEFAULT current_timestamp(),
  `Comment` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `congerequest`
--

INSERT INTO `congerequest` (`id`, `username`, `Email`, `TypeConge`, `Requests`, `StartDate`, `EndDate`, `Name`, `SurName`, `Status`, `RequestTime`, `Comment`) VALUES
(152, 'aa', 'User@User.com', 'aa', 'aa', '0000-00-00', '0000-00-00', 'aa', 'aa', 'Approved', '2022-08-29 19:56:59', 'Ok Accepted'),
(153, 'Ambikaq123', 'mabewaa2681@dmeproject.coma', 'CONGE_MATERNITE', 'qwdqwdqwdqwd', '2022-08-31', '2022-09-02', 'Ambikaq', 'Naraina', 'Declined', '2022-08-30 15:23:14', ''),
(154, 'Ambikaq123', 'mabewaa2681@dmeproject.coma', 'CONGE_MATERNITE', 'qwdqwdqdqwdqdqdwq', '2022-09-09', '2022-09-11', 'Ambikaq', 'Naraina', 'Declined', '2022-08-30 15:38:02', 'Sorry'),
(155, 'Ambikaq123', 'mabewaa2681@dmeproject.coma', 'PRESENT', 'qwdqwdqwd', '2022-11-11', '2022-11-12', 'Ambikaq', 'Naraina', 'Approved', '2022-08-30 15:40:15', ''),
(169, 'Tekaya@', 'a@a.com', 'CONGE_ANNUEL_NON_PAYE', 'adadazda', '2022-09-23', '2022-09-23', 'tekayaa123', 'ghassen', 'No Action', '2022-09-08 21:21:32', 'No Comment');

-- --------------------------------------------------------

--
-- Table structure for table `conges`
--

CREATE TABLE `conges` (
  `id` int(11) NOT NULL,
  `TypeCON` varchar(255) NOT NULL,
  `EmailCON` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conges`
--

INSERT INTO `conges` (`id`, `TypeCON`, `EmailCON`) VALUES
(69, 'CONGE_ANNUEL_NON_PAYE', ' Je n\'ai pas accès à ma messagerie pendant cette période. \n     \n      Je prendrai  connaissance de votre message à mon retour.\n\n    \n     \n\n'),
(192, 'CONGE_MALADIE_NON_PAYE', '\n\nConformément à l\'article L.6322-4 du Code du travail, je souhaite bénéficier du congé individuel de formation. Ce dernier débutera le ………………………   [Date], et se termina le ………………………   [Date], soit une durée totale de ………………………  [Nombre] heures, sur un rythme hebdomadaire de ………………………   [Nombre].  \n\nVeuillez accepter, Madame, Monsieur, l’expression de mes salutations distinguées.'),
(204, 'CONGE_FORMATION_ECONOMIQUE_SOCIALE ET SYNDICALE', 'Madame ou Monsieur,\n\n\nConformément à lʼarticle L.2145-5 du code du travail, jʼai lʼhonneur de vous demander lʼautorisation de mʼabsenter de lʼentreprise  en vue de participer à une formation économique, sociale et syndicale organisée par « La formation syndicale CGT » qui est un organisme agréé.\n\n\n');

-- --------------------------------------------------------

--
-- Table structure for table `resettable`
--

CREATE TABLE `resettable` (
  `id` int(11) NOT NULL,
  `REmail` varchar(255) NOT NULL,
  `RPhone` int(8) NOT NULL,
  `RCode` varchar(1000) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  `TokenReset` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resettable`
--

INSERT INTO `resettable` (`id`, `REmail`, `RPhone`, `RCode`, `Date`, `TokenReset`) VALUES
(235, 'Empty', 22505540, 'd3ft7u7906b', '2022-09-18 21:56:14', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg5LCJpYXQiOjE2NjM1MzA5NzQsImV4cCI6MTY2MzUzMjc3NH0.DKJ1XQLuv803OitwHTE8xDQe4p34-bFB7y9z-CQdCFk');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AdminEmail` (`AdminEmail`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Phone` (`Phone`);

--
-- Indexes for table `congerequest`
--
ALTER TABLE `congerequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conges`
--
ALTER TABLE `conges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TypeCON` (`TypeCON`) USING BTREE;

--
-- Indexes for table `resettable`
--
ALTER TABLE `resettable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT for table `congerequest`
--
ALTER TABLE `congerequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `conges`
--
ALTER TABLE `conges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT for table `resettable`
--
ALTER TABLE `resettable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
