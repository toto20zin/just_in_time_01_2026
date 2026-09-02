/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `E-mail` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `Senha` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `produção` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produção_movimentacao` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produção_movimentacao` DROP FOREIGN KEY `produção_movimentacao_ID_produto_fkey`;

-- DropForeignKey
ALTER TABLE `produção_movimentacao` DROP FOREIGN KEY `produção_movimentacao_ID_usuario_fkey`;

-- DropIndex
DROP INDEX `Usuario_E-mail_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `E-mail`,
    DROP COLUMN `ID`,
    DROP COLUMN `Nome`,
    DROP COLUMN `Senha`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `produção`;

-- DropTable
DROP TABLE `produção_movimentacao`;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `custo` DECIMAL(65, 30) NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,
    `estoqueMin` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `dataProducao` DATE NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `idProduto` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);

-- AddForeignKey
ALTER TABLE `Producao` ADD CONSTRAINT `Producao_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producao` ADD CONSTRAINT `Producao_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
