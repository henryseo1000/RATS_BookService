package com.example.RATSBookService.repository;

import com.example.RATSBookService.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JPAUserRepo extends JpaRepository<User, Long> {

}
