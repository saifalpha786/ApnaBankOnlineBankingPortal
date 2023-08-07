package com.axis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.model.ContentWriting;

@Repository
public interface ContentWritingRepo extends JpaRepository<ContentWriting, Integer>{

	public List<ContentWriting> findByLanguage(String language);
}
