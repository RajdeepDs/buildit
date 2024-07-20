PRAGMA foreign_keys=off;
BEGIN TRANSACTION;
ALTER TABLE `issue` RENAME TO `_issue_old`;
CREATE TABLE `issue`
( 
    `id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text,
	`priority` text,
	`reporterId` text,
	`assigneeId` text,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP),
	`workspaceId` text,
	`issueId` text NOT NULL,
	`teamId` text,
	`projectId` text,
    FOREIGN KEY (`reporterId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (`assigneeId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO `issue` SELECT * FROM `_issue_old`;
COMMIT;
PRAGMA foreign_keys=on;