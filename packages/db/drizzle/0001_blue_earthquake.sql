CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP),
	`status` text DEFAULT 'waiting'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);