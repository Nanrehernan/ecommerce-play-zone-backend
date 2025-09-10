import {Request, Response} from "express"

const apiCatFacts = process.env.API_CAT_FACTS

export const catFacts = async (request: Request, response: Response) => {
   const resp = await fetch(apiCatFacts!)
   const data = await resp.json()

   response.json(data)
}