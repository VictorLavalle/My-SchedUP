-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2021 a las 12:12:16
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `myschedup`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects`
--

CREATE TABLE `subjects` (
  `id_Subject` int(4) NOT NULL,
  `sbj_Name` varchar(50) NOT NULL,
  `sbj_teacher` varchar(100) NOT NULL,
  `sbj_Day` varchar(50) NOT NULL,
  `startTime` varchar(50) NOT NULL,
  `endTime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_User` int(4) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nameIMG` varchar(100) NOT NULL,
  `image` mediumblob NOT NULL,
  `typeIMG` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Disparadores `users`
--
DELIMITER $$
CREATE TRIGGER `Trigger_DeleteUser` AFTER DELETE ON `users` FOR EACH ROW BEGIN
    DELETE 
      FROM usersubjects
     WHERE usersubjects.email = old.email;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersubjects`
--

CREATE TABLE `usersubjects` (
  `id_Subject` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `users_with_subjects`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `users_with_subjects` (
`id_Subject` int(11)
,`sbj_Name` varchar(50)
,`sbj_teacher` varchar(100)
,`firstName` varchar(50)
,`lastName` varchar(50)
,`email` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `users_with_subjects`
--
DROP TABLE IF EXISTS `users_with_subjects`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `users_with_subjects`  AS SELECT `usersubjects`.`id_Subject` AS `id_Subject`, `subjects`.`sbj_Name` AS `sbj_Name`, `subjects`.`sbj_teacher` AS `sbj_teacher`, `users`.`firstName` AS `firstName`, `users`.`lastName` AS `lastName`, `usersubjects`.`email` AS `email` FROM ((`users` join `subjects`) join `usersubjects`) WHERE `usersubjects`.`id_Subject` = `subjects`.`id_Subject` AND `usersubjects`.`email` = `users`.`email` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id_Subject`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_User`),
  ADD KEY `FK_USER_EMAIL` (`email`);

--
-- Indices de la tabla `usersubjects`
--
ALTER TABLE `usersubjects`
  ADD KEY `id_Subject` (`id_Subject`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id_Subject` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_User` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usersubjects`
--
ALTER TABLE `usersubjects`
  ADD CONSTRAINT `usersubjects_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersubjects_ibfk_2` FOREIGN KEY (`id_Subject`) REFERENCES `subjects` (`id_Subject`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
