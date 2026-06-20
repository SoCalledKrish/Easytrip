1. Use UUID for every primary key.
2. Use snake_case for all table and column names.
3. Every table gets created_at and updated_at.
4. All foreign keys use <table>_id.
5. Junction tables (destination_tags, destination_facilities) use composite primary keys.
6. Add indexes on foreign keys and frequently searched columns (slug, name, city_id, etc.).
7. Never duplicate data if it can be represented by a relationship.
8. All the tables and attributes will be in snake_case
9. All the ENUMS will be in uppercase