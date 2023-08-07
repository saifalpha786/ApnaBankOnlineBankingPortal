package com.axis.service;

import java.util.List;

import com.axis.exception.NoContentFound;
import com.axis.model.ContentWriting;

public interface ContentWritingService {
	
	public String createContent(ContentWriting content);
	
	public List<ContentWriting> getAllContentList(String language) throws NoContentFound ;

}
