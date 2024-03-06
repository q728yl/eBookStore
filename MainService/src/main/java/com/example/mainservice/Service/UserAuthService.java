package com.example.mainservice.Service;



import com.example.mainservice.entity.UserAuth;
import com.example.mainservice.model.Message;

import java.util.List;


public interface UserAuthService {


    Message checkPasswordById(Long userId, String password);

    void addUser(UserAuth newUserAuth);
}
