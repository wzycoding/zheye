package com.imooc.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.imooc.entity.Post;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author wzy
 * @since 2024-11-24
 */
@Mapper
public interface PostMapper extends BaseMapper<Post> {

}
