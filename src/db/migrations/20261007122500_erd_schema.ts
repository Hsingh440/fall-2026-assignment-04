import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)')
    .addColumn('email', 'varchar(255)')
    .execute();

  await db.schema
    .createTable('post')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade')
    )
    .addColumn('title', 'varchar(255)')
    .addColumn('content', 'text')
    .addColumn('created_at', 'timestamp')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('post').ifExists().execute();
  await db.schema.dropTable('user').ifExists().execute();
}