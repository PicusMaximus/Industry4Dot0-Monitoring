CREATE TABLE `devices` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(20) NOT NULL,
	`ip` text,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`deviceId` text NOT NULL,
	`timestamp` integer NOT NULL,
	`type` text NOT NULL,
	`message` text(100),
	`jobId` text,
	`status` text,
	FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(20) NOT NULL,
	`device_id` text NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `devices_ip_unique` ON `devices` (`ip`);