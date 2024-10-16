'use server'

import {auth} from "@clerk/nextjs/server"


export async function foundToken() {
  const { sessionId, getToken } = auth();
  if (!sessionId) {
    return ;
  }
  const token = await getToken()

  return token;
}
