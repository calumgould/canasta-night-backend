import { setupSlonikMigrator } from "@slonik/migrator"
import slonik from "./client"

export const migrator = setupSlonikMigrator({
  migrationsPath: "src/db/migrations",
  slonik,
  mainModule:     module,
})