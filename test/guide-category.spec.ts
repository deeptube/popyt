import 'mocha'
import { expect } from 'chai'
import { youtube } from './setup-instance'
import { GuideCategory, Channel } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

let categoryId: string

describe('Guide categories', () => {
  it('should set all available properties', async () => {
    const category = (await youtube.getGuideCategories('US'))[0]

    expect(category.full).to.equal(true)

    categoryId = category.id
    await category.fetch()

    expect(category.id).to.be.a('string')
    expect(category.channelId).to.be.a('string')
    expect(category.title).to.be.a('string')
  })

  it('should throw an error on invalid type', () => {
    let error: string = null

    try {
      new GuideCategory(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid guide category type: invalid')
  })

  it('should work with fetching categories directly', async () => {
    const category = await youtube.getGuideCategory(categoryId)
    expect(category.id).to.equal(categoryId)
  })

  it('should work with fetching categories\' channels', async () => {
    const category = (await youtube.getGuideCategories())[0]
    expect(await category.getChannel()).to.be.an.instanceOf(Channel)
  })
})
