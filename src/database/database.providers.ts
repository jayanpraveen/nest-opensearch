import { Sequelize } from 'sequelize-typescript'; import { UserSession } from 'src/auth/userSession.model';
;
import { Movie } from 'src/movies/movie.model';
import { ProductUser } from 'src/user/model/productUser.model';

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
            sequelize.addModels([Movie, ProductUser, UserSession]);
            await sequelize.sync();
            return sequelize;
        },
    },
];

