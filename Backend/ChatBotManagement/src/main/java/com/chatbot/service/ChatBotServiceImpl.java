package com.chatbot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chatbot.model.ChatBot;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.customsearch.v1.Customsearch;
import com.google.api.services.customsearch.v1.model.Result;
import com.google.api.services.customsearch.v1.model.Search;




@Service
public class ChatBotServiceImpl implements ChatBotService {
	
	private static final String API_KEY = "AIzaSyA-e64OAJMMlxNXJSkcNoRtv-F7eRdGdUI"; // Replace with your API key
    private static final String SEARCH_ENGINE_ID = "5465b45fff73e4a33"; // Replace with your search engine ID


    private String generateReply(String question) {
        try {
            NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

            Customsearch customsearch = new Customsearch.Builder(httpTransport, JacksonFactory.getDefaultInstance(),
                    null).setApplicationName("ChatBot").build();

            Customsearch.Cse.List list = customsearch.cse().list();
            list.setKey(API_KEY);
            list.setCx(SEARCH_ENGINE_ID);
            list.setQ("Axis Bank India "+question);

            Search search = list.execute();
            List<Result> items = search.getItems();

            if (items != null && !items.isEmpty()) {
                return items.get(0).getTitle() + ": " + items.get(0).getSnippet();
            } else {
                return "I'm sorry, I couldn't find any relevant information for your question.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, an error occurred while processing your request.";
        }
    }




	@Override
	public String getMessageReply(ChatBot message) {

		String reply = generateReply(message.getMessageText());
		return reply;
	}



}
