import { 
  createPool, 
  QueryResultRowType,  
  TaggedTemplateLiteralInvocationType, 
  TypeNameIdentifierType 
} from "slonik"
import { 
  createFieldNameTransformationInterceptor 
  // @ts-ignore
} from "slonik-interceptor-field-name-transformation"
import snakeCase from 'lodash.snakecase'
import camelCase from 'lodash.camelcase'
import { setupTypeGen } from "@slonik/typegen"
import { raw } from 'slonik-sql-tag-raw'

const DATABASE_URL = 'http://localhost:8000/'

export const { sql, poolConfig } = setupTypeGen({
  // knownTypes,
  writeTypes: process.cwd() + '/src/generated/db',
  typeMapper: {
    // uuid columns need to be typed as strings
    uuid: ['string', (str: any) => str],
    // decimal columns need to be typed as strings
    numeric:  ['string', (str: any) => str]
  },
  // @ts-ignore
  transformProperty: p => ({ ...p, name: camelCase(p.name) })
})

const slonikPool = createPool(DATABASE_URL, {
  ...poolConfig,
  typeParsers: [
    ...poolConfig.typeParsers,
    {
      name: "timestamptz",
      parse: (value) => (value ? Math.round(new Date(value).getTime() / 1000): null)
    }
  ],
  interceptors: [
    ...poolConfig.interceptors,
    createFieldNameTransformationInterceptor({
      format: "CAMEL_CASE"
    })
  ]
})

function formatFieldName(objKey: string) {
  return snakeCase(objKey).replace(/[^a-z0-9_-]+/g, '')
}
  
const objectToFieldsValues = (object: { [key:string]: any }) => {
  const fields: string[] = []
  const values: any[] = []
  Object.entries(object).forEach(([key, value]) => {
    fields.push(formatFieldName(key))
    values.push(value)
  })
  return { fields, values }
}
  
export const insertObject = (
  table: string, 
  object: { [key: string]: any }[] | { [key: string]: any },
  types?: TypeNameIdentifierType[]
): TaggedTemplateLiteralInvocationType<QueryResultRowType> => {
  if (Array.isArray(object)){
    if (!types){
      throw new Error("Types are required when inserting multiple records")
    }
    const { fields } = objectToFieldsValues(object[0])
    const data = object.map((data: string[]) => {
      const { values } = objectToFieldsValues(data)
      return values
    })
    return sql`
        INSERT INTO ${raw(table)} (${sql.join(fields.map((k) => sql.identifier([k])), sql`,`)}) 
        SELECT * 
        FROM ${sql.unnest(data, types)}
        RETURNING *`
  } else {
    const { fields, values } = objectToFieldsValues(object)
    return sql`
        INSERT INTO ${raw(table)} (${sql.join(fields.map((k) => sql.identifier([k])), sql`,`)}) 
        VALUES 
        (${(sql.join(values, sql`, `))})
        RETURNING *`  
  }
}
  
  
export default slonikPool