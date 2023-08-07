package com.axis.controller;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.exception.NoContentFound;
import com.axis.model.ContentWriting;
import com.axis.service.ContentWritingService;

@RestController
@RequestMapping("/content")
public class ContentWritingController {
	
	private static final Logger LOG = Logger.getLogger(ContentWritingController.class.getName());

	@Autowired
	private ContentWritingService contentService;
	
	@PostMapping("/createContent")
	public ResponseEntity<?> createContent(@RequestBody ContentWriting content) {
		try {
			String createContent = contentService.createContent(content);
			LOG.log(Level.INFO, "/createContent - > " + createContent );
			return new ResponseEntity<String>(createContent, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Not Created", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getListOfContent/{language}")
	public ResponseEntity<?> getListOfContent(@PathVariable("language") String language) {

		try {
			List<ContentWriting> allContentList = contentService.getAllContentList(language);
			LOG.log(Level.INFO, "/getListOfContent/"+language+" - > " + "List of News Fetch" );
			return new ResponseEntity<List<ContentWriting>>(allContentList, HttpStatus.OK);
		} catch (NoContentFound e) {
//			System.out.println("hello");
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}

}
