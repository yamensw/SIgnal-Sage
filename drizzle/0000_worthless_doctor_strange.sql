CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`business` text NOT NULL,
	`email` text NOT NULL,
	`service` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`start_date` text DEFAULT '' NOT NULL,
	`bio` text NOT NULL,
	`responsibilities` text NOT NULL,
	`photo` text NOT NULL,
	`deleted` text DEFAULT '0' NOT NULL
);
