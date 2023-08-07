package com.chatbot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.ChatBot;

public interface ChatBotRepository extends JpaRepository<ChatBot, Long>{

}
