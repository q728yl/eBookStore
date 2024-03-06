package com.example.mainservice.Dao;


import com.example.mainservice.Repository.UserAuthRepository;
import com.example.mainservice.entity.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserAuthDaoImpl implements UserAuthDao{
    @Autowired
    private UserAuthRepository userAuthRepository;
//    @Override
//    public UserAuth getUserAuthByUsernameAndPassword(String username, String password) {
//        return userAuthRepository.findUserAuthByUsernameAndPassword(username,password);
//    }
    @Override
    public String getPasswordById(Long userId){
        return userAuthRepository.findByUserId(userId).getPassword();
    }

    @Override
    public  void addUser(UserAuth newUserAuth){
        userAuthRepository.save(newUserAuth);
    }
}
