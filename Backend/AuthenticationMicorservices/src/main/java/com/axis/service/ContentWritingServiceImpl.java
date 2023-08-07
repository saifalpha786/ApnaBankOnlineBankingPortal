package com.axis.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.exception.NoContentFound;
import com.axis.model.ContentWriting;
import com.axis.repository.ContentWritingRepo;



@Service
public class ContentWritingServiceImpl implements ContentWritingService{
	
	@Autowired
	private ContentWritingRepo contentRepo;

	@Override
	public String createContent(ContentWriting content) {
		content.setPublishedDate(LocalDateTime.now());
		contentRepo.save(content);
		return "Content Created Successfully";
	}

	@Override
	public List<ContentWriting> getAllContentList(String language) throws NoContentFound {
		List<ContentWriting> listOfContent = contentRepo.findByLanguage(language);
		if(listOfContent == null) {
			throw new NoContentFound("No Content Found");
		}
		return listOfContent;
	}

}
