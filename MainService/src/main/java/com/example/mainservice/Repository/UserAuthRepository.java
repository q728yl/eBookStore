package com.example.mainservice.Repository;


import com.example.mainservice.entity.UserAuth;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface UserAuthRepository extends JpaRepository<UserAuth,Long> {
//   @Query("SELECT u FROM UserAuth u where  and u.password = ?2")
//    UserAuth findUserAuthByUsernameAndPassword(String username,String password);
    UserAuth findByUserId(Long userId);
}
