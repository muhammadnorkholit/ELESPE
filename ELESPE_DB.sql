-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2023 at 04:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_elespe`
--

-- --------------------------------------------------------

--
-- Table structure for table `element_uji`
--

CREATE TABLE `element_uji` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `kode_unit` varchar(20) NOT NULL,
  `id_klaster` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `element_uji`
--

INSERT INTO `element_uji` (`id`, `nama`, `kode_unit`, `id_klaster`, `deleted_at`) VALUES
(1, 'Menerapkan prinsip-prinsip keselamatan dan Kesehatankerja di lingkungan kerja', 'LOG 0001 002 01', 1, NULL),
(2, 'Merencanakan tugas rutin', 'LOG.OOQI .004.01', 1, NULL),
(6, 'Mengidentifikasi aspek kode etik dan HAKI dibidang TIK', 'TIK.OP01.002.01', 1, NULL),
(10, 'Menggunakan Struktur Data', 'J.620100.004.02', 1, NULL),
(11, 'Mengimplementasikan User Interface', 'J.620100.005.02', 1, NULL),
(12, 'Melakukan Instalasi Software Tools Pemrograman', 'J.62Q100.011.01', 1, NULL),
(13, 'Melakukan Pengaturan Software Tools Pemrograman ', 'J.62010Q.012.01', 1, NULL),
(14, 'Mengimplementasikan Pemrograman Terstruktur ', 'J.620100.017.Q1', 1, NULL),
(15, 'Mengimplementasikan Algoritma Pemrograman ', 'J.620100.022.02', 1, NULL),
(16, 'Melakukan Debugging', 'J.620100.025.02', 1, NULL),
(21, 'tets', '909090', 13, '2023-07-28 08:26:42'),
(22, 's', 'KJSIU', 1, '2023-07-28 08:27:44'),
(23, 'test', '090', 1, '2023-07-28 08:30:26'),
(24, 'test', 'KJSIU', 1, '2023-07-28 08:30:41'),
(25, 'test', 'JK.100.10.20.30', 1, '2023-07-28 08:31:55');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`id`, `nama`, `kode`, `deleted_at`) VALUES
(1, 'REKAYASA PERANGKAT LUNAK', 'RPL', NULL),
(2, 'AKUNTANSI', 'AK', NULL),
(3, 'MULTIMEDIA', 'MM', NULL),
(4, 'Teknik Komputer dan Jaringan', 'TKJ', NULL),
(5, 'BISNIS DARING', 'BD', NULL),
(6, 'DESAIN KOMUNIKASI VISUAL', 'DKV', NULL),
(7, 'LAYANAN PERBANKAN', 'LP', NULL),
(8, 'MANAJEMEN PERKANTORAN', 'MP', NULL),
(9, 'PRODUKSI DAN SIARAN PROGRAM TELEVISI', 'PSPTV', NULL),
(10, 'AKUNTANSI DAN KEUANGAN LEMBAGA', 'AKL', NULL),
(11, 'BISNIS DARING DAN PEMASARAN', 'BDP', NULL),
(12, 'OTOMATISASI DAN TATA KELOLA PERKANTORAN', 'OTKP', NULL),
(13, 'PERBANKAN DAN KEUANGAN MIKRO', 'PKM', NULL),
(14, 'PRODUKSI FILM', 'PF', NULL),
(31, 'test edit', 't', '2023-07-28 08:37:23');

-- --------------------------------------------------------

--
-- Table structure for table `klaster`
--

CREATE TABLE `klaster` (
  `id` int(11) NOT NULL,
  `no_klaster` tinyint(4) NOT NULL,
  `kompetensi_keahlian` varchar(80) NOT NULL,
  `id_jurusan` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klaster`
--

INSERT INTO `klaster` (`id`, `no_klaster`, `kompetensi_keahlian`, `id_jurusan`, `created_at`, `deleted_at`) VALUES
(1, 1, 'PEMROGRAMAN DASAR', 1, '2023-06-06 19:18:28', NULL),
(2, 2, 'Pemrograman Berorientasi Objek', 1, '2023-06-06 19:18:28', NULL),
(13, 1, 'tests', 2, '2023-07-28 08:06:58', '2023-07-28 08:40:43');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT -1,
  `catatan` text DEFAULT NULL,
  `tingkatan_kelas_akhir` varchar(3) NOT NULL,
  `simpan_permanen` tinyint(4) NOT NULL DEFAULT 0,
  `id_element_uji` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_klaster` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id`, `status`, `catatan`, `tingkatan_kelas_akhir`, `simpan_permanen`, `id_element_uji`, `id_siswa`, `id_klaster`, `created_at`, `deleted_at`) VALUES
