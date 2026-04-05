-- CreateTable
CREATE TABLE `WhyChooseItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandingPageSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aboutBadge` VARCHAR(191) NOT NULL DEFAULT 'Especialista em Gestantes',
    `aboutTitle` VARCHAR(191) NOT NULL DEFAULT 'Especialista em eternizar fases únicas.',
    `aboutQuote` VARCHAR(191) NOT NULL DEFAULT 'Delicadeza que transcende.',
    `aboutImage` VARCHAR(191) NULL,
    `whyChooseBadge` VARCHAR(191) NOT NULL DEFAULT 'Por que escolher William Preto',
    `whyChooseTitle` VARCHAR(191) NOT NULL DEFAULT 'Mais do que um ensaio, uma experiência.',
    `whyChooseImage` VARCHAR(191) NULL,
    `testimonialsTitle` VARCHAR(191) NOT NULL DEFAULT 'O que dizem nossas clientes',
    `testimonialsSubtitle` VARCHAR(191) NOT NULL DEFAULT 'Histórias reais eternizadas em cada clique',
    `locationTitle` VARCHAR(191) NOT NULL DEFAULT 'Onde criamos histórias',
    `locationSubtitle` VARCHAR(191) NOT NULL DEFAULT 'Nosso estúdio é um refúgio planejado para o seu conforto.',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
