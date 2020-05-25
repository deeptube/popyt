import 'mocha'
import { expect } from 'chai'
import { youtube } from './cache.spec'
import { Channel, ChannelSection, Playlist } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

let sections: ChannelSection[]

describe('Channel sections', () => {
  it('should set all available properties', async () => {
    sections = await youtube.getChannelSections('UC6mi9rp7vRYninucP61qOjg')

    sections.map((s, i) => {
      return s.fetch()
    })

    const section = sections[0]

    expect(section.full).to.equal(false)

    expect(section.id).to.be.a('string')
    expect(section.channelId).to.be.a('string')
    expect(section.position).to.be.a('number').and.gte(0)
    expect(section.style).to.be.a('string')
    expect(section.type).to.be.a('string')

    if (section.name) expect(section.name).to.be.a('string')
    if (section.localizedName) expect(section.localizedName).to.be.a('string')
    if (section.language) expect(section.language).to.be.a('string')
    if (section.localizations) expect(section.localizations).to.be.an('object')
    if (section.channelIds) expect(section.channelIds).to.be.an('array')
    if (section.playlistIds) expect(section.playlistIds).to.be.an('array')
  })

  it('should throw an error on invalid type', () => {
    let error: string = null

    try {
      new ChannelSection(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid channel section type: invalid')
  })
})