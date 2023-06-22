import { Client } from '@opensearch-project/opensearch';

export const opensearchProvider = [
    {
        provide: "opensearch",
        useFactory: async () => {
            try {
                return new Client({ node: "http://localhost:9400", ssl: { rejectUnauthorized: false } })
                // return new Client({ node: "https://localhost:9400", ssl: { rejectUnauthorized: false } })
            } catch (err) { }
        },
    },
];
