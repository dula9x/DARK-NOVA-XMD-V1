const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')

const downloadMediaMessage = async(m, filename) => {
	if (m.type === 'viewOnceMessage') {
		m.type = m.msg.type
	}
	if (m.type === 'imageMessage') {
		var nameJpg = filename ? filename + '.jpg' : 'undefined.jpg'
		const stream = await downloadContentFromMessage(m.msg, 'image')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameJpg, buffer)
		return fs.readFileSync(nameJpg)
	} else if (m.type === 'videoMessage') {
		var nameMp4 = filename ? filename + '.mp4' : 'undefined.mp4'
		const stream = await downloadContentFromMessage(m.msg, 'video')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameMp4, buffer)
		return fs.readFileSync(nameMp4)
	} else if (m.type === 'audioMessage') {
		var nameMp3 = filename ? filename + '.mp3' : 'undefined.mp3'
		const stream = await downloadContentFromMessage(m.msg, 'audio')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameMp3, buffer)
		return fs.readFileSync(nameMp3)
	} else {
		return Buffer.from([])
	}
}

function sms(robin, m) {
	if (!m.message) return
	m.type = getContentType(m.message)
	m.msg = m.message[m.type]

	// Mentions
	var quotedMention = m.msg.contextInfo != null ? m.msg.contextInfo.participant : ''
	var tagMention = m.msg.contextInfo != null ? m.msg.contextInfo.mentionedJid : []
	var mention = typeof(tagMention) == 'string' ? [tagMention] : tagMention
	if (mention != undefined) mention.push(quotedMention)
	m.mentionUser = mention != undefined ? mention.filter(x => x) : []

	// 🔧 FIXED: clearer body assign (no dangling ) && )
	if (m.type === 'conversation') {
		m.body = m.msg
	} else if (m.type === 'extendedTextMessage') {
		m.body = m.msg.text
	} else if (m.type === 'imageMessage' && m.msg.caption) {
		m.body = m.msg.caption
	} else if (m.type === 'videoMessage' && m.msg.caption) {
		m.body = m.msg.caption
	} else if (m.type === 'templateButtonReplyMessage' && m.msg.selectedId) {
		m.body = m.msg.selectedId
	} else if (m.type === 'buttonsResponseMessage' && m.msg.selectedButtonId) {
		m.body = m.msg.selectedButtonId
	} else {
		m.body = ''
	}

	// Quoted messages
	m.quoted = m.msg.contextInfo != undefined ? m.msg.contextInfo.quotedMessage : null
	if (m.quoted) {
		m.quoted.type = getContentType(m.quoted)
		m.quoted.id = m.msg.contextInfo.stanzaId
		m.quoted.sender = m.msg.contextInfo.participant
		m.quoted.fromMe = m.quoted.sender.split('@')[0].includes(robin.user.id.split(':')[0])
		m.quoted.msg =
			(m.quoted.type === 'viewOnceMessage')
				? m.quoted[m.quoted.type].message[getContentType(m.quoted[m.quoted.type].message)]
				: m.quoted[m.quoted.type]

		if (m.quoted.type === 'viewOnceMessage') {
			m.quoted.msg.type = getContentType(m.quoted[m.quoted.type].message)
		}

		// Quoted mentions
		var quoted_quotedMention = m.quoted.msg.contextInfo != null ? m.quoted.msg.contextInfo.participant : ''
		var quoted_tagMention = m.quoted.msg.contextInfo != null ? m.quoted.msg.contextInfo.mentionedJid : []
		var quoted_mention = typeof(quoted_tagMention) == 'string' ? [quoted_tagMention] : quoted_tagMention
		if (quoted_mention != undefined) quoted_mention.push(quoted_quotedMention)
		m.quoted.mentionUser = quoted_mention != undefined ? quoted_mention.filter(x => x) : []
	}

	return m
}

module.exports = { sms, downloadMediaMessage }
