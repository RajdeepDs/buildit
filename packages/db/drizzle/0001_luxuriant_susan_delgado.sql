ALTER TABLE `workspace` DROP COLUMN `issueCounter`;

ALTER TABLE `team` ADD COLUMN `issueCounter` INT(11) NOT NULL DEFAULT 0;