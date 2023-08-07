package com.axis.model;

import java.time.LocalDateTime;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "contentWriting")
public class ContentWriting {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ContentId")
	private int contentId;

	@Column(name = "language")
	private String language;

	@Column(name = "PublishedDate")
	private LocalDateTime publishedDate;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Lob
	@Column(name = "image")
	private String image;

	@Column(name = "Link")
	private String link;

	public ContentWriting() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ContentWriting(int contentId, String language, LocalDateTime publishedDate, String title, String description,
			String image, String link) {
		super();
		this.contentId = contentId;
		this.language = language;
		this.publishedDate = publishedDate;
		this.title = title;
		this.description = description;
		this.image = image;
		this.link = link;
	}

	public int getContentId() {
		return contentId;
	}

	public void setContentId(int contentId) {
		this.contentId = contentId;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public LocalDateTime getPublishedDate() {
		return publishedDate;
	}

	public void setPublishedDate(LocalDateTime publishedDate) {
		this.publishedDate = publishedDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	@Override
	public String toString() {
		return "ContentWriting [contentId=" + contentId + ", language=" + language + ", publishedDate=" + publishedDate
				+ ", title=" + title + ", description=" + description + ", image=" + image + ", link=" + link + "]";
	}

}
