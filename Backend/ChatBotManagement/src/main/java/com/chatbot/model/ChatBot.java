package com.chatbot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ChatBot")
public class ChatBot {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MessageId")
	private Long messageId;
	@Column(name = "MessageText")
	private String messageText;
	@Column(name = "MessageReply")
	private String messageReply;

	public ChatBot() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChatBot(Long messageId, String messageText, String messageReply) {
		super();
		this.messageId = messageId;
		this.messageText = messageText;
		this.messageReply = messageReply;
	}

	public Long getMessageId() {
		return messageId;
	}

	public void setMessageId(Long messageId) {
		this.messageId = messageId;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getMessageReply() {
		return messageReply;
	}

	public void setMessageReply(String messageReply) {
		this.messageReply = messageReply;
	}

	@Override
	public String toString() {
		return "ChatBot [messageId=" + messageId + ", messageText=" + messageText + ", messageReply=" + messageReply
				+ "]";
	}

}
