package com.example.mainservice.Dao;


import com.example.mainservice.entity.UserAuth;

public interface UserAuthDao {
//    UserAuth getUserAuthByUsernameAndPassword(String username,String password);

    String getPasswordById(Long userId);

    void addUser(UserAuth newUserAuth);
}
