CREATE TABLE `issue` (
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
	FOREIGN KEY (`reporterId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `issue_issueId_unique` ON `issue` (`issueId`);