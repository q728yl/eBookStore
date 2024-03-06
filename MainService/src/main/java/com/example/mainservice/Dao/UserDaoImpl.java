package com.example.mainservice.Dao;


import com.example.mainservice.Repository.UserRepository;
import com.example.mainservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;
   @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @Override
    public List<User> getUserById(Long userId){
       return userRepository.findUserById(userId);
    }
    @Override
    public void saveReviewComment(Long userId, String comments){
        userRepository.saveReviewComment(userId,comments);
    }
    @Override
    public List<User>findUserByUser_type(Long user_type){
       return userRepository.findUserByUser_type(user_type);
   }

   @Override
    public User getId(String username){
       return userRepository.findUserByUsername(username);

   }
   @Override
    public  void ban(Long userId){
       userRepository.banUsers(userId);
   }
    @Override
    public  void noBan(Long userId){
        userRepository.noBanUsers(userId);
    }
    @Override
    public User addUser(String username, String email, String address, Long userType, String comments, Long status){
       User user = new User();
       user.setUsername(username);
       user.setEmail(email);
       user.setAddress(address);
       user.setUser_type(userType);
       user.setComments(comments);
       user.setStatus(status);
       return userRepository.save(user);
    }
}
