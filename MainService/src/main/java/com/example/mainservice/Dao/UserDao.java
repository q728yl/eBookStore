package com.example.mainservice.Dao;


import com.example.mainservice.entity.User;

import java.util.List;

public interface UserDao {
    List<User> getAllUsers();

    List<User> getUserById(Long userId);

    void saveReviewComment(Long userId, String comments);

    List<User>findUserByUser_type(Long user_type);

    User getId(String username);

    void ban(Long userId);

    void noBan(Long userId);

    User addUser(String username, String email, String address, Long userType, String comments, Long status);
}
