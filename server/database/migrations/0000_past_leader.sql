CREATE TABLE `device` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ip` text,
	`type` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_ip_unique` ON `device` (`ip`);