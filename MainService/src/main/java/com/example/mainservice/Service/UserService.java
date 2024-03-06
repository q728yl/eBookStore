package com.example.mainservice.Service;


import com.example.mainservice.entity.User;
import com.example.mainservice.model.Message;

import java.util.List;

public interface UserService {
    Message checkPassword(String username, String password);

    Message getAllUsers();

    List<User> getUserById(Long userId);

    Message saveReviewComment(Long userId, String comments);

    Message findUserByUser_type(Long user_type);

    Message getUserId(String username);


    Message ban(Long userId);

    Message noBan(Long userId);

    User addUser(String username, String email, String address, Long userType, String comments, Long status);
}
