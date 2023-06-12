-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           10.4.27-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.5.0.6677
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
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alunos_ibfk_1` (`curso`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`curso`) REFERENCES `cursos` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.alunos: ~2 rows (aproximadamente)
INSERT INTO `alunos` (`id`, `nome`, `endereco`, `telefone`, `curso`, `usuario`, `senha`) VALUES
	(28, 'Arthur Rogado Reis', 'Rua 10, n13 Bairro São Sebastião, Uruaçu-GO', '(62) 99151-4140', 7, NULL, NULL),
	(29, 'LUCAS BAIA DA LUZ ', 'rua2323', '(62) 99264-9258', 7, NULL, NULL),
	(30, 'Marcos', 'Rua nada', '(12) 34567-8969', 7, NULL, NULL),
	(31, 'B', 'H', '8', 7, NULL, NULL);

-- Copiando estrutura para tabela siscad.alunos_turmas
CREATE TABLE IF NOT EXISTS `alunos_turmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_aluno` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL,
  `nota1` int(11) DEFAULT NULL,
  `nota2` int(11) DEFAULT NULL,
  `notafinal` int(11) DEFAULT NULL,
  `frequencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__alunos` (`id_aluno`),
  KEY `FK__turmas` (`id_turma`),
  CONSTRAINT `FK__alunos` FOREIGN KEY (`id_aluno`) REFERENCES `alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__turmas` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.alunos_turmas: ~1 rows (aproximadamente)
INSERT INTO `alunos_turmas` (`id`, `id_aluno`, `id_turma`, `nota1`, `nota2`, `notafinal`, `frequencia`) VALUES
	(1, 28, 13, NULL, NULL, NULL, NULL);

-- Copiando estrutura para tabela siscad.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `coordenador` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.cursos: ~3 rows (aproximadamente)
INSERT INTO `cursos` (`id`, `nome`, `descricao`, `coordenador`) VALUES
	(7, 'ADS - Análise e Desenvolvimento de Sistemas', 'Fazer programa :)', 123),
	(8, 'Engenharia Civil', 'Fazer cimento', 123),
	(15, 'Licenciatura em Química', 'uai, fazer sabão né?', 123);

-- Copiando estrutura para tabela siscad.disciplinas
CREATE TABLE IF NOT EXISTS `disciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `carga_horaria` double DEFAULT NULL,
  `ementa` varchar(255) DEFAULT NULL,
  `bibliografia` varchar(255) DEFAULT NULL,
  `pre_requisito` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.disciplinas: ~1 rows (aproximadamente)
INSERT INTO `disciplinas` (`id`, `nome`, `carga_horaria`, `ementa`, `bibliografia`, `pre_requisito`) VALUES
	(26, 'Projeto Integrador', 34, 'Integrar conhecimentos do curso.', 'PHP e Javascript', 'Web II'),
	(27, 'açslkdfj', 1, 'asçldkfj', 'asçlkj', 'açsldkfj');

-- Copiando estrutura para tabela siscad.professores
CREATE TABLE IF NOT EXISTS `professores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `titulacao` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.professores: ~2 rows (aproximadamente)
INSERT INTO `professores` (`id`, `nome`, `endereco`, `telefone`, `titulacao`, `usuario`, `senha`) VALUES
	(2, 'Lynwood', 'Rua x', '(61) 61616-1616', 'Doutor', NULL, NULL),
	(3, 'Thiane', 'Rua x', '(62) 62626-2626', 'Mestre', NULL, NULL);

-- Copiando estrutura para tabela siscad.professores_cursos
CREATE TABLE IF NOT EXISTS `professores_cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.professores_cursos: ~2 rows (aproximadamente)
INSERT INTO `professores_cursos` (`id`, `id_curso`, `id_professor`) VALUES
	(1, 7, 2),
	(2, 8, 2),
	(3, 7, 3);

-- Copiando estrutura para tabela siscad.professores_turmas
CREATE TABLE IF NOT EXISTS `professores_turmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) DEFAULT NULL,
  `id_turma` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.professores_turmas: ~5 rows (aproximadamente)
INSERT INTO `professores_turmas` (`id`, `id_professor`, `id_turma`) VALUES
	(32, 3, 13),
	(105, 2, 13),
	(107, 3, 17),
	(108, 28, 14),
	(110, 28, 17);

-- Copiando estrutura para tabela siscad.rh
CREATE TABLE IF NOT EXISTS `rh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.rh: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela siscad.secretaria
CREATE TABLE IF NOT EXISTS `secretaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.secretaria: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela siscad.turmas
CREATE TABLE IF NOT EXISTS `turmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `periodo` varchar(2) NOT NULL,
  `ano` int(4) NOT NULL,
  `semestre` int(1) NOT NULL,
  `dias_semana` varchar(10) NOT NULL,
  `turno` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.turmas: ~3 rows (aproximadamente)
INSERT INTO `turmas` (`id`, `nome`, `id_curso`, `periodo`, `ano`, `semestre`, `dias_semana`, `turno`) VALUES
	(13, 'Primeira turma', 7, '1', 2008, 1, '2,3,4,5', 'noturno'),
	(14, 'Outra turma de eng', 8, '2', 2022, 3, '2,3,6', 'vespertino'),
	(17, 'Saboneteiros', 15, '3', 2011, 6, '2,3,4,6', 'noturno');

-- Copiando estrutura para tabela siscad.turmas_disciplinas
CREATE TABLE IF NOT EXISTS `turmas_disciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_turma` int(11) NOT NULL,
  `id_disciplina` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela siscad.turmas_disciplinas: ~6 rows (aproximadamente)
INSERT INTO `turmas_disciplinas` (`id`, `id_turma`, `id_disciplina`) VALUES
	(3, 21, 26),
	(4, 21, 27),
	(5, 22, 26),
	(6, 22, 27),
	(7, 23, 26),
	(8, 23, 27);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
