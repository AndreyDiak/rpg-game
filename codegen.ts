import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

const config: CodegenConfig = {
   schema: "http://127.0.0.1:5173/graphql/schema.graphql", // Using the local endpoint, update if needed
   documents: "[src/**/*.tsx]",
   overwrite: true,
   ignoreNoDocuments: true,
   generates: {
      "src/gql/": {
         preset: "client",
         documentTransforms: [addTypenameSelectionDocumentTransform],
         plugins: [],
         config: {
            scalars: {
               UUID: "string",
               Date: "string",
               Time: "string",
               Datetime: "string",
               JSON: "string",
               BigInt: "string",
               BigFloat: "string",
               Opaque: "any",
            },
         },
      },
   },
   //  hooks: {
   //     afterAllFileWrite: ["npm run prettier"], // optional
   //  },
};

export default config;
