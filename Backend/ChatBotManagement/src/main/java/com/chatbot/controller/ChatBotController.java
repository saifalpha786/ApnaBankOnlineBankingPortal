package com.chatbot.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatbot.model.ChatBot;
import com.chatbot.service.ChatBotService;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class ChatBotController {
	
	@Autowired
	private ChatBotService chatBotService;
	
	@PostMapping("/getMessageReply")
	public ResponseEntity<?> getMessageReply(@RequestBody ChatBot chatBot){
		try {
			return new ResponseEntity<String>(chatBotService.getMessageReply(chatBot),HttpStatus.ACCEPTED);
		}catch(Exception e) {
			return new ResponseEntity<String>("Not Found",HttpStatus.NOT_FOUND);
		}
	}
	
	
 
}
