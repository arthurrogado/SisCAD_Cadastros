-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           10.4.27-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para siscad
CREATE DATABASE IF NOT EXISTS `siscad` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `siscad`;

-- Copiando estrutura para view siscad.cursos
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `cursos` (
	`id` INT(11) NOT NULL,
	`nome` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`descricao` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`coordenador` INT(11) NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view siscad.disciplinas
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `disciplinas` (
	`id` INT(11) NOT NULL,
	`nome` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`carga_horaria` DOUBLE NULL,
	`ementa` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`bibliografia` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`pre_requisito` VARCHAR(255) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;

-- Copiando estrutura para view siscad.cursos
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `cursos`;
;

-- Copiando estrutura para view siscad.disciplinas
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `disciplinas`;
;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
