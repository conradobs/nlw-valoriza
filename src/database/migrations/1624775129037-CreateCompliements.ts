import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliements1624775129037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'compliments',
                columns: [
                    {
                        name: 'id',
                        type: 'char(36)',
                        isPrimary: true
                    },
                    {
                        name: 'user_sender',
                        type: 'char(36)'
                    },
                    {
                        name: 'user_receiver',
                        type: 'char(36)'
                    },
                    {
                        name: 'tag_id',
                        type: 'char(36)'
                    },
                    {
                        name: 'message',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKUserSenderCompliements',
                        columnNames: ['user_sender'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKUserReceiverCompliements',
                        columnNames: ['user_receiver'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKTagCompliments',
                        columnNames: ['tag_id'],
                        referencedTableName: 'tags',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compliments')
    }

}
