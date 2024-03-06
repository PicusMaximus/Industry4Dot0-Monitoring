CREATE TABLE `job_order` (
	`order` integer PRIMARY KEY NOT NULL,
	`job_id` text NOT NULL,
	FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE no action
);
