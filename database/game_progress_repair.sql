-- Repairs production DB where `game_progress` (migration
-- 2026_07_23_100003_create_game_progress_table.php) is missing.
-- Run this in phpMyAdmin's SQL tab against the production database.

CREATE TABLE `game_progress` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `team_id` bigint unsigned NOT NULL,
  `game_slug` varchar(255) NOT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `duration_ms` bigint unsigned DEFAULT NULL,
  `score` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `game_progress_team_id_game_slug_unique` (`team_id`,`game_slug`),
  KEY `game_progress_team_id_foreign` (`team_id`),
  CONSTRAINT `game_progress_team_id_foreign`
    FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: only run this if `migrations` does NOT already have a row for
-- 2026_07_23_100003_create_game_progress_table (check first with the SELECT
-- below). Your migrations table already shows 6 rows for 6 migration files,
-- so it likely already has this row -- in that case skip the INSERT, it
-- would just create a duplicate log entry (harmless but unnecessary).

-- SELECT * FROM migrations WHERE migration = '2026_07_23_100003_create_game_progress_table';

-- INSERT INTO migrations (migration, batch)
-- SELECT '2026_07_23_100003_create_game_progress_table', batch
-- FROM migrations
-- WHERE migration = '2026_07_23_100002_create_team_fragments_table';
