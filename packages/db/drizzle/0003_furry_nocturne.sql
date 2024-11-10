CREATE TABLE `project_new` (
  `id` TEXT PRIMARY KEY NOT NULL,
  `name` TEXT NOT NULL,
  `description` TEXT,
  `status` TEXT,
  `priority` TEXT,
  `admin` TEXT NOT NULL,
  `leadId` TEXT,
  `createdAt` INTEGER DEFAULT (CURRENT_TIMESTAMP),
  `updatedAt` INTEGER DEFAULT (CURRENT_TIMESTAMP),
  `teamId` TEXT NOT NULL,
  FOREIGN KEY (`admin`) REFERENCES `user`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (`leadId`) REFERENCES `user`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);--> statement-breakpoint

PRAGMA foreign_keys=off;--> statement-breakpoint
INSERT INTO `project_new` SELECT id, name, null as description, null as status, null as priority, admin, null as leadId, createdAt, updatedAt, teamId FROM `project`;--> statement-breakpoint
DROP TABLE `project`;--> statement-breakpoint
ALTER TABLE `project_new` RENAME TO `project`;--> statement-breakpoint
PRAGMA foreign_keys=on;
