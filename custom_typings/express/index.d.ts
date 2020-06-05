declare namespace Express {
  interface Request {
    workspace?: any
    user?: any
    header: {
      workspace?: string | undefined
    }
  }
}
