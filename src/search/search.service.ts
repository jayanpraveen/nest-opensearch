import { Inject, Injectable } from "@nestjs/common";
import { Client } from "@opensearch-project/opensearch";

@Injectable()
export class OpensearchService {

    constructor(
        @Inject("opensearch") private readonly opensearchClient: Client
    ) { }


    async doesIndexExists(indexName: string) {
        const client = this.opensearchClient
        const index = await client.indices.exists({
            index: indexName
        })
        return index.statusCode === 200;
    }


    async createIndex(indexName: string, mapping: object) {
        const client: Client = this.opensearchClient
        await client.indices.create({
            index: indexName,
            body: mapping
        });
        return true
    }

    async deleteRecord(indexName: string, body: Object) {
        const client: Client = this.opensearchClient
        const response = await client.deleteByQuery({
            index: indexName,
            body: body
        })
        return response.statusCode === 200;
    }

    async searchRecord(indexName: string, bodyx: any, X) {
        const client: Client = this.opensearchClient
        const { body: { hits } } = await client.search({
            index: indexName,
            // id: body
            body: bodyx,
            // q: `*${X}*`
        });

        const results = hits.total.value;
        const values = hits.hits.map((hit) => {
            return {
                id: hit._id,
                score: hit._score,
                source: hit._source
            }
        });

        return {
            results,
            values
        }
        // return data
    }

    async addSinlgeRecord(indexName: string, body: object) {
        const client: Client = this.opensearchClient
        const response = await client.index({
            index: indexName,
            body: body
        })
        return response.statusCode === 201
    }

    async addBulkRecord(body: object[]) {
        const client: Client = this.opensearchClient
        const response = await client.bulk({
            body: body
        })
        return response.statusCode === 201
    }

    async updateRecord(indexName: string, id: string, body: object) {
        const client: Client = this.opensearchClient
        // const response = await client.updateByQuery({
        //     index: indexName,
        //     body: body
        // })
        const response = await client.update({
            index: indexName,
            id: id,
            body: {
                doc: body
            }
        })

        return response.statusCode
    }

    async deleteIndex(indexName: string) {
        const client: Client = this.opensearchClient
        const response = await client.indices.delete({
            index: indexName,
        });
        return response.statusCode === 200;
    }
}