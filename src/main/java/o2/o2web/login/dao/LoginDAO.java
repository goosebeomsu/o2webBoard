package o2.o2web.login.dao;

import o2.o2web.dto.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginDAO {

    User getUserById(String userId);
}
