import { Sequelize } from 'sequelize-typescript';;
import { Movie } from 'src/movies/movie.model';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                define: { timestamps: false },
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: '',
                password: '',
                database: 'jayanpraveen',
                logging: function (str) {
                    console.log(`
                    ---------------------------------------------- 
                    ${str} 
                    ----------------------------------------------
                    `)
                }
            });
            sequelize.addModels([Movie]);
            await sequelize.sync();
            return sequelize;
        },
    },
];

