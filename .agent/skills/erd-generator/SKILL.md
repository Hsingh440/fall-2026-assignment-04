# ERD Generator Skill

## Purpose

Generate an Entity Relationship Diagram (ERD) from a natural-language database description.

The skill should:
1. Understand the user's database requirements.
2. Identify entities, attributes, primary keys, and relationships.
3. Generate valid Mermaid ER diagram syntax.
4. Save the Mermaid diagram to:
   `docs/architecture/schema.mmd`
5. Validate the Mermaid diagram.
6. Generate an SVG ERD at:
   `docs/architecture/erd.svg`
7. If Mermaid validation fails, fix the syntax and retry up to 3 times.
8. Return the generated Mermaid code and the path to the SVG file.

## Input

The user may provide a natural-language description of a database.

Extract:
- Entities
- Attributes
- Primary keys
- Foreign keys
- One-to-one relationships
- One-to-many relationships
- Many-to-many relationships
- Optional relationships when specified

## Mermaid Format

Use Mermaid ER diagram syntax:

```mermaid
erDiagram
    ENTITY_A {
        integer id PK
        string name
    }

    ENTITY_B {
        integer id PK
        integer entity_a_id FK
    }

    ENTITY_A ||--o{ ENTITY_B : contains