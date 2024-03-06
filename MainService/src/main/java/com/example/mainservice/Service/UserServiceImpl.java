package com.example.mainservice.Service;


import com.example.mainservice.Dao.UserAuthDao;
import com.example.mainservice.Dao.UserDao;
import com.example.mainservice.entity.User;
import com.example.mainservice.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserAuthDao userAuthDao;
    @Override
    public Message checkPassword(String username, String password){
        Message m = getUserId(username);
        User user = null;
        Long userId = 0L ;
        if(m.getOk()){
            user = (User) m.getData();
            userId = user.getId();
        }else return m;
        if(((User) m.getData()).getStatus() == 0)
            return new Message("用户已被禁用",false,null);
        String p = userAuthDao.getPasswordById(userId);
        if(Objects.equals(p, password)){
            return new Message("登陆成功",true,user);
        }else{
            return new Message("登陆失败",false,null);
        }

    }
    @Override
    public Message getAllUsers(){
        List<User> userAuth = userDao.getAllUsers();
        if(userAuth!= null){
            return new Message("登陆成功",true,userAuth);
        }else{
            return new Message("密码错误",false,null);
        }
    }
    @Override
    public List<User> getUserById(Long userId){
        return  userDao.getUserById(userId);

    }
    @Override
    public  Message saveReviewComment(Long userId, String comments){
        userDao.saveReviewComment(userId,comments);
//        if(userAuth!= null){
            return new Message("审核意见已修改",true,null);
//        }else{
//            return new Message("审核意见修改失败",false,null);
//        }
    }
    @Override
    public  Message findUserByUser_type(Long user_type){
        List<User> userAuth = userDao.findUserByUser_type(user_type);
        if(userAuth!= null){
            return new Message("登陆成功",true,userAuth);
        }else{
            return new Message("密码错误",false,null);
        }
    }
    @Override
    public Message getUserId(String username) {
        User user = userDao.getId(username);
        if (user != null) {
            return new Message("用户存在", true, user);
        } else {
            return new Message("用户不存在", false, null);
        }
    }
    @Override
    public Message ban(Long userId){
        userDao.ban(userId);
        return new Message("更改成功",true,null);
    }
    @Override
    public Message noBan(Long userId){
        userDao.noBan(userId);
        return new Message("更改成功",true,null);
    }
    @Override
    public  User addUser(String username, String email, String address, Long userType, String comments, Long status){
        return userDao.addUser(username,email,address,userType,comments,status);
    }
}
