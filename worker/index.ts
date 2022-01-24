import * as build from "../build/index.js"
import { createFetchHandler } from "./adapter"
import { createCookieSessionStorage } from "remix"

const handleFetch = createFetchHandler({
  build,

  /**
   * Context to be available on `loader` or `action`, default to `undefined` if not defined
   * @param request Request object
   * @param env Variables defined on the environment
   * @param ctx Exectuion context, i.e. ctx.waitUntil() or ctx.passThroughOnException();
   * @returns Context
   */
  getLoadContext(request, env, context) {
    return {
      ...context,
      // TODO: This should be set externally, like from an environment variable.
      // It will be needed to hash passwords on creation and login
      authPepper: "sutYPD7r-V.nqQYmFDkwwKoXLwv*cLz3EU-aDQumMPs-6b-nVF*-FW",
      sessionStorage: createCookieSessionStorage({
        cookie: {
          name: "_session",
          sameSite: "lax",
          path: "/",
          httpOnly: true,
          secrets: ["s3cr3t"],
          secure: process.env.NODE_ENV === "production",
        },
      }),
    }
  },

  getCache() {
    return null
  },
})

const worker: ExportedHandler = {
  fetch: handleFetch,
}

export default worker
