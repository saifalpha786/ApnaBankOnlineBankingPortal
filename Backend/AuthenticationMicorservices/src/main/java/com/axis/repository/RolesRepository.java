package com.axis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.model.Roles;
@Repository
public interface RolesRepository extends JpaRepository<Roles, Long>{
	


}
