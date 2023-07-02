import { ProductUser } from "./model/productUser.model";
// import { User } from "./model/user.model";

export const userProviders = [
    // {
    //     provide: 'USER_REPOSITORY',
    //     useValue: User,
    // },
    {
        provide: 'PRODUCT_USER_REPOSITORY',
        useValue: ProductUser,
    },
];

