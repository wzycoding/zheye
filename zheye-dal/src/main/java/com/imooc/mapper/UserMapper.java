package com.imooc.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.imooc.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author wzy
 * @since 2024-11-21
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
