CREATE TABLE `devices` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ip` text,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`deviceId` integer NOT NULL,
	`timestamp` integer NOT NULL,
	`type` text NOT NULL,
	`message` text,
	`jobId` integer,
	`status` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `devices_ip_unique` ON `devices` (`ip`);