---
name: kysely-migration-generator
description: Generate a type-safe Kysely database migration from a Mermaid ERD in docs/architecture/schema.mmd. Use when asked to translate an ERD or Mermaid database schema into a Kysely migration.
---

# Kysely Migration Generator

## Purpose

Read a Mermaid `erDiagram` from `docs/architecture/schema.mmd` and generate a production-ready TypeScript Kysely migration in `src/db/migrations/`.

## Input

- Read the Mermaid ERD from `docs/architecture/schema.mmd`.
- Parse every entity, attribute, primary key (`PK`), foreign key (`FK`), data type, and relationship.
- Preserve the meaning of the ERD exactly.

## Translation Rules

### 1. Entities to Tables

- Convert every Mermaid entity into a database table.
- Convert entity names to lowercase `snake_case`.
- Example: `USER` becomes `user`.
- Example: `BLOG_POST` becomes `blog_post`.

### 2. Columns and Data Types

Map Mermaid types to appropriate PostgreSQL/Kysely column types:

- `integer` -> `integer`
- `string` -> `varchar(255)`
- `text` -> `text`
- `boolean` -> `boolean`
- `datetime` -> `timestamp`

Preserve column names using lowercase `snake_case`.

### 3. Primary Keys

- Attributes marked `PK` are primary keys.
- Integer primary keys should use an auto-generated identity/serial-style primary key.
- UUID primary keys should use an appropriate UUID column and generation strategy.
- Do not create duplicate primary keys.

### 4. Foreign Keys

- Attributes marked `FK` are foreign-key columns.
- Use Kysely `.references()` to connect each FK to its referenced table and column.
- Foreign keys must use `.onDelete('cascade')`.
- The referenced table must be created before the table containing the foreign key.

### 5. Cardinalities

Interpret Mermaid relationships correctly:

- `||--o{` means one-to-many.
- `||--o|` means one-to-one.
- One-to-many relationships require the many-side foreign key.
- One-to-one relationships require the appropriate foreign key plus a unique constraint.

### 6. Migration File

Create the generated migration at:

`src/db/migrations/<timestamp>_<migration_name>.ts`

Use a unique timestamp-based filename.

### 7. Migration Structure

The migration must export both:

```ts
export async function up(db: Kysely<any>) {
  // create tables
}

export async function down(db: Kysely<any>) {
  // drop tables
}