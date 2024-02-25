import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('api-index Revalidating notes page...')
  // 現状では次をコメント(30章まで)
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Your secret is invalid !' })
  }
  let revalidated = false
  try {
    // `revalidate` で指定した時間にかかわらずページが再生成される
    // await res.unstable_revalidate('/notes')  satou
    await res.revalidate('/notes')
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}