(1, 0, '', 'X', 0, 1, 19, 1, '2023-06-30 05:23:41', NULL),
(2, 1, '', 'X', 0, 2, 19, 1, '2023-06-30 05:23:41', NULL),
(3, 1, 'm', 'X', 0, 6, 19, 1, '2023-06-30 05:23:41', NULL),
(4, 1, '', 'X', 0, 10, 19, 1, '2023-06-30 05:23:41', NULL),
(5, 1, NULL, 'X', 0, 11, 19, 1, '2023-06-30 05:23:41', NULL),
(6, 1, NULL, 'X', 0, 12, 19, 1, '2023-06-30 05:23:41', NULL),
(7, 1, NULL, 'X', 0, 13, 19, 1, '2023-06-30 05:23:41', NULL),
(8, 1, NULL, 'X', 0, 14, 19, 1, '2023-06-30 05:23:41', NULL),
(9, 1, NULL, 'X', 0, 15, 19, 1, '2023-06-30 05:23:41', NULL),
(10, 1, NULL, 'X', 0, 16, 19, 1, '2023-06-30 05:23:41', NULL),
(11, 1, NULL, 'X', 0, 1, 20, 1, '2023-06-30 05:23:41', NULL),
(12, 1, NULL, 'X', 0, 2, 20, 1, '2023-06-30 05:23:41', NULL),
(13, 1, NULL, 'X', 0, 6, 20, 1, '2023-06-30 05:23:41', NULL),
(14, 1, NULL, 'X', 0, 10, 20, 1, '2023-06-30 05:23:41', NULL),
(15, 1, NULL, 'X', 0, 11, 20, 1, '2023-06-30 05:23:41', NULL),
(16, 1, NULL, 'X', 0, 12, 20, 1, '2023-06-30 05:23:41', NULL),
(17, 1, NULL, 'X', 0, 13, 20, 1, '2023-06-30 05:23:42', NULL),
(18, 1, NULL, 'X', 0, 14, 20, 1, '2023-06-30 05:23:42', NULL),
(19, 1, NULL, 'X', 0, 15, 20, 1, '2023-06-30 05:23:42', NULL),
(20, 1, NULL, 'X', 0, 16, 20, 1, '2023-06-30 05:23:42', NULL),
(21, 1, NULL, 'X', 0, 1, 21, 1, '2023-06-30 05:23:42', NULL),
(22, 1, NULL, 'X', 0, 2, 21, 1, '2023-06-30 05:23:42', NULL),
(23, 1, NULL, 'X', 0, 6, 21, 1, '2023-06-30 05:23:42', NULL),
(24, 1, NULL, 'X', 0, 10, 21, 1, '2023-06-30 05:23:42', NULL),
(25, 1, NULL, 'X', 0, 11, 21, 1, '2023-06-30 05:23:42', NULL),
(26, 1, NULL, 'X', 0, 12, 21, 1, '2023-06-30 05:23:42', NULL),
(27, 1, NULL, 'X', 0, 13, 21, 1, '2023-06-30 05:23:42', NULL),
(28, 1, NULL, 'X', 0, 14, 21, 1, '2023-06-30 05:23:42', NULL),
(29, 1, NULL, 'X', 0, 15, 21, 1, '2023-06-30 05:23:42', NULL),
(30, 1, NULL, 'X', 0, 16, 21, 1, '2023-06-30 05:23:42', NULL),
(31, 1, NULL, 'X', 0, 1, 22, 1, '2023-06-30 05:23:42', NULL),
(32, 1, NULL, 'X', 0, 2, 22, 1, '2023-06-30 05:23:42', NULL),
(33, 1, NULL, 'X', 0, 6, 22, 1, '2023-06-30 05:23:42', NULL),
(34, 1, NULL, 'X', 0, 10, 22, 1, '2023-06-30 05:23:42', NULL),
(35, 1, NULL, 'X', 0, 11, 22, 1, '2023-06-30 05:23:42', NULL),
(36, 1, NULL, 'X', 0, 12, 22, 1, '2023-06-30 05:23:42', NULL),
(37, 1, NULL, 'X', 0, 13, 22, 1, '2023-06-30 05:23:42', NULL),
(38, 1, NULL, 'X', 0, 14, 22, 1, '2023-06-30 05:23:42', NULL),
(39, 1, NULL, 'X', 0, 15, 22, 1, '2023-06-30 05:23:42', NULL),
(40, 1, NULL, 'X', 0, 16, 22, 1, '2023-06-30 05:23:42', NULL),
(41, 1, NULL, 'X', 0, 1, 23, 1, '2023-06-30 05:23:42', NULL),
(42, 1, NULL, 'X', 0, 2, 23, 1, '2023-06-30 05:23:42', NULL),
(43, 1, NULL, 'X', 0, 6, 23, 1, '2023-06-30 05:23:42', NULL),
(44, 1, NULL, 'X', 0, 10, 23, 1, '2023-06-30 05:23:42', NULL),
(45, 1, NULL, 'X', 0, 11, 23, 1, '2023-06-30 05:23:42', NULL),
(46, 1, NULL, 'X', 0, 12, 23, 1, '2023-06-30 05:23:42', NULL),
(47, 1, NULL, 'X', 0, 13, 23, 1, '2023-06-30 05:23:42', NULL),
(48, 1, NULL, 'X', 0, 14, 23, 1, '2023-06-30 05:23:42', NULL),
(49, 1, NULL, 'X', 0, 15, 23, 1, '2023-06-30 05:23:42', NULL),
(50, 1, NULL, 'X', 0, 16, 23, 1, '2023-06-30 05:23:42', NULL),
(51, 1, NULL, 'X', 0, 1, 24, 1, '2023-06-30 05:23:42', NULL),
(52, 1, NULL, 'X', 0, 2, 24, 1, '2023-06-30 05:23:42', NULL),
(53, 1, NULL, 'X', 0, 6, 24, 1, '2023-06-30 05:23:42', NULL),
(54, 1, NULL, 'X', 0, 10, 24, 1, '2023-06-30 05:23:42', NULL),
(55, 1, NULL, 'X', 0, 11, 24, 1, '2023-06-30 05:23:42', NULL),
(56, 1, NULL, 'X', 0, 12, 24, 1, '2023-06-30 05:23:42', NULL),
(57, 1, NULL, 'X', 0, 13, 24, 1, '2023-06-30 05:23:42', NULL),
(58, 1, NULL, 'X', 0, 14, 24, 1, '2023-06-30 05:23:42', NULL),
(59, 1, NULL, 'X', 0, 15, 24, 1, '2023-06-30 05:23:42', NULL),
(60, 1, NULL, 'X', 0, 16, 24, 1, '2023-06-30 05:23:42', NULL),
(61, 1, NULL, 'X', 0, 1, 25, 1, '2023-06-30 05:23:42', NULL),
(62, 1, NULL, 'X', 0, 2, 25, 1, '2023-06-30 05:23:42', NULL),
(63, 1, NULL, 'X', 0, 6, 25, 1, '2023-06-30 05:23:42', NULL),
(64, 1, NULL, 'X', 0, 10, 25, 1, '2023-06-30 05:23:42', NULL),
(65, 1, NULL, 'X', 0, 11, 25, 1, '2023-06-30 05:23:42', NULL),
(66, 1, NULL, 'X', 0, 12, 25, 1, '2023-06-30 05:23:42', NULL),
(67, 1, NULL, 'X', 0, 13, 25, 1, '2023-06-30 05:23:42', NULL),
(68, 1, NULL, 'X', 0, 14, 25, 1, '2023-06-30 05:23:42', NULL),
(69, 1, NULL, 'X', 0, 15, 25, 1, '2023-06-30 05:23:42', NULL),
(70, 1, NULL, 'X', 0, 16, 25, 1, '2023-06-30 05:23:42', NULL),
(71, 1, NULL, 'X', 0, 1, 26, 1, '2023-06-30 05:23:42', NULL),
(72, 1, NULL, 'X', 0, 2, 26, 1, '2023-06-30 05:23:42', NULL),
(73, 1, NULL, 'X', 0, 6, 26, 1, '2023-06-30 05:23:42', NULL),
(74, 1, NULL, 'X', 0, 10, 26, 1, '2023-06-30 05:23:42', NULL),
(75, 1, NULL, 'X', 0, 11, 26, 1, '2023-06-30 05:23:42', NULL),
(76, 1, NULL, 'X', 0, 12, 26, 1, '2023-06-30 05:23:42', NULL),
(77, 1, NULL, 'X', 0, 13, 26, 1, '2023-06-30 05:23:42', NULL),
(78, 1, NULL, 'X', 0, 14, 26, 1, '2023-06-30 05:23:42', NULL),
(79, 1, NULL, 'X', 0, 15, 26, 1, '2023-06-30 05:23:42', NULL),
(80, 1, NULL, 'X', 0, 16, 26, 1, '2023-06-30 05:23:42', NULL),
(81, 1, NULL, 'X', 0, 1, 27, 1, '2023-06-30 05:23:42', NULL),
(82, 1, NULL, 'X', 0, 2, 27, 1, '2023-06-30 05:23:42', NULL),
(83, 1, NULL, 'X', 0, 6, 27, 1, '2023-06-30 05:23:42', NULL),
(84, 1, NULL, 'X', 0, 10, 27, 1, '2023-06-30 05:23:42', NULL),
(85, 1, NULL, 'X', 0, 11, 27, 1, '2023-06-30 05:23:42', NULL),
(86, 1, NULL, 'X', 0, 12, 27, 1, '2023-06-30 05:23:42', NULL),
(87, 1, NULL, 'X', 0, 13, 27, 1, '2023-06-30 05:23:42', NULL),
(88, 1, NULL, 'X', 0, 14, 27, 1, '2023-06-30 05:23:42', NULL),
(89, 1, NULL, 'X', 0, 15, 27, 1, '2023-06-30 05:23:42', NULL),
(90, 1, NULL, 'X', 0, 16, 27, 1, '2023-06-30 05:23:42', NULL),
(91, 1, NULL, 'X', 0, 1, 28, 1, '2023-06-30 05:23:42', NULL),
(92, 1, NULL, 'X', 0, 2, 28, 1, '2023-06-30 05:23:42', NULL),
(93, 1, NULL, 'X', 0, 6, 28, 1, '2023-06-30 05:23:42', NULL),
(94, 1, NULL, 'X', 0, 10, 28, 1, '2023-06-30 05:23:42', NULL),
(95, 1, NULL, 'X', 0, 11, 28, 1, '2023-06-30 05:23:42', NULL),
(96, 1, NULL, 'X', 0, 12, 28, 1, '2023-06-30 05:23:42', NULL),
(97, 1, NULL, 'X', 0, 13, 28, 1, '2023-06-30 05:23:42', NULL),
(98, 1, NULL, 'X', 0, 14, 28, 1, '2023-06-30 05:23:42', NULL),
(99, 1, NULL, 'X', 0, 15, 28, 1, '2023-06-30 05:23:42', NULL),
(100, 1, NULL, 'X', 0, 16, 28, 1, '2023-06-30 05:23:42', NULL),
(101, 1, NULL, 'X', 0, 1, 29, 1, '2023-06-30 05:23:42', NULL),
(102, 1, NULL, 'X', 0, 2, 29, 1, '2023-06-30 05:23:42', NULL),
(103, 1, NULL, 'X', 0, 6, 29, 1, '2023-06-30 05:23:42', NULL),
(104, 1, NULL, 'X', 0, 10, 29, 1, '2023-06-30 05:23:42', NULL),
(105, 1, NULL, 'X', 0, 11, 29, 1, '2023-06-30 05:23:42', NULL),
(106, 1, NULL, 'X', 0, 12, 29, 1, '2023-06-30 05:23:42', NULL),
(107, 1, NULL, 'X', 0, 13, 29, 1, '2023-06-30 05:23:42', NULL),
(108, 1, NULL, 'X', 0, 14, 29, 1, '2023-06-30 05:23:42', NULL),
(109, 1, NULL, 'X', 0, 15, 29, 1, '2023-06-30 05:23:42', NULL),
(110, 1, NULL, 'X', 0, 16, 29, 1, '2023-06-30 05:23:42', NULL),
(111, 1, NULL, 'X', 0, 1, 30, 1, '2023-06-30 05:23:42', NULL),
(112, 1, NULL, 'X', 0, 2, 30, 1, '2023-06-30 05:23:42', NULL),
(113, 1, NULL, 'X', 0, 6, 30, 1, '2023-06-30 05:23:42', NULL),
(114, 1, NULL, 'X', 0, 10, 30, 1, '2023-06-30 05:23:42', NULL),
(115, 1, NULL, 'X', 0, 11, 30, 1, '2023-06-30 05:23:42', NULL),
(116, 1, NULL, 'X', 0, 12, 30, 1, '2023-06-30 05:23:42', NULL),
(117, 1, NULL, 'X', 0, 13, 30, 1, '2023-06-30 05:23:42', NULL),
(118, 1, NULL, 'X', 0, 14, 30, 1, '2023-06-30 05:23:42', NULL),
(119, 1, NULL, 'X', 0, 15, 30, 1, '2023-06-30 05:23:42', NULL),
(120, 1, NULL, 'X', 0, 16, 30, 1, '2023-06-30 05:23:42', NULL),
(121, 1, NULL, 'X', 0, 1, 31, 1, '2023-06-30 05:23:42', NULL),
(122, 1, NULL, 'X', 0, 2, 31, 1, '2023-06-30 05:23:42', NULL),
(123, 1, NULL, 'X', 0, 6, 31, 1, '2023-06-30 05:23:42', NULL),
(124, 1, NULL, 'X', 0, 10, 31, 1, '2023-06-30 05:23:42', NULL),
(125, 1, NULL, 'X', 0, 11, 31, 1, '2023-06-30 05:23:42', NULL),
(126, 1, NULL, 'X', 0, 12, 31, 1, '2023-06-30 05:23:42', NULL),
(127, 1, NULL, 'X', 0, 13, 31, 1, '2023-06-30 05:23:42', NULL),
(128, 1, NULL, 'X', 0, 14, 31, 1, '2023-06-30 05:23:42', NULL),
(129, 1, NULL, 'X', 0, 15, 31, 1, '2023-06-30 05:23:42', NULL),
(130, 1, NULL, 'X', 0, 16, 31, 1, '2023-06-30 05:23:42', NULL),
(131, 1, NULL, 'X', 0, 1, 32, 1, '2023-06-30 05:23:42', NULL),
(132, 1, NULL, 'X', 0, 2, 32, 1, '2023-06-30 05:23:42', NULL),
(133, 1, NULL, 'X', 0, 6, 32, 1, '2023-06-30 05:23:42', NULL),
(134, 1, NULL, 'X', 0, 10, 32, 1, '2023-06-30 05:23:42', NULL),
(135, 1, NULL, 'X', 0, 11, 32, 1, '2023-06-30 05:23:42', NULL),
(136, 1, NULL, 'X', 0, 12, 32, 1, '2023-06-30 05:23:42', NULL),
(137, 1, NULL, 'X', 0, 13, 32, 1, '2023-06-30 05:23:42', NULL),
(138, 1, NULL, 'X', 0, 14, 32, 1, '2023-06-30 05:23:42', NULL),
(139, 1, NULL, 'X', 0, 15, 32, 1, '2023-06-30 05:23:42', NULL),
(140, 1, NULL, 'X', 0, 16, 32, 1, '2023-06-30 05:23:42', NULL),
(141, 1, NULL, 'X', 0, 1, 33, 1, '2023-06-30 05:23:42', NULL),
(142, 1, NULL, 'X', 0, 2, 33, 1, '2023-06-30 05:23:42', NULL),
(143, 1, NULL, 'X', 0, 6, 33, 1, '2023-06-30 05:23:42', NULL),
(144, 1, NULL, 'X', 0, 10, 33, 1, '2023-06-30 05:23:42', NULL),
(145, 1, NULL, 'X', 0, 11, 33, 1, '2023-06-30 05:23:42', NULL),
(146, 1, NULL, 'X', 0, 12, 33, 1, '2023-06-30 05:23:42', NULL),
(147, 1, NULL, 'X', 0, 13, 33, 1, '2023-06-30 05:23:42', NULL),
(148, 1, NULL, 'X', 0, 14, 33, 1, '2023-06-30 05:23:43', NULL),
(149, 1, NULL, 'X', 0, 15, 33, 1, '2023-06-30 05:23:43', NULL),
(150, 1, NULL, 'X', 0, 16, 33, 1, '2023-06-30 05:23:43', NULL),
(151, 1, NULL, 'X', 0, 1, 34, 1, '2023-06-30 05:23:43', NULL),
(152, 1, NULL, 'X', 0, 2, 34, 1, '2023-06-30 05:23:43', NULL),
(153, 1, NULL, 'X', 0, 6, 34, 1, '2023-06-30 05:23:43', NULL),
(154, 1, NULL, 'X', 0, 10, 34, 1, '2023-06-30 05:23:43', NULL),
(155, 1, NULL, 'X', 0, 11, 34, 1, '2023-06-30 05:23:43', NULL),
(156, 1, NULL, 'X', 0, 12, 34, 1, '2023-06-30 05:23:43', NULL),
(157, 1, NULL, 'X', 0, 13, 34, 1, '2023-06-30 05:23:43', NULL),
(158, 1, NULL, 'X', 0, 14, 34, 1, '2023-06-30 05:23:43', NULL),
(159, 1, NULL, 'X', 0, 15, 34, 1, '2023-06-30 05:23:43', NULL),
(160, 1, NULL, 'X', 0, 16, 34, 1, '2023-06-30 05:23:43', NULL),
(161, 1, NULL, 'X', 0, 1, 35, 1, '2023-06-30 05:23:43', NULL),
(162, 1, NULL, 'X', 0, 2, 35, 1, '2023-06-30 05:23:43', NULL),
(163, 1, NULL, 'X', 0, 6, 35, 1, '2023-06-30 05:23:43', NULL),
(164, 1, NULL, 'X', 0, 10, 35, 1, '2023-06-30 05:23:43', NULL),
(165, 1, NULL, 'X', 0, 11, 35, 1, '2023-06-30 05:23:43', NULL),
(166, 1, NULL, 'X', 0, 12, 35, 1, '2023-06-30 05:23:43', NULL),
(167, 1, NULL, 'X', 0, 13, 35, 1, '2023-06-30 05:23:43', NULL),
(168, 1, NULL, 'X', 0, 14, 35, 1, '2023-06-30 05:23:43', NULL),
(169, 1, NULL, 'X', 0, 15, 35, 1, '2023-06-30 05:23:43', NULL),
(170, 1, NULL, 'X', 0, 16, 35, 1, '2023-06-30 05:23:43', NULL),
(171, 1, NULL, 'X', 0, 1, 36, 1, '2023-06-30 05:23:43', NULL),
(172, 1, NULL, 'X', 0, 2, 36, 1, '2023-06-30 05:23:43', NULL),
(173, 1, NULL, 'X', 0, 6, 36, 1, '2023-06-30 05:23:43', NULL),
(174, 1, NULL, 'X', 0, 10, 36, 1, '2023-06-30 05:23:43', NULL),
(175, 1, NULL, 'X', 0, 11, 36, 1, '2023-06-30 05:23:43', NULL),
(176, 1, NULL, 'X', 0, 12, 36, 1, '2023-06-30 05:23:43', NULL),
(177, 1, NULL, 'X', 0, 13, 36, 1, '2023-06-30 05:23:43', NULL),
(178, 1, NULL, 'X', 0, 14, 36, 1, '2023-06-30 05:23:43', NULL),
(179, 1, NULL, 'X', 0, 15, 36, 1, '2023-06-30 05:23:43', NULL),
(180, 1, NULL, 'X', 0, 16, 36, 1, '2023-06-30 05:23:43', NULL),
(181, 0, NULL, 'X', 0, 1, 1, 1, '2023-07-28 09:09:43', NULL),
(182, 1, NULL, 'X', 0, 2, 1, 1, '2023-07-28 09:09:43', NULL),
(183, 0, NULL, 'X', 0, 6, 1, 1, '2023-07-28 09:09:43', NULL),
(184, 1, NULL, 'X', 0, 10, 1, 1, '2023-07-28 09:09:43', NULL),
(185, 0, NULL, 'X', 0, 11, 1, 1, '2023-07-28 09:09:43', NULL),
(186, 1, NULL, 'X', 0, 12, 1, 1, '2023-07-28 09:09:43', NULL),
(187, 0, NULL, 'X', 0, 13, 1, 1, '2023-07-28 09:09:43', NULL),
(188, 1, NULL, 'X', 0, 14, 1, 1, '2023-07-28 09:09:43', NULL),
(189, 1, NULL, 'X', 0, 15, 1, 1, '2023-07-28 09:09:43', NULL),
(190, 1, NULL, 'X', 0, 16, 1, 1, '2023-07-28 09:09:43', NULL),
(191, 1, NULL, 'X', 0, 1, 2, 1, '2023-07-28 09:09:43', NULL),
(192, 1, NULL, 'X', 0, 2, 2, 1, '2023-07-28 09:09:43', NULL),
(193, 1, NULL, 'X', 0, 6, 2, 1, '2023-07-28 09:09:43', NULL),
(194, 0, NULL, 'X', 0, 10, 2, 1, '2023-07-28 09:09:43', NULL),
(195, 1, NULL, 'X', 0, 11, 2, 1, '2023-07-28 09:09:43', NULL),
(196, 1, NULL, 'X', 0, 12, 2, 1, '2023-07-28 09:09:43', NULL),
(197, 1, NULL, 'X', 0, 13, 2, 1, '2023-07-28 09:09:43', NULL),
(198, 1, NULL, 'X', 0, 14, 2, 1, '2023-07-28 09:09:43', NULL),
(199, 1, NULL, 'X', 0, 15, 2, 1, '2023-07-28 09:09:43', NULL),
(200, 1, NULL, 'X', 0, 16, 2, 1, '2023-07-28 09:09:43', NULL),
(201, 1, NULL, 'X', 0, 1, 3, 1, '2023-07-28 09:09:43', NULL),
(202, 1, NULL, 'X', 0, 2, 3, 1, '2023-07-28 09:09:43', NULL),
(203, 1, NULL, 'X', 0, 6, 3, 1, '2023-07-28 09:09:43', NULL),
(204, 1, NULL, 'X', 0, 10, 3, 1, '2023-07-28 09:09:43', NULL),
(205, 1, NULL, 'X', 0, 11, 3, 1, '2023-07-28 09:09:43', NULL),
(206, 1, NULL, 'X', 0, 12, 3, 1, '2023-07-28 09:09:43', NULL),
(207, 1, NULL, 'X', 0, 13, 3, 1, '2023-07-28 09:09:43', NULL),
(208, 1, NULL, 'X', 0, 14, 3, 1, '2023-07-28 09:09:43', NULL),
(209, 1, NULL, 'X', 0, 15, 3, 1, '2023-07-28 09:09:43', NULL),
(210, 1, NULL, 'X', 0, 16, 3, 1, '2023-07-28 09:09:43', NULL),
(211, 1, NULL, 'X', 0, 1, 4, 1, '2023-07-28 09:09:43', NULL),
(212, 1, NULL, 'X', 0, 2, 4, 1, '2023-07-28 09:09:43', NULL),
(213, 1, NULL, 'X', 0, 6, 4, 1, '2023-07-28 09:09:43', NULL),
(214, 1, NULL, 'X', 0, 10, 4, 1, '2023-07-28 09:09:43', NULL),
(215, 1, NULL, 'X', 0, 11, 4, 1, '2023-07-28 09:09:43', NULL),
(216, 1, NULL, 'X', 0, 12, 4, 1, '2023-07-28 09:09:43', NULL),
(217, 1, NULL, 'X', 0, 13, 4, 1, '2023-07-28 09:09:43', NULL),
(218, 1, NULL, 'X', 0, 14, 4, 1, '2023-07-28 09:09:43', NULL),
(219, 1, NULL, 'X', 0, 15, 4, 1, '2023-07-28 09:09:43', NULL),
(220, 1, NULL, 'X', 0, 16, 4, 1, '2023-07-28 09:09:43', NULL),
(221, 1, NULL, 'X', 0, 1, 5, 1, '2023-07-28 09:09:43', NULL),
(222, 1, NULL, 'X', 0, 2, 5, 1, '2023-07-28 09:09:43', NULL),
(223, 1, NULL, 'X', 0, 6, 5, 1, '2023-07-28 09:09:43', NULL),
(224, 1, NULL, 'X', 0, 10, 5, 1, '2023-07-28 09:09:43', NULL),
(225, 1, NULL, 'X', 0, 11, 5, 1, '2023-07-28 09:09:43', NULL),
(226, 1, NULL, 'X', 0, 12, 5, 1, '2023-07-28 09:09:43', NULL),
(227, 1, NULL, 'X', 0, 13, 5, 1, '2023-07-28 09:09:43', NULL),
(228, 1, NULL, 'X', 0, 14, 5, 1, '2023-07-28 09:09:43', NULL),
(229, 1, NULL, 'X', 0, 15, 5, 1, '2023-07-28 09:09:43', NULL),
(230, 1, NULL, 'X', 0, 16, 5, 1, '2023-07-28 09:09:43', NULL),
(231, 1, NULL, 'X', 0, 1, 6, 1, '2023-07-28 09:09:43', NULL),
(232, 1, NULL, 'X', 0, 2, 6, 1, '2023-07-28 09:09:43', NULL),
(233, 1, NULL, 'X', 0, 6, 6, 1, '2023-07-28 09:09:43', NULL),
(234, 1, NULL, 'X', 0, 10, 6, 1, '2023-07-28 09:09:43', NULL),
(235, 1, NULL, 'X', 0, 11, 6, 1, '2023-07-28 09:09:43', NULL),
(236, 1, NULL, 'X', 0, 12, 6, 1, '2023-07-28 09:09:43', NULL),
(237, 1, NULL, 'X', 0, 13, 6, 1, '2023-07-28 09:09:43', NULL),
(238, 1, NULL, 'X', 0, 14, 6, 1, '2023-07-28 09:09:43', NULL),
(239, 1, NULL, 'X', 0, 15, 6, 1, '2023-07-28 09:09:43', NULL),
(240, 1, NULL, 'X', 0, 16, 6, 1, '2023-07-28 09:09:43', NULL),
(241, 1, NULL, 'X', 0, 1, 7, 1, '2023-07-28 09:09:44', NULL),
(242, 1, NULL, 'X', 0, 2, 7, 1, '2023-07-28 09:09:44', NULL),
(243, 1, NULL, 'X', 0, 6, 7, 1, '2023-07-28 09:09:44', NULL),
(244, 1, NULL, 'X', 0, 10, 7, 1, '2023-07-28 09:09:44', NULL),
(245, 1, NULL, 'X', 0, 11, 7, 1, '2023-07-28 09:09:44', NULL),
(246, 1, NULL, 'X', 0, 12, 7, 1, '2023-07-28 09:09:44', NULL),
(247, 1, NULL, 'X', 0, 13, 7, 1, '2023-07-28 09:09:44', NULL),
(248, 1, NULL, 'X', 0, 14, 7, 1, '2023-07-28 09:09:44', NULL),
(249, 1, NULL, 'X', 0, 15, 7, 1, '2023-07-28 09:09:44', NULL),
(250, 1, NULL, 'X', 0, 16, 7, 1, '2023-07-28 09:09:44', NULL),
(251, 1, NULL, 'X', 0, 1, 8, 1, '2023-07-28 09:09:44', NULL),
(252, 1, NULL, 'X', 0, 2, 8, 1, '2023-07-28 09:09:44', NULL),
(253, 1, NULL, 'X', 0, 6, 8, 1, '2023-07-28 09:09:44', NULL),
(254, 1, NULL, 'X', 0, 10, 8, 1, '2023-07-28 09:09:44', NULL),
(255, 1, NULL, 'X', 0, 11, 8, 1, '2023-07-28 09:09:44', NULL),
(256, 1, NULL, 'X', 0, 12, 8, 1, '2023-07-28 09:09:44', NULL),
(257, 1, NULL, 'X', 0, 13, 8, 1, '2023-07-28 09:09:44', NULL),
(258, 1, NULL, 'X', 0, 14, 8, 1, '2023-07-28 09:09:44', NULL),
(259, 1, NULL, 'X', 0, 15, 8, 1, '2023-07-28 09:09:44', NULL),
(260, 1, NULL, 'X', 0, 16, 8, 1, '2023-07-28 09:09:44', NULL),
(261, 1, NULL, 'X', 0, 1, 9, 1, '2023-07-28 09:09:44', NULL),
(262, 1, NULL, 'X', 0, 2, 9, 1, '2023-07-28 09:09:44', NULL),
(263, 1, NULL, 'X', 0, 6, 9, 1, '2023-07-28 09:09:44', NULL),
(264, 1, NULL, 'X', 0, 10, 9, 1, '2023-07-28 09:09:44', NULL),
(265, 1, NULL, 'X', 0, 11, 9, 1, '2023-07-28 09:09:44', NULL),
(266, 1, NULL, 'X', 0, 12, 9, 1, '2023-07-28 09:09:44', NULL),
(267, 1, NULL, 'X', 0, 13, 9, 1, '2023-07-28 09:09:44', NULL),
(268, 1, NULL, 'X', 0, 14, 9, 1, '2023-07-28 09:09:44', NULL),
(269, 1, NULL, 'X', 0, 15, 9, 1, '2023-07-28 09:09:44', NULL),
(270, 1, NULL, 'X', 0, 16, 9, 1, '2023-07-28 09:09:44', NULL),
(271, 1, NULL, 'X', 0, 1, 10, 1, '2023-07-28 09:09:44', NULL),
(272, 1, NULL, 'X', 0, 2, 10, 1, '2023-07-28 09:09:44', NULL),
(273, 1, NULL, 'X', 0, 6, 10, 1, '2023-07-28 09:09:44', NULL),
(274, 1, NULL, 'X', 0, 10, 10, 1, '2023-07-28 09:09:44', NULL),
(275, 1, NULL, 'X', 0, 11, 10, 1, '2023-07-28 09:09:44', NULL),
(276, 1, NULL, 'X', 0, 12, 10, 1, '2023-07-28 09:09:44', NULL),
(277, 1, NULL, 'X', 0, 13, 10, 1, '2023-07-28 09:09:44', NULL),
(278, 1, NULL, 'X', 0, 14, 10, 1, '2023-07-28 09:09:44', NULL),
(279, 1, NULL, 'X', 0, 15, 10, 1, '2023-07-28 09:09:44', NULL),
(280, 1, NULL, 'X', 0, 16, 10, 1, '2023-07-28 09:09:44', NULL),
(281, 1, NULL, 'X', 0, 1, 11, 1, '2023-07-28 09:09:44', NULL),
(282, 1, NULL, 'X', 0, 2, 11, 1, '2023-07-28 09:09:44', NULL),
(283, 1, NULL, 'X', 0, 6, 11, 1, '2023-07-28 09:09:44', NULL),
(284, 1, NULL, 'X', 0, 10, 11, 1, '2023-07-28 09:09:44', NULL),
(285, 1, NULL, 'X', 0, 11, 11, 1, '2023-07-28 09:09:44', NULL),
(286, 1, NULL, 'X', 0, 12, 11, 1, '2023-07-28 09:09:44', NULL),
(287, 1, NULL, 'X', 0, 13, 11, 1, '2023-07-28 09:09:44', NULL),
(288, 1, NULL, 'X', 0, 14, 11, 1, '2023-07-28 09:09:44', NULL),
(289, 1, NULL, 'X', 0, 15, 11, 1, '2023-07-28 09:09:44', NULL),
(290, 1, NULL, 'X', 0, 16, 11, 1, '2023-07-28 09:09:44', NULL),
(291, 1, NULL, 'X', 0, 1, 12, 1, '2023-07-28 09:09:44', NULL),
(292, 1, NULL, 'X', 0, 2, 12, 1, '2023-07-28 09:09:44', NULL),
(293, 1, NULL, 'X', 0, 6, 12, 1, '2023-07-28 09:09:44', NULL),
(294, 1, NULL, 'X', 0, 10, 12, 1, '2023-07-28 09:09:44', NULL),
(295, 1, NULL, 'X', 0, 11, 12, 1, '2023-07-28 09:09:44', NULL),
(296, 1, NULL, 'X', 0, 12, 12, 1, '2023-07-28 09:09:44', NULL),
(297, 1, NULL, 'X', 0, 13, 12, 1, '2023-07-28 09:09:44', NULL),
(298, 1, NULL, 'X', 0, 14, 12, 1, '2023-07-28 09:09:44', NULL),
(299, 1, NULL, 'X', 0, 15, 12, 1, '2023-07-28 09:09:44', NULL),
(300, 1, NULL, 'X', 0, 16, 12, 1, '2023-07-28 09:09:44', NULL),
(301, 1, NULL, 'X', 0, 1, 13, 1, '2023-07-28 09:09:44', NULL),
(302, 1, NULL, 'X', 0, 2, 13, 1, '2023-07-28 09:09:44', NULL),
(303, 1, NULL, 'X', 0, 6, 13, 1, '2023-07-28 09:09:44', NULL),
(304, 1, NULL, 'X', 0, 10, 13, 1, '2023-07-28 09:09:44', NULL),
(305, 1, NULL, 'X', 0, 11, 13, 1, '2023-07-28 09:09:44', NULL),
(306, 1, NULL, 'X', 0, 12, 13, 1, '2023-07-28 09:09:44', NULL),
(307, 1, NULL, 'X', 0, 13, 13, 1, '2023-07-28 09:09:44', NULL),
(308, 1, NULL, 'X', 0, 14, 13, 1, '2023-07-28 09:09:44', NULL),
(309, 1, NULL, 'X', 0, 15, 13, 1, '2023-07-28 09:09:44', NULL),
(310, 1, NULL, 'X', 0, 16, 13, 1, '2023-07-28 09:09:44', NULL),
(311, 1, NULL, 'X', 0, 1, 14, 1, '2023-07-28 09:09:44', NULL),
(312, 1, NULL, 'X', 0, 2, 14, 1, '2023-07-28 09:09:44', NULL),
(313, 1, NULL, 'X', 0, 6, 14, 1, '2023-07-28 09:09:44', NULL),
(314, 1, NULL, 'X', 0, 10, 14, 1, '2023-07-28 09:09:44', NULL),
(315, 1, NULL, 'X', 0, 11, 14, 1, '2023-07-28 09:09:44', NULL),
(316, 1, NULL, 'X', 0, 12, 14, 1, '2023-07-28 09:09:44', NULL),
(317, 1, NULL, 'X', 0, 13, 14, 1, '2023-07-28 09:09:44', NULL),
(318, 1, NULL, 'X', 0, 14, 14, 1, '2023-07-28 09:09:44', NULL),
(319, 1, NULL, 'X', 0, 15, 14, 1, '2023-07-28 09:09:44', NULL),
(320, 1, NULL, 'X', 0, 16, 14, 1, '2023-07-28 09:09:44', NULL),
(321, 1, NULL, 'X', 0, 1, 15, 1, '2023-07-28 09:09:44', NULL),
(322, 1, NULL, 'X', 0, 2, 15, 1, '2023-07-28 09:09:44', NULL),
(323, 1, NULL, 'X', 0, 6, 15, 1, '2023-07-28 09:09:44', NULL),
(324, 1, NULL, 'X', 0, 10, 15, 1, '2023-07-28 09:09:44', NULL),
(325, 1, NULL, 'X', 0, 11, 15, 1, '2023-07-28 09:09:44', NULL),
(326, 1, NULL, 'X', 0, 12, 15, 1, '2023-07-28 09:09:44', NULL),
(327, 1, NULL, 'X', 0, 13, 15, 1, '2023-07-28 09:09:44', NULL),
(328, 1, NULL, 'X', 0, 14, 15, 1, '2023-07-28 09:09:44', NULL),
(329, 1, NULL, 'X', 0, 15, 15, 1, '2023-07-28 09:09:44', NULL),
(330, 1, NULL, 'X', 0, 16, 15, 1, '2023-07-28 09:09:44', NULL),
(331, 1, NULL, 'X', 0, 1, 16, 1, '2023-07-28 09:09:44', NULL),
(332, 1, NULL, 'X', 0, 2, 16, 1, '2023-07-28 09:09:44', NULL),
(333, 1, NULL, 'X', 0, 6, 16, 1, '2023-07-28 09:09:44', NULL),
(334, 1, NULL, 'X', 0, 10, 16, 1, '2023-07-28 09:09:44', NULL),
(335, 1, NULL, 'X', 0, 11, 16, 1, '2023-07-28 09:09:44', NULL),
(336, 1, NULL, 'X', 0, 12, 16, 1, '2023-07-28 09:09:44', NULL),
(337, 1, NULL, 'X', 0, 13, 16, 1, '2023-07-28 09:09:44', NULL),
(338, 1, NULL, 'X', 0, 14, 16, 1, '2023-07-28 09:09:44', NULL),
(339, 1, NULL, 'X', 0, 15, 16, 1, '2023-07-28 09:09:44', NULL),
(340, 1, NULL, 'X', 0, 16, 16, 1, '2023-07-28 09:09:44', NULL),
(341, 1, NULL, 'X', 0, 1, 17, 1, '2023-07-28 09:09:44', NULL),
(342, 1, NULL, 'X', 0, 2, 17, 1, '2023-07-28 09:09:44', NULL),
(343, 1, NULL, 'X', 0, 6, 17, 1, '2023-07-28 09:09:44', NULL),
(344, 1, NULL, 'X', 0, 10, 17, 1, '2023-07-28 09:09:44', NULL),
(345, 1, NULL, 'X', 0, 11, 17, 1, '2023-07-28 09:09:44', NULL),
(346, 1, NULL, 'X', 0, 12, 17, 1, '2023-07-28 09:09:44', NULL),
(347, 1, NULL, 'X', 0, 13, 17, 1, '2023-07-28 09:09:44', NULL),
(348, 1, NULL, 'X', 0, 14, 17, 1, '2023-07-28 09:09:44', NULL),
(349, 1, NULL, 'X', 0, 15, 17, 1, '2023-07-28 09:09:44', NULL),
(350, 1, NULL, 'X', 0, 16, 17, 1, '2023-07-28 09:09:44', NULL),
(351, 1, NULL, 'X', 0, 1, 18, 1, '2023-07-28 09:09:44', NULL),
(352, 1, NULL, 'X', 0, 2, 18, 1, '2023-07-28 09:09:44', NULL),
(353, 1, NULL, 'X', 0, 6, 18, 1, '2023-07-28 09:09:44', NULL),
(354, 1, NULL, 'X', 0, 10, 18, 1, '2023-07-28 09:09:44', NULL),
(355, 1, NULL, 'X', 0, 11, 18, 1, '2023-07-28 09:09:44', NULL),
(356, 1, NULL, 'X', 0, 12, 18, 1, '2023-07-28 09:09:44', NULL),
(357, 1, NULL, 'X', 0, 13, 18, 1, '2023-07-28 09:09:44', NULL),
(358, 1, NULL, 'X', 0, 14, 18, 1, '2023-07-28 09:09:44', NULL),
(359, 1, NULL, 'X', 0, 15, 18, 1, '2023-07-28 09:09:44', NULL),
(360, 1, NULL, 'X', 0, 16, 18, 1, '2023-07-28 09:09:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(40) NOT NULL,
  `nisn` varchar(10) NOT NULL,
  `tingkatan` enum('X','XI','XII') NOT NULL,
  `no_kelas` enum('1','2','3','4','5') DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `id_jurusan` int(11) DEFAULT NULL,
  `id_penguji` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `tanggal_lulus` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id`, `nama`, `nisn`, `tingkatan`, `no_kelas`, `status`, `id_jurusan`, `id_penguji`, `deleted_at`, `created_at`, `tanggal_lulus`) VALUES
(1, 'ABDUL MUSLIH', '0063050279', 'XII', '1', 2, 1, 3, NULL, '2023-06-29 04:35:39', '2023-07-31 22:44:03'),
(2, 'ACHMAD FAUZAN', '0061600993', 'XII', '1', 2, 1, 3, NULL, '2023-06-29 04:35:39', '2023-07-31 23:55:46'),
(3, 'ADITYA ANDREW PUTRA', '0068414752', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(4, 'ALFAREZA WILDANANG HERMAWAN', '0063175561', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(5, 'ANGELINA AMELIA PUTRI', '0065666508', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(6, 'BAREP ADHIYASTA', '0066760746', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(7, 'DEVA LOVADANI PUTRA', '0065863413', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(8, 'FALIH RAHMATULLAH PRATAMA', '0061978393', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(9, 'FATHIR GATAN ALIBI', '0067273927', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(10, 'FRIYANDANA DAVA FIRMANSYAH', '0066855378', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(11, 'GANDI WIBISONO', '0065309203', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(12, 'GILANG DHARMA TECTONA', '0071186619', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(13, 'HARIS RAHMAN KURNIAWAN', '0066848265', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(14, 'INDRA SAPUTRA', '0062593554', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(15, 'MISSIY HADIYANTORO', '0076272420', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(16, 'MOH. AKHIF FIRMANSYAH', '3079603556', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(17, 'MOH. RIFQI NUR ARIFILLAH', '0061474077', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(18, 'MOHAMMAD FANY NASYITH AINUL YAKIN', '0063306475', 'X', '1', 1, 1, 3, NULL, '2023-06-29 04:35:39', NULL),
(19, 'MOHAMMAD ILYAS HIDAYATULLAH', '0068248686', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(20, 'MUHAMMAD ADITYA INSAN FADHILA', '0063933927', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(21, 'MUHAMMAD DWI FAUZAN', '0071531418', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(22, 'MUHAMMAD DZAKI SYARIF', '0063847376', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(23, 'MUHAMMAD FAREL DAFI SAPUTRA', '0065995468', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(24, 'MUHAMMAD IRFAN AR RAFI', '0066910855', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(25, 'MUHAMMAD NOFAL', '0056191987', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(26, 'MUHAMMAT LUKMANUL HAKIM ZAINUL MUSTAFA', '0069449387', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(27, 'NERU ANGGARA', '0068420332', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(28, 'NIKITA TIARA DWI MAULIDIA', '0071906006', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(29, 'RAFLIAN FIRDAUS MAULANI', '0061725146', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(30, 'RAZAN TEGAR AFANDI', '0069744059', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(31, 'RESKY ARSYIE AL-DANIAL', '0069422076', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(32, 'RIZKY MUTIARA FITRI', '0064129042', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(33, 'SATRIA ALHAN ILAFI', '0062108670', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(34, 'SYAUQI UWAIMIR BAHRUM PUTRA', '0074797724', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(35, 'TOTOK PRIANTONO AL RAMADANI', '0069469815', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL),
(36, 'WILLY SURYO ANTAREDHA', '0065141998', 'X', '1', 1, 1, 1, NULL, '2023-06-29 04:35:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_jurusan` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `username`, `password`, `id_jurusan`, `deleted_at`) VALUES
(1, 'ABDI RAHMAN', 'abdi@gmail.com', '$2a$10$3oPnyRAMcBBDEdj0v3EpMO/rRphodHukVWHmqm5oBzXVZGoYOjSD2', 1, NULL),
(3, 'NUTRIYO', 'nutriyo@gmail.com', '$2a$10$3oPnyRAMcBBDEdj0v3EpMO/rRphodHukVWHmqm5oBzXVZGoYOjSD2', 1, NULL),
(7, 'Super Admin', 'Super', '$2a$10$3oPnyRAMcBBDEdj0v3EpMO/rRphodHukVWHmqm5oBzXVZGoYOjSD2', NULL, NULL),
(8, 'test', 'test@gmail.com', '$2a$10$3oPnyRAMcBBDEdj0v3EpMO/rRphodHukVWHmqm5oBzXVZGoYOjSD2', 2, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `element_uji`
--
ALTER TABLE `element_uji`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_klaster` (`id_klaster`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `klaster`
--
ALTER TABLE `klaster`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jurusan` (`id_jurusan`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_siswa` (`id_siswa`),
  ADD KEY `id_element_uji` (`id_element_uji`),
  ADD KEY `id_klaster` (`id_klaster`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nisn` (`nisn`),
  ADD KEY `id_penguji` (`id_penguji`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jurusan` (`id_jurusan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `element_uji`
--
ALTER TABLE `element_uji`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `klaster`
--
ALTER TABLE `klaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `element_uji`
--
ALTER TABLE `element_uji`
  ADD CONSTRAINT `element_uji_ibfk_1` FOREIGN KEY (`id_klaster`) REFERENCES `klaster` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `klaster`
--
ALTER TABLE `klaster`
  ADD CONSTRAINT `klaster_ibfk_1` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`id_element_uji`) REFERENCES `element_uji` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_3` FOREIGN KEY (`id_klaster`) REFERENCES `klaster` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_penguji`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
