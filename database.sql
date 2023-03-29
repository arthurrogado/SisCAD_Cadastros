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

-- Copiando estrutura para tabela siscad.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `curso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alunos_ibfk_1` (`curso`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`curso`) REFERENCES `cursos` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.alunos: ~2 rows (aproximadamente)
INSERT INTO `alunos` (`id`, `nome`, `endereco`, `telefone`, `curso`) VALUES
	(28, 'Arthur Rogado Reis', 'Rua 10, n13 Bairro São Sebastião, Uruaçu-GO', '(62) 99151-4140', 7),
	(29, 'LUCAS BAIA DA LUZ ', 'rua2323', '(62) 99264-9258', 7),
	(30, 'Marcos', 'Rua nada', '(12) 34567-8969', 7);

-- Copiando estrutura para tabela siscad.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `coordenador` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.cursos: ~2 rows (aproximadamente)
INSERT INTO `cursos` (`id`, `nome`, `descricao`, `coordenador`) VALUES
	(7, 'ADS - Análise e Desenvolvimento de Sistemas', 'Fazer programa :)', 123),
	(8, 'Engenharia Civil', 'Fazer cimento', 123);

-- Copiando estrutura para tabela siscad.disciplinas
CREATE TABLE IF NOT EXISTS `disciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `carga_horaria` double DEFAULT NULL,
  `ementa` varchar(255) DEFAULT NULL,
  `bibliografia` varchar(255) DEFAULT NULL,
  `pre_requisito` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.disciplinas: ~1 rows (aproximadamente)
INSERT INTO `disciplinas` (`id`, `nome`, `carga_horaria`, `ementa`, `bibliografia`, `pre_requisito`) VALUES
	(26, 'Projeto Integrador', 34, 'Integrar conhecimentos do curso.', 'PHP e Javascript', 'Web II');

-- Copiando estrutura para tabela siscad.professores
CREATE TABLE IF NOT EXISTS `professores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `titulacao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.professores: ~0 rows (aproximadamente)
INSERT INTO `professores` (`id`, `nome`, `endereco`, `telefone`, `titulacao`) VALUES
	(2, 'Lynwood', 'Rua x', '(61) 61616-1616', 'Doutor');

-- Copiando estrutura para tabela siscad.professores_cursos
CREATE TABLE IF NOT EXISTS `professores_cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.professores_cursos: ~0 rows (aproximadamente)
INSERT INTO `professores_cursos` (`id`, `id_curso`, `id_professor`) VALUES
	(1, 7, 2),
	(2, 8, 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
