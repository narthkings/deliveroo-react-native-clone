import { createClient, type ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const config: ClientConfig = {
    projectId: "1s8s88az",
    dataset: "production",
    // projectId: 'cxyqg2ij',
    // dataset: 'sanity',
    useCdn: true,
    apiVersion: '2023-03-14',
}

const client = createClient(config)

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)
export default client