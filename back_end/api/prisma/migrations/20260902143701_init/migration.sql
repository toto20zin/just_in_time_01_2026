-- CreateTable
CREATE TABLE `Usuario` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `E-mail` VARCHAR(191) NOT NULL,
    `Senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_E-mail_key`(`E-mail`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produção` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `Descrição` VARCHAR(191) NULL,
    `Custo` DECIMAL(65, 30) NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,
    `Estoque_min` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produção_movimentacao` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `Data_produção` DATE NOT NULL,
    `Tipo` VARCHAR(191) NOT NULL,
    `ID_produto` INTEGER NOT NULL,
    `ID_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produção_movimentacao` ADD CONSTRAINT `produção_movimentacao_ID_produto_fkey` FOREIGN KEY (`ID_produto`) REFERENCES `produção`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produção_movimentacao` ADD CONSTRAINT `produção_movimentacao_ID_usuario_fkey` FOREIGN KEY (`ID_usuario`) REFERENCES `Usuario`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
