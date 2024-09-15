import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProjectTable1724807712959 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_project",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "hours_worked", type: "int", default: 0 },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "id_user", type: "int" },
                    { name: "id_project", type: "int" },
                ],
                foreignKeys: [
                    {
                        columnNames: ["id_user"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["id_project"],
                        referencedTableName: "projects",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
                indices: [
                    // Adicione um índice à coluna id
                    {
                        columnNames: ["id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_project");
    }
}